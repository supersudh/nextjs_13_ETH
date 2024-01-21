import React from 'react';

import './styles/global.scss';

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
