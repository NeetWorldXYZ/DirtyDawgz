import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const config = [
  // components/ui contains vendored shadcn/ui primitives; lint only project code
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'components/ui/**'] },
  ...coreWebVitals,
  ...typescript,
]

export default config
