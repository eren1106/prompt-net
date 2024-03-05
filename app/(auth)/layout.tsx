import { Toaster } from "@/components/ui/toaster"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className='container p-6 flex flex-col items-center flex-1'>
        {children}
      </main>
    </>
  )
}
