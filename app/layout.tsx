import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]"
import Provider from '@/components/client-provider'

export const metadata = {
  title: 'PromptNet',
  description: 'A platform where users can create, browse and share prompt templates that can later be used to prompt large language models such as ChatGPT, Gemini, and others.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className='min-h-screen relative flex flex-col'>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider session={session}>
            {children}
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body >
    </html >
  )
}
