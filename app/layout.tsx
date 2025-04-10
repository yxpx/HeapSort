import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Heap Sort',
  description: 'Heap Sort Visualizer',
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "any" }]}
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
