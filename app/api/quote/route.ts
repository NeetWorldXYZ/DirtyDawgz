import { NextResponse } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import nodemailer from "nodemailer"
import fs from "fs/promises"
import path from "path"

export const runtime = "nodejs"

const OFFICE_COORDS = { lat: 42.28, lon: -84.93 }

function formatPhone(phone: string | undefined): string {
  if (!phone) return "N/A"
  const digits = phone.replace(/\D/g, "")
  if (digits.length !== 10) return phone
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function haversineMiles(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 3958.8
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLon = ((b.lon - a.lon) * Math.PI) / 180
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  return R * c
}

async function getOneWayMiles(data: any): Promise<number | null> {
  if (!data.address || !data.city || !data.state) return null
  const full = `${data.address}, ${data.city}, ${data.state} ${data.zip || ""}`.trim()
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(full)}&limit=1`
    const res = await Promise.race([
      fetch(url, { headers: { "User-Agent": "DirtyDawgz-Quote/1.0" } }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 800)),
    ])
    if (!res.ok) return null
    const arr = (await res.json()) as Array<{ lat: string; lon: string }>
    if (!Array.isArray(arr) || arr.length === 0) return null
    const dest = { lat: parseFloat(arr[0].lat), lon: parseFloat(arr[0].lon) }
    const miles = haversineMiles(OFFICE_COORDS, dest)
    return Number.isFinite(miles) && miles > 0 ? Math.round(miles * 1.2) : null
  } catch {
    return null
  }
}

function buildTextEmailBody(data: any) {
  const services = Array.isArray(data.services) ? data.services.join(", ") : data.services

  let emailBody = `
NEW QUOTE REQUEST FROM DIRTY DAWGZ WEBSITE
============================================

SERVICES REQUESTED: ${services}

CONTACT INFORMATION
--------------------
Name: ${data.name || "N/A"}
Business: ${data.business || "N/A"}
Email: ${data.email || "N/A"}
Phone: ${formatPhone(data.phone)}

SERVICE LOCATION
--------------------
Address: ${data.address || "N/A"}
City: ${data.city || "N/A"}
State: ${data.state || "N/A"}
ZIP: ${data.zip || "N/A"}
Number of locations: ${data.numberOfLocations || "1"}
`

  if (data.ovenBrand || data.ovenModel || data.ovenCount || data.ovenLastCleaned || data.ovenNotes) {
    emailBody += `
CONVEYOR OVEN DETAILS
--------------------
Brand/Manufacturer: ${data.ovenBrand || "N/A"}
Model: ${data.ovenModel || "N/A"}
Number of Decks: ${data.ovenCount || "N/A"}
Last Cleaned: ${data.ovenLastCleaned || "N/A"}
Notes: ${data.ovenNotes || "N/A"}
`
  }

  if (data.trapSize || data.trapLocation || data.trapLastCleaned || data.trapIssues || data.trapNotes) {
    emailBody += `
GREASE TRAP DETAILS
--------------------
Size: ${data.trapSize || "N/A"}
Location: ${data.trapLocation || "N/A"}
Last Cleaned: ${data.trapLastCleaned || "N/A"}
Current Issues: ${data.trapIssues || "N/A"}
Notes: ${data.trapNotes || "N/A"}
`
  }

  if (data.hoodType || data.hoodLength || data.hoodLastCleaned || data.hoodFilters || data.hoodRoofAccess || data.hoodNotes) {
    emailBody += `
HOOD VENT DETAILS
--------------------
Hood Type: ${data.hoodType || "N/A"}
Approximate Length: ${data.hoodLength || "N/A"}
Last Cleaned: ${data.hoodLastCleaned || "N/A"}
Number of Filters: ${data.hoodFilters || "N/A"}
Rooftop Access: ${data.hoodRoofAccess || "N/A"}
Notes: ${data.hoodNotes || "N/A"}
`
  }

  emailBody += `
SCHEDULING PREFERENCE
--------------------
Preferred Date: ${data.preferredDate || "N/A"}
Preferred Time: ${data.preferredTime || "N/A"}

ADDITIONAL NOTES
--------------------
${data.additionalNotes || "None"}
`

  return emailBody
}

async function generateQuotePdf(data: any, travelMiles: number | null): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const { height } = page.getSize()
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  let y = height - 50
  const lineHeight = 14
  const margin = 50

  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png")
    const logoBytes = await fs.readFile(logoPath)
    const logoImage = await pdfDoc.embedPng(logoBytes)
    const logoW = 72
    const logoH = (logoImage.height / logoImage.width) * logoW
    page.drawImage(logoImage, { x: margin, y: height - 50 - logoH, width: logoW, height: logoH })
    y = height - 50 - logoH - 16
  } catch {
    y = height - 50
  }

  const addLine = (text: string, size = 11, font = bodyFont) => {
    page.drawText(text, { x: margin, y, size, font })
    y -= lineHeight
  }

  const addSection = (title: string, rows: { label: string; value: string | undefined }[]) => {
    y -= lineHeight / 2
    const titleSize = 13
    page.drawText(title, { x: margin, y, size: titleSize, font: titleFont })
    const titleWidth = titleFont.widthOfTextAtSize(title, titleSize)
    page.drawRectangle({
      x: margin,
      y: y - 2,
      width: titleWidth,
      height: 1,
      color: rgb(0, 0, 0),
    })
    y -= lineHeight
    rows.forEach((row) => addLine(`${row.label}: ${row.value || "N/A"}`))
    y -= lineHeight / 2
  }

  addLine("Dirty Dawgz Quote Request", 16, titleFont)
  addLine(
    `Submitted: ${new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })}`
  )
  y -= lineHeight

  const services = Array.isArray(data.services) ? data.services.join(", ") : data.services

  addSection("Services Requested", [{ label: "Services", value: services }])

  addSection("Contact Information", [
    { label: "Name", value: data.name },
    { label: "Business", value: data.business },
    { label: "Email", value: data.email },
    { label: "Phone", value: formatPhone(data.phone) },
  ])

  addSection("Service Location", [
    { label: "Address", value: data.address },
    { label: "City", value: data.city },
    { label: "State", value: data.state },
    { label: "ZIP", value: data.zip },
    { label: "Number of locations", value: data.numberOfLocations || "1" },
    {
      label: "Travel Distance (One-Way)",
      value: travelMiles != null ? `${travelMiles} miles` : "Unable to calculate",
    },
  ])

  if (data.ovenBrand || data.ovenModel || data.ovenCount || data.ovenLastCleaned || data.ovenNotes) {
    addSection("Conveyor Oven Details", [
      { label: "Brand/Manufacturer", value: data.ovenBrand },
      { label: "Model", value: data.ovenModel },
      { label: "Number of Decks", value: data.ovenCount },
      { label: "Last Cleaned", value: data.ovenLastCleaned },
      { label: "Notes", value: data.ovenNotes },
    ])
  }

  if (data.trapSize || data.trapLocation || data.trapLastCleaned || data.trapIssues || data.trapNotes) {
    addSection("Grease Trap Details", [
      { label: "Size (Gallons)", value: data.trapSize },
      { label: "Location", value: data.trapLocation },
      { label: "Last Cleaned", value: data.trapLastCleaned },
      { label: "Current Issues", value: data.trapIssues },
      { label: "Notes", value: data.trapNotes },
    ])
  }

  if (data.hoodType || data.hoodLength || data.hoodLastCleaned || data.hoodFilters || data.hoodRoofAccess || data.hoodNotes) {
    addSection("Hood Vent Details", [
      { label: "Hood Type", value: data.hoodType },
      { label: "Approximate Length", value: data.hoodLength },
      { label: "Last Cleaned", value: data.hoodLastCleaned },
      { label: "Number of Filters", value: data.hoodFilters },
      { label: "Rooftop Access", value: data.hoodRoofAccess },
      { label: "Notes", value: data.hoodNotes },
    ])
  }

  addSection("Scheduling Preference", [
    { label: "Preferred Date", value: data.preferredDate },
    { label: "Preferred Time", value: data.preferredTime },
  ])

  if (data.additionalNotes) {
    addSection("Additional Notes", [{ label: "Notes", value: data.additionalNotes }])
  }

  const photos = Array.isArray(data.photos) ? data.photos : []
  if (photos.length > 0) {
    y -= lineHeight
    const photoTitle = "Attached Photos"
    page.drawText(photoTitle, { x: margin, y, size: 13, font: titleFont })
    const titleWidth = titleFont.widthOfTextAtSize(photoTitle, 13)
    page.drawRectangle({
      x: margin,
      y: y - 2,
      width: titleWidth,
      height: 1,
      color: rgb(0, 0, 0),
    })
    y -= lineHeight + 8

    const imgMaxW = 250
    let photoPage = page
    let photoY = y

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i] as { name?: string; data?: string; type?: string }
      const base64 = photo?.data
      const type = (photo?.type || "").toLowerCase()
      if (!base64) continue

      const bytes = Buffer.from(base64, "base64")
      let img: Awaited<ReturnType<PDFDocument["embedPng"]>>
      try {
        if (type.includes("jpeg") || type.includes("jpg")) {
          img = await pdfDoc.embedJpg(bytes)
        } else {
          img = await pdfDoc.embedPng(bytes)
        }
      } catch {
        continue
      }

      const scale = Math.min(imgMaxW / img.width, imgMaxW / img.height)
      const w = img.width * scale
      const h = img.height * scale
      const pageHeight = photoPage.getSize().height
      if (photoY - h < margin) {
        photoPage = pdfDoc.addPage()
        photoY = pageHeight - margin - 20
      }
      photoPage.drawImage(img, { x: margin, y: photoY - h, width: w, height: h })
      photoY -= h + 12
    }
  }

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}

const smtpPort = Number(process.env.SMTP_PORT || 587)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Quote API: Missing SMTP env (SMTP_HOST, SMTP_USER, SMTP_PASS). Set in Vercel → Settings → Environment Variables.")
      return NextResponse.json(
        { success: false, message: "Email is not configured. Please try again later." },
        { status: 503 }
      )
    }
    const data = await request.json()

    const travelMiles = await getOneWayMiles(data)
    const emailBody = buildTextEmailBody(data)
    const pdfBuffer = await generateQuotePdf(data, travelMiles)

    const fromEmail =
      process.env.QUOTE_FROM_EMAIL?.trim() ||
      `Dirty Dawgz Oven Cleaning LLC <${process.env.SMTP_USER || "info@dirtydawgzovencleaning.com"}>`

    const sendPromise = transporter.sendMail({
      from: fromEmail,
      to: "info@dirtydawgzovencleaning.com",
      subject: `New Quote Request - ${data.business || data.name || "Website"}`,
      text: emailBody,
      attachments: [
        {
          filename: "quote-request.pdf",
          content: pdfBuffer,
        },
      ],
    })

    const timeoutMs = 8000
    await Promise.race([
      sendPromise,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Email send timeout")), timeoutMs)
      ),
    ])

    return NextResponse.json(
      {
        success: true,
        message: "Quote request received and emailed successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Failed to process quote request", error)
    return NextResponse.json(
      { success: false, message: "Failed to process quote request" },
      { status: 500 }
    )
  }
}
