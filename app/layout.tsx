import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rental site",
  description: "Rent your property with us!",
  keywords: "rent, flat, house, property, real estate"
}

const RootLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) =>  {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout
