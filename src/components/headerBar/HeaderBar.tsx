import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { VFC } from 'react'
import { IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

type HeaderBarProps = {
  title: string
  hasBackButton?: boolean
  handleBackButton?: () => void
}

const HeaderBar: VFC<HeaderBarProps> = ({
  title,
  hasBackButton = false,
  handleBackButton,
}) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {hasBackButton && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleBackButton}
            >
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default HeaderBar
