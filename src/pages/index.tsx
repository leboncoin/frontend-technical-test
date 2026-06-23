import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    void router.replace('/messages')
  }, [router])

  return null
}

export default Home
