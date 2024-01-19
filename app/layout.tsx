import React from 'react';
import { HEAD } from './components/HEAD';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <HEAD />
      <body>{children}</body>
    </html>
  )
}
