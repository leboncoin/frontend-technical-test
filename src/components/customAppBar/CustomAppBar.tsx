import { VFC } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import router from 'next/router'

type CustomAppBarProps = {
  text: string
  isBackButton?: boolean
}

const CustomAppBar: VFC<CustomAppBarProps> = ({ text, isBackButton = false }) => (
  <AppBar position="static">
    <Toolbar>
      {isBackButton && (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => router.back()}
        >
          <ArrowBack />
        </IconButton>
      )}

      <Typography component="h1" sx={{ flexGrow: 1 }}>
        {text}
      </Typography>
    </Toolbar>
  </AppBar>
)

export default CustomAppBar
