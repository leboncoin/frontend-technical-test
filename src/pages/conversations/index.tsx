import React, { FC, useContext } from 'react'
import { UserContext } from 'src/context/user.context'

 const ConversationsPage: FC = () => {
  const userId = useContext(UserContext)
  console.log(userId)
  return (
    <div className='h-auto'>index</div>
  )
}


export default ConversationsPage