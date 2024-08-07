import type { Metadata } from "next"
import Navbar from "./components/Navbar"
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
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout
