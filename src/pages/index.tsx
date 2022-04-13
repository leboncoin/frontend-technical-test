import type { FC } from 'react'
import Image from 'next/image'
import Logo from '../assets/lbc-logo.webp'
import ListConversations from '../components/ListConversations'
import HelloUser from '../components/HelloUser'

const Home: FC = () => {
  return (
    <div>
      <Image src={Logo} alt="Leboncoin's logo" width={400} height={125} />

      <HelloUser />

      <h2>Your conversations</h2>
      <ListConversations />
    </div>
  )
}

export default Home