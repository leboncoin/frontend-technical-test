import { FC } from 'react'
import { SWRConfig } from 'swr'
import toast from 'react-hot-toast'

const CustomSWRConfig: FC = ({ children }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 1000,
        onError: () => {
          toast.error(
            'petite erreur reseau, tiens bon ça va revenir',
            { duration: 5000, id: 'app' },
          )
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default CustomSWRConfig
