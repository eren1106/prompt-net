import Topbar from '@/components/Topbar'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PromptNet',
  description: 'Platform for people to search, create, and share prompts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen relative flex flex-col'>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Topbar />
          <div className='flex-1 flex flex-col items-center'>
            <main className='container p-6 flex flex-col items-center'>
              {children}
            </main>
            <Toaster />
          </div>
          <Footer />
        </ThemeProvider>
      </body >
    </html >
  )
}