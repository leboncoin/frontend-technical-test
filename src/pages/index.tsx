import Layout from '@/layouts/base'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <div className="flex justify-center">
        <Link
          href="/conversations"
          className="rounded-2xl bg-orange-600 p-4 font-bold text-white transition hover:opacity-90"
        >
          Conversations
        </Link>
      </div>
    </Layout>
  )
}
