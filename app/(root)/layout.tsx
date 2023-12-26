import Topbar from '@/components/Topbar'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '../providers'
import Footer from '@/components/Footer'

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
      <body className='min-h-screen relative flex flex-col bg-cyan-100'>
        <Providers>
          <Topbar />
          <div className='flex-1 flex flex-col items-center'>
            <div className='container p-6 flex flex-col items-center'>
              {children}
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}