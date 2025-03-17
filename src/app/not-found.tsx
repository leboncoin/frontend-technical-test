import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">Page not found</h2>
      <p className="text-lg mb-6">The page you are looking for does not exist.</p>
      <Link href="/fr" className="px-6 py-3 bg-[--color-leboncoin-orange] text-white rounded hover:opacity-90">
        Return to home page
      </Link>
    </div>
  )
}