import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { JobCard } from './JobCard'

export const JobModal = ({ open, onClose, job }) => {
  if (!job) return <></>;
  return (
    <Dialog fullWidth sx={{ minWidth: 1000 }} open={open} onClose={onClose}>
    <DialogTitle>Job</DialogTitle>
    <DialogContent>
        <JobCard job={job} />
    </DialogContent>
    <DialogActions sx={{py: 2, px:3}}>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  )
}
