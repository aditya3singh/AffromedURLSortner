import React from 'react'
import ShortenerForm from './components/ShortenerForm'
import StatsPage from './components/StatsPage'
import { Container, Typography } from '@mui/material'

function App() {
  return (
    <Container>
      <Typography variant="h3" align="center" sx={{ mt: 5 }}>
        AffordMed URL Shortener
      </Typography>
      <ShortenerForm />
      <StatsPage />
    </Container>
  )
}

export default App
