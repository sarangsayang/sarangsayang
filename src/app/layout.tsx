import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/global.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: `Sarang Sayang | Singapore's largest online malay wedding directory`,
  description: `Welcome to Sarang Sayang, a platform for all things malay weddings. Sarang Sayang is Singapore's largest Malay Wedding Directory. It acts as an online platform that houses Malay wedding vendors for all things Malay weddings. Our mission is to help and empower our Malay community by making wedding planning easier for all couples. We connect Malay wedding vendors to couples planning for their dream wedding through the convenience of one platform.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            <Providers>
              <Navbar />
              {children}
              <Footer />
            </Providers>
          </div>
        </main>
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-XL4YB5SEJY" />
    </html>
  );
}
