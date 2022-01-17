import { VFC } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import router from 'next/router'

type CustomAppBarProps = {
  title: string
  isBackButton?: boolean
}

const CustomAppBar: VFC<CustomAppBarProps> = ({ title, isBackButton = false }) => (
  <AppBar position="static">
    <Toolbar>
      {isBackButton && (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="back"
          sx={{ mr: 2 }}
          onClick={() => router.back()}
        >
          <ArrowBack />
        </IconButton>
      )}

      <Typography component="h1" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
)

export default CustomAppBar
