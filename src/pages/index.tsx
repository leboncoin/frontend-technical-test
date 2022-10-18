import { FC, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ConversationContext } from '../store/store'

const Home: FC = () => {
  const {
    userInfo: { isLogged },
  } = useContext(ConversationContext)
  const router = useRouter()
  useEffect(() => {
    if (isLogged) router.push('/conversations')
  }, [isLogged, router])

  return null
}

export default Home
