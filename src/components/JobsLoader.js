import { Card, CardContent, Grid, Skeleton } from '@mui/material'
import React from 'react'

export const JobsLoader = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card variant="outlined">
            <CardContent>
              <Skeleton variant="rectangular" width="100%" height={140} />
              <Skeleton sx={{ mt: 1 }} variant="text" width="80%" />
              <Skeleton sx={{ mt: 1 }} variant="text" width="60%" />
              <Skeleton sx={{ mt: 1 }} variant="text" width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
