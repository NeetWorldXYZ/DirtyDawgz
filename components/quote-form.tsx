"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle, Check, ImagePlus, Loader2, X, Flame, Wind, Droplets, Wrench, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const serviceOptions = [
  {
    id: "conveyor-oven",
    label: "Commercial Conveyor Oven Cleaning",
    short: "Oven Cleaning",
    detail: "Conveyor, pizza & deck ovens",
    icon: Flame,
  },
  {
    id: "hood-vent",
    label: "Hood Vent Cleaning",
    short: "Hood & Exhaust",
    detail: "Hoods, ducts & rooftop fans",
    icon: Wind,
  },
  {
    id: "grease-trap",
    label: "Grease Trap Cleaning",
    short: "Grease Trap",
    detail: "Pump-outs & scraping",
    icon: Droplets,
  },
  {
    id: "other",
    label: "Other",
    short: "Something Else",
    detail: "Tell us exactly what you need",
    icon: Wrench,
  },
]

/** Shared field styling — squared-off, red focus, matches the industrial theme. */
const fieldCls =
  "rounded-none border-border bg-card text-card-foreground focus-visible:border-primary focus-visible:ring-primary/30"

function SectionTitle({ step, children }: { step: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span className="font-[family-name:var(--font-oswald)] text-2xl font-bold text-primary/40">
        {step}
      </span>
      <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-wide text-foreground">
        {children}
      </h3>
      <span className="h-px flex-1 self-center bg-border" />
    </div>
  )
}

const MAX_PHOTOS = 5
const MAX_PHOTO_SIZE_MB = 10
const MAX_IMAGE_DIMENSION = 1200

async function fileToJpegBase64(file: File): Promise<{ name: string; data: string; type: string }> {
  const isHeic = /heic$/i.test(file.type) || /heic$/i.test(file.name)
  let blob: Blob = file
  if (isHeic) {
    try {
      const heic2any = (await import("heic2any")).default
      const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 })
      blob = result instanceof Blob ? result : (result as Blob[])[0]
    } catch {
      throw new Error("Could not convert HEIC photo. Try saving as JPEG (Settings → Camera → Formats → Most Compatible).")
    }
  }
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement("canvas")
      let { width, height } = img
      if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
        if (width > height) {
          height = Math.round((height / width) * MAX_IMAGE_DIMENSION)
          width = MAX_IMAGE_DIMENSION
        } else {
          width = Math.round((width / height) * MAX_IMAGE_DIMENSION)
          height = MAX_IMAGE_DIMENSION
        }
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85)
      const data = dataUrl.split(",")[1]
      if (!data) reject(new Error("Could not encode image"))
      else resolve({ name: file.name.replace(/\.[^.]+$/i, ".jpg"), data, type: "image/jpeg" })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Could not load image"))
    }
    img.src = url
  })
}

export function QuoteForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [photoLimitMessage, setPhotoLimitMessage] = useState<string | null>(null)
  const [multipleLocations, setMultipleLocations] = useState(false)
  const [numberOfLocationsValue, setNumberOfLocationsValue] = useState("2")
  const [planInterest, setPlanInterest] = useState(false)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSubmitted && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [isSubmitted])

  function toggleService(serviceId: string) {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((s) => s !== serviceId) : [...prev, serviceId]
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPhoneError(null)
    setPhotoError(null)
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data: Record<string, string | string[]> = {}

    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          ;(data[key] as string[]).push(value as string)
        } else {
          data[key] = [data[key] as string, value as string]
        }
      } else {
        data[key] = value as string
      }
    })

    const digitsOnly = String(data.phone || "").replace(/\D/g, "")
    if (digitsOnly.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number.")
      setIsSubmitting(false)
      return
    }

    data.services = selectedServices.map(
      (id) => serviceOptions.find((s) => s.id === id)?.label || id
    )

    data.numberOfLocations = multipleLocations ? numberOfLocationsValue : "1"
    data.servicePlanInterest = planInterest ? "Yes" : "No"

    if (photoFiles.length > 0) {
      const maxBytes = MAX_PHOTO_SIZE_MB * 1024 * 1024
      const valid = photoFiles.filter((f) => f.size <= maxBytes)
      if (valid.length < photoFiles.length) {
        setPhotoError(`Photos over ${MAX_PHOTO_SIZE_MB}MB each were skipped. Try choosing smaller or fewer photos.`)
        setIsSubmitting(false)
        return
      }
      try {
        data.photos = await Promise.all(valid.map(fileToJpegBase64))
      } catch (err) {
        setPhotoError(err instanceof Error ? err.message : "Could not read one or more photos. Use JPEG or PNG.")
        setIsSubmitting(false)
        return
      }
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Quote request failed")
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Quote request failed", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div ref={successRef} className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h3 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight text-foreground">
          Quote Request Received
        </h3>
        <p className="mt-3 max-w-md text-muted-foreground">
          Thank you for reaching out! One of our team members will review your request and get back
          to you within 24 hours.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Need to talk sooner? Call us at{" "}
          <a href="tel:2692481209" className="font-medium text-primary hover:underline">
            (269) 248-1209
          </a>
        </p>
        <Button
          className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => {
            setIsSubmitted(false)
            setSelectedServices([])
            setPhotoFiles([])
            setMultipleLocations(false)
            setNumberOfLocationsValue("2")
            setPlanInterest(false)
          }}
        >
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Services Selection */}
      <div>
        <SectionTitle step="01">What Needs Cleaning?</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((service) => {
            const selected = selectedServices.includes(service.id)
            return (
              <button
                key={service.id}
                type="button"
                role="checkbox"
                aria-checked={selected}
                onClick={() => toggleService(service.id)}
                className={`group relative flex items-center gap-4 border p-5 text-left transition-all duration-200 ${
                  selected
                    ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40 hover:bg-primary/[0.02]"
                }`}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center border transition-colors ${
                    selected ? "border-primary bg-primary text-primary-foreground" : "border-primary/25 bg-primary/10 text-primary"
                  }`}
                >
                  <service.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-oswald)] text-base font-bold uppercase tracking-tight text-card-foreground">
                    {service.short}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{service.detail}</p>
                </div>
                <div
                  className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center border transition-all ${
                    selected ? "border-primary bg-primary" : "border-border bg-card"
                  }`}
                  aria-hidden
                >
                  {selected && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                </div>
              </button>
            )
          })}
        </div>
        {selectedServices.length === 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            Select at least one service to continue.
          </p>
        )}

        {/* Recurring service plan interest */}
        <button
          type="button"
          role="checkbox"
          aria-checked={planInterest}
          onClick={() => setPlanInterest((v) => !v)}
          className={`mt-4 flex w-full items-center gap-4 border p-4 text-left transition-all duration-200 ${
            planInterest
              ? "border-primary bg-[#161616] text-white"
              : "border-border bg-card hover:border-primary/40"
          }`}
        >
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center border ${
              planInterest ? "border-primary bg-primary text-primary-foreground" : "border-primary/25 bg-primary/10 text-primary"
            }`}
          >
            <Gauge className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={`font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-tight ${
                planInterest ? "text-white" : "text-card-foreground"
              }`}
            >
              I&apos;m interested in a recurring service plan
            </p>
            <p className={`text-xs ${planInterest ? "text-white/60" : "text-muted-foreground"}`}>
              We track your cleaning schedule and contact you when equipment is due — you never
              have to remember a date.
            </p>
          </div>
          <div
            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center border ${
              planInterest ? "border-primary bg-primary" : "border-border bg-card"
            }`}
            aria-hidden
          >
            {planInterest && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
          </div>
        </button>
      </div>

      {/* Contact Information */}
      <div>
        <SectionTitle step="02">Contact Information</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Full Name <span className="text-primary">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="John Smith"
              className={fieldCls}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="business" className="text-sm font-medium text-foreground">
              Business Name <span className="text-primary">*</span>
            </Label>
            <Input
              id="business"
              name="business"
              required
              placeholder="Your Restaurant Name"
              className={fieldCls}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address <span className="text-primary">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@restaurant.com"
              className={fieldCls}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">
              Phone Number <span className="text-primary">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="(555) 123-4567"
              className={fieldCls}
              aria-invalid={!!phoneError}
              onChange={() => setPhoneError(null)}
            />
            {phoneError && (
              <p className="text-sm text-destructive" role="alert">
                {phoneError}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <SectionTitle step="03">Service Location</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="address" className="text-sm font-medium text-foreground">
              Street Address <span className="text-primary">*</span>
            </Label>
            <Input
              id="address"
              name="address"
              required
              placeholder="123 Main Street"
              className={fieldCls}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="city" className="text-sm font-medium text-foreground">
              City <span className="text-primary">*</span>
            </Label>
            <Input
              id="city"
              name="city"
              required
              placeholder="Kalamazoo"
              className={fieldCls}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="state" className="text-sm font-medium text-foreground">
                State <span className="text-primary">*</span>
              </Label>
              <Input
                id="state"
                name="state"
                required
                placeholder="MI"
                className={fieldCls}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="zip" className="text-sm font-medium text-foreground">
                ZIP Code <span className="text-primary">*</span>
              </Label>
              <Input
                id="zip"
                name="zip"
                required
                placeholder="49001"
                className={fieldCls}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:col-span-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="multiple-locations"
                checked={multipleLocations}
                onCheckedChange={(checked) => setMultipleLocations(checked === true)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="multiple-locations" className="text-sm font-medium text-foreground cursor-pointer">
                I have multiple locations
              </Label>
            </div>
            {multipleLocations && (
              <div className="flex flex-col gap-2 max-w-xs">
                <Label htmlFor="number-of-locations" className="text-sm font-medium text-foreground">
                  Number of locations
                </Label>
                <Select name="numberOfLocations" value={numberOfLocationsValue} onValueChange={setNumberOfLocationsValue}>
                  <SelectTrigger id="number-of-locations" className={fieldCls}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                    <SelectItem value="10+">10+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conditional: Conveyor Oven Details */}
      {selectedServices.includes("conveyor-oven") && (
        <div className="border-l-4 border-primary bg-primary/5 p-6">
          <h3 className="mb-4 font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-foreground">
            Conveyor Oven Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="oven-brand" className="text-sm font-medium text-foreground">
                Oven Brand / Manufacturer
              </Label>
              <Input
                id="oven-brand"
                name="ovenBrand"
                placeholder="e.g., Lincoln, Middleby Marshall"
                className={fieldCls}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="oven-model" className="text-sm font-medium text-foreground">
                Model Number
              </Label>
              <Input
                id="oven-model"
                name="ovenModel"
                placeholder="e.g., 1132-000-A"
                className={fieldCls}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="oven-count" className="text-sm font-medium text-foreground">
                Number of Decks
              </Label>
              <Select name="ovenCount">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Deck</SelectItem>
                  <SelectItem value="2">2 Decks</SelectItem>
                  <SelectItem value="3">3 Decks</SelectItem>
                  <SelectItem value="4">4 Decks</SelectItem>
                  <SelectItem value="5+">5+ Decks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="oven-last-cleaned" className="text-sm font-medium text-foreground">
                Last Cleaned
              </Label>
              <Select name="ovenLastCleaned">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-3-months">Less than 3 months ago</SelectItem>
                  <SelectItem value="3-6-months">3-6 months ago</SelectItem>
                  <SelectItem value="6-12-months">6-12 months ago</SelectItem>
                  <SelectItem value="over-1-year">Over 1 year ago</SelectItem>
                  <SelectItem value="never">Never / Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="oven-notes" className="text-sm font-medium text-foreground">
                Additional Oven Details
              </Label>
              <Textarea
                id="oven-notes"
                name="ovenNotes"
                placeholder="Any specific issues or concerns with your oven(s)?"
                className={fieldCls}
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Conditional: Grease Trap Details */}
      {selectedServices.includes("grease-trap") && (
        <div className="border-l-4 border-primary bg-primary/5 p-6">
          <h3 className="mb-4 font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-foreground">
            Grease Trap Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="trap-size" className="text-sm font-medium text-foreground">
                Grease Trap Size (Gallons)
              </Label>
              <Select name="trapSize">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50">Under 50 gallons</SelectItem>
                  <SelectItem value="50-100">50-100 gallons</SelectItem>
                  <SelectItem value="100-500">100-500 gallons</SelectItem>
                  <SelectItem value="500-1000">500-1,000 gallons</SelectItem>
                  <SelectItem value="over-1000">Over 1,000 gallons</SelectItem>
                  <SelectItem value="not-sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="trap-location" className="text-sm font-medium text-foreground">
                Trap Location
              </Label>
              <Select name="trapLocation">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor / Underground</SelectItem>
                  <SelectItem value="not-sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="trap-last-cleaned" className="text-sm font-medium text-foreground">
                Last Cleaned
              </Label>
              <Select name="trapLastCleaned">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1-month">Less than 1 month ago</SelectItem>
                  <SelectItem value="1-3-months">1-3 months ago</SelectItem>
                  <SelectItem value="3-6-months">3-6 months ago</SelectItem>
                  <SelectItem value="over-6-months">Over 6 months ago</SelectItem>
                  <SelectItem value="never">Never / Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="trap-issues" className="text-sm font-medium text-foreground">
                Current Issues
              </Label>
              <Select name="trapIssues">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Any current issues?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No issues</SelectItem>
                  <SelectItem value="slow-drain">Slow drainage</SelectItem>
                  <SelectItem value="odor">Foul odor</SelectItem>
                  <SelectItem value="overflow">Overflow / Backup</SelectItem>
                  <SelectItem value="inspection">Upcoming inspection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="trap-notes" className="text-sm font-medium text-foreground">
                Additional Grease Trap Details
              </Label>
              <Textarea
                id="trap-notes"
                name="trapNotes"
                placeholder="Any specific concerns about your grease trap?"
                className={fieldCls}
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Conditional: Hood Vent Details */}
      {selectedServices.includes("hood-vent") && (
        <div className="border-l-4 border-primary bg-primary/5 p-6">
          <h3 className="mb-4 font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-foreground">
            Hood Vent Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="hood-type" className="text-sm font-medium text-foreground">
                Hood Type
              </Label>
              <Select name="hoodType">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type-1">Type I (Grease Hood)</SelectItem>
                  <SelectItem value="type-2">Type II (Heat/Steam Hood)</SelectItem>
                  <SelectItem value="both">Both Types</SelectItem>
                  <SelectItem value="not-sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="hood-length" className="text-sm font-medium text-foreground">
                Approximate Hood Length
              </Label>
              <Select name="hoodLength">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-6ft">Under 6 feet</SelectItem>
                  <SelectItem value="6-10ft">6-10 feet</SelectItem>
                  <SelectItem value="10-16ft">10-16 feet</SelectItem>
                  <SelectItem value="over-16ft">Over 16 feet</SelectItem>
                  <SelectItem value="not-sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="hood-last-cleaned" className="text-sm font-medium text-foreground">
                Last Cleaned
              </Label>
              <Select name="hoodLastCleaned">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-3-months">Less than 3 months ago</SelectItem>
                  <SelectItem value="3-6-months">3-6 months ago</SelectItem>
                  <SelectItem value="6-12-months">6-12 months ago</SelectItem>
                  <SelectItem value="over-1-year">Over 1 year ago</SelectItem>
                  <SelectItem value="never">Never / Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="hood-filters" className="text-sm font-medium text-foreground">
                Number of Filters
              </Label>
              <Select name="hoodFilters">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="How many filters?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-4">1-4 filters</SelectItem>
                  <SelectItem value="5-8">5-8 filters</SelectItem>
                  <SelectItem value="9-12">9-12 filters</SelectItem>
                  <SelectItem value="over-12">Over 12 filters</SelectItem>
                  <SelectItem value="not-sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="hood-access" className="text-sm font-medium text-foreground">
                Rooftop Access Available?
              </Label>
              <Select name="hoodRoofAccess">
                <SelectTrigger className={fieldCls}>
                  <SelectValue placeholder="Select access type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ladder">Ladder access</SelectItem>
                  <SelectItem value="hatch">Roof hatch</SelectItem>
                  <SelectItem value="stairs">Stairway access</SelectItem>
                  <SelectItem value="not-sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="hood-notes" className="text-sm font-medium text-foreground">
                Additional Hood Vent Details
              </Label>
              <Textarea
                id="hood-notes"
                name="hoodNotes"
                placeholder="Any specific concerns about your hood vent system?"
                className={fieldCls}
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Conditional: Other service details */}
      {selectedServices.includes("other") && (
        <div className="border-l-4 border-primary bg-primary/5 p-6">
          <h3 className="mb-4 font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-wide text-foreground">
            Tell Us What You Need
          </h3>
          <div className="flex flex-col gap-2">
            <Label htmlFor="other-details" className="text-sm font-medium text-foreground">
              Describe the job <span className="text-primary">*</span>
            </Label>
            <Textarea
              id="other-details"
              name="otherDetails"
              required
              placeholder="Tell us exactly what needs cleaning — fryers, flat tops, walk-in coolers, full kitchen deep clean, whatever it is. If we can't do it, we'll tell you straight."
              className={fieldCls}
              rows={4}
            />
          </div>
        </div>
      )}

      {/* Preferred Schedule & Additional Notes */}
      <div>
        <SectionTitle step="04">Scheduling Preference</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="preferred-date" className="text-sm font-medium text-foreground">
              Preferred Date
            </Label>
            <Input
              id="preferred-date"
              name="preferredDate"
              type="date"
              className={fieldCls}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="preferred-time" className="text-sm font-medium text-foreground">
              Preferred Time
            </Label>
            <Select name="preferredTime">
              <SelectTrigger className={fieldCls}>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (6am - 12pm)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                <SelectItem value="evening">Evening (5pm - 10pm)</SelectItem>
                <SelectItem value="overnight">Overnight (10pm - 6am)</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="additional-notes" className="text-sm font-medium text-foreground">
              Additional Notes
            </Label>
            <Textarea
              id="additional-notes"
              name="additionalNotes"
              placeholder="Anything else we should know? Access instructions, parking, special requirements..."
              className={fieldCls}
              rows={4}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="quote-photos" className="text-sm font-medium text-foreground">
              Add Photos (optional)
            </Label>
            <p className="text-xs text-muted-foreground">
              Up to {MAX_PHOTOS} photos, {MAX_PHOTO_SIZE_MB}MB each (phone photos are fine). JPEG or PNG (iPhone HEIC works best when uploaded from your phone). Help us quote accurately (e.g. oven condition, equipment).
            </p>
            <input
              ref={photoInputRef}
              id="quote-photos"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              multiple
              className="sr-only"
              onChange={(e) => {
                const list = e.target.files
                const total = list?.length ?? 0
                const files = list ? Array.from(list).slice(0, MAX_PHOTOS) : []
                setPhotoFiles(files)
                setPhotoError(null)
                setPhotoLimitMessage(total > MAX_PHOTOS ? `Only the first ${MAX_PHOTOS} of ${total} photos are used.` : null)
                e.target.value = ""
              }}
            />
            <label
              htmlFor="quote-photos"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-border bg-muted/40 px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <ImagePlus className="h-10 w-10 text-muted-foreground" aria-hidden />
              <span className="text-sm font-medium text-foreground">Choose photos</span>
              <span className="text-xs text-muted-foreground">or drag and drop</span>
            </label>
            {photoError && (
              <p className="text-sm text-destructive" role="alert">
                {photoError}
              </p>
            )}
            {photoFiles.length > 0 && (
              <div className="flex flex-col gap-1 rounded-md border border-border bg-muted/30 p-2">
                <p className="text-xs font-medium text-foreground">
                  {photoFiles.length} photo{photoFiles.length !== 1 ? "s" : ""} selected
                  {photoLimitMessage && (
                    <span className="block mt-1 font-normal text-muted-foreground">{photoLimitMessage}</span>
                  )}
                </p>
                <ul className="list-inside list-disc text-xs text-muted-foreground">
                  {photoFiles.map((f, i) => (
                    <li key={i} className="flex items-center justify-between gap-2">
                      <span className="truncate">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => setPhotoFiles((prev) => prev.filter((_, j) => j !== i))}
                        className="shrink-0 rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label={`Remove ${f.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoFiles([])
                    setPhotoError(null)
                    setPhotoLimitMessage(null)
                    if (photoInputRef.current) photoInputRef.current.value = ""
                  }}
                  className="mt-1 self-start text-xs text-primary underline hover:no-underline"
                >
                  Clear all photos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We will respond to your quote request within 24 hours.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={selectedServices.length === 0 || isSubmitting}
          className="dd-sheen bg-primary px-10 py-6 font-[family-name:var(--font-oswald)] text-base font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Quote Request"
          )}
        </Button>
      </div>
    </form>
  )
}
