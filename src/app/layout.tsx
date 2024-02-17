import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/global.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Sarang Sayang | Singapore's largest malay wedding directory`,
  description: `Welcome to Sarang Sayang, a platform for all things malay weddings.`,
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
    </html>
  );
}
