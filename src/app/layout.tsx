import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoWatch",
  description: "A real-time cryptocurrency dashboard.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-black text-white">
          {/* Desktop Sidebar - visible on medium screens and up */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto">
            {/* Mobile Navbar - visible on small screens */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}