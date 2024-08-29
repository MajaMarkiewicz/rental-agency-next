import type { Metadata } from "next"
import Navbar from "./components/Navbar"
import "./globals.css"
import Footer from "./components/Footer"
import AuthProvider from "./components/AuthProvider"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { GlobalProvider } from "@/context/GlobalContext"

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
      <GlobalProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
      </GlobalProvider>
    </AuthProvider>
  )
}

export default RootLayout
