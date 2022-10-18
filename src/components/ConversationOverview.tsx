import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { determineCorrespondent } from '../utils/determineCorrespondent'
import { getFirstCharacterCapitalized } from '../utils/getFirstCharacterCapitalized'
import { CorrespondentQuery } from '../types/correspondent'

const ConversationOverview: FC<CorrespondentQuery> = (props) => {
  const correspondent = determineCorrespondent(props)

  return (
    <Link href={`/conversations/${props.id}`}>
      <div className="border border-1 rounded-md p-4 m-2 flex items-center space-x-3 md:space-x-5 hover:border-lbc cursor-pointer">
        <div className="inline-flex overflow-hidden relative items-center justify-center bg-lbc w-10 md:w-14 h-10 md:h-14 rounded-full ">
          <span className="text-white">
            {getFirstCharacterCapitalized(correspondent.nickname)}
          </span>
        </div>
        <div className="space-y-0.5 font-medium dark:text-white text-left">
          <p>{correspondent.nickname}</p>
          <p>{format(props.lastMessageTimestamp, 'MMMM do')}</p>
        </div>
      </div>
    </Link>
  )
}

export default ConversationOverview
