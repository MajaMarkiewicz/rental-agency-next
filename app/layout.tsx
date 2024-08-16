import type { Metadata } from "next"
import Navbar from "./components/Navbar"
import "./globals.css"
import Footer from "./components/Footer"
import AuthProvider from "./components/AuthProvider"

export const metadata: Metadata = {
  title: "Rental site",
  description: "Rent your property with us!",
  keywords: "rent, flat, house, property, real estate"
}

const RootLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) =>  {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}

export default RootLayout
