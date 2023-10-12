import { ThemeProvider } from '@/components/theme-providers';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster, toast } from 'sonner';
import { ModeToggle } from '@/components/mode-toggle';
import { Card } from '@/components/ui/card';
import Dropzone from '@/components/dropzone';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Statistics from '@/components/statistics';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iConvert',
  icons: {
    icon: '/favicon.ico',
  },
  description: 'A free image converter. Your data is your data.',
  applicationName: 'iConvert',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'Image Conversion', 'Free', 'TypeScript'],
  authors: [{ name: 'Mike Hoang' }],
  colorScheme: 'dark',
  creator: 'Mike Hoang',

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='relative flex lg:max-h-screen flex-col'>
            <main className='flex h-screen p-2 '>
              <Card className='flex w-full h-full flex-col relative'>
                <div className='w-full flex justify-between'>
                  <Header />
                  <div>
                    <ModeToggle />
                  </div>
                </div>

                <div className='flex flex-row h-full w-full border-t'>
                  <Sidebar />

                  {/* Main App */}
                  <div className='relative border-l h-full w-full p-0'>
                    {children}

                    <Statistics />
                  </div>
                  {/* Main App */}
                </div>
              </Card>
            </main>

            <Toaster richColors position='bottom-left' />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
