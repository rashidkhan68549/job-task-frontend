import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

export const JobCard = ({ job }) => {
	const { title, description, company, imageUrl = '/images/placeholder-image.png' } = job
  return (
		<Card variant="outlined">
			<CardMedia
					component="img"
					height="140"
					image={imageUrl}
					alt="Job Image"
					sx={{ objectFit: 'cover' }}
			/>
			<CardContent>
					<Typography variant="h6">{title}</Typography>
					<Typography variant="body2" color="textSecondary">{description}</Typography>
					<Typography variant="body2" color="textSecondary">{company}</Typography>
			</CardContent>
	</Card>
  )
}
