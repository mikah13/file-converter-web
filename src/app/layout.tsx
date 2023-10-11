import { ThemeProvider } from '@/components/theme-providers';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster, toast } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IConvert',
  icons: {
    icon: '/favicon.ico',
  },
  description: 'A free image converter. Your data is your data.',
  applicationName: 'IConvert',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'Image Conversion', 'Free', 'TypeScript'],
  authors: [{ name: 'Mike Hoang' }],
  colorScheme: 'dark',
  creator: 'Mike Hoang',
  // openGraph: {
  //   title: 'IConvert',
  //   description: 'A free image converter. Your data is your data.',
  //   siteName: 'IConvert',
  //   locale: 'en_US',
  //   type: 'website',
  // },
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
            {children}

            <Toaster richColors position='bottom-left' />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
