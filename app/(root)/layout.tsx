import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Topbar />
      <div className='flex-1 flex flex-col items-center pt-16'>
        <main className='container p-6 flex flex-col items-center'>
          {children}
        </main>
      </div>
      <Footer />
    </ >
  )
}