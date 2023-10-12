import { ThemeProvider } from "@/components/theme-providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, AR_One_Sans } from "next/font/google";
import { Toaster, toast } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import { Card } from "@/components/ui/card";
import Dropzone from "@/components/dropzone";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Statistics from "@/components/statistics";
import Providers from "@/lib/providers";

const inter = AR_One_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iConvert | Free converter tool",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "iConvert let you convert and compress images effortlessly to PNG, JPEG, TIFF, BMP, etc. No signup required. Your data stays private. Enjoy easy image conversion and compression.",
  applicationName: "iConvert",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "Image Conversion", "Free", "TypeScript"],
  authors: [{ name: "Mike Hoang" }],
  colorScheme: "dark",
  creator: "Mike Hoang",
  openGraph: {
    title: "iConvert | Free converter tool",
    description:
      "iConvert let you convert and compress images effortlessly to PNG, JPEG, TIFF, BMP, etc. No signup required. Your data stays private. Enjoy easy image conversion and compression.",
    url: "https://iconvert.vercel.app/",
    images: [
      {
        url: "https://iconvert.vercel.app/favicon.ico",
        width: 128,
        height: 128,
        alt: "iConvert",
      },
    ],
  },
  twitter: {
    title: "iConvert | Free converter tool",
    description:
      "iConvert let you convert and compress images effortlessly to PNG, JPEG, TIFF, BMP, etc. No signup required. Your data stays private. Enjoy easy image conversion and compression.",
    images: [
      {
        url: "https://iconvert.vercel.app/favicon.ico",
        width: 128,
        height: 128,
        alt: "iConvert",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex flex-col lg:max-h-screen">
              <main className="flex h-screen p-2 ">
                <Card className="relative flex h-full w-full flex-col">
                  <div className="flex w-full justify-between">
                    <Header />
                    <div>
                      <ModeToggle />
                    </div>
                  </div>

                  <div className="flex h-full w-full flex-row border-t">
                    <Sidebar />

                    {/* Main App */}
                    <div className="relative h-full w-full border-l p-0">
                      {children}

                      <Statistics />
                    </div>
                    {/* Main App */}
                  </div>
                </Card>
              </main>

              <Toaster richColors position="bottom-left" />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
