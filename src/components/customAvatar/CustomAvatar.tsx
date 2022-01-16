import { HTMLAttributes, VFC } from 'react'
import { Avatar } from '@mui/material'

type CustomAvatarProps = { name: string }

const CustomAvatar: VFC<CustomAvatarProps & HTMLAttributes<HTMLDivElement>> = ({ name, ...rest }) => {
  function stringToColor(string: string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.substr(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  return (
    <Avatar sx={{ bgcolor: stringToColor(name) }} {...rest}>
      {name.split('')[0]}
    </Avatar>
  )
}

export default CustomAvatar
