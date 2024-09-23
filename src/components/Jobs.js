import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { getAllJobs, getJobById } from '../api';
import { useApi } from '../hooks';
import { JobsLoader } from './JobsLoader';
import { CreateJobModal } from './CreateJobModal';
import { JobCard } from './JobCard';
import { JobModal } from './JobModal';

export const Jobs = () => {
  const [createJobModalOpen, setCreateJobModalOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [allJobs, setAllJobs] = useState([]);

  const [getJobs, { data: jobs, loading, error }] = useApi(getAllJobs);
  const [getJob, { data: job }] = useApi(getJobById);

  useEffect(() => {
    getJobs()
  }, [getJobs]);

  useEffect(() => {
    if (jobs) setAllJobs(jobs);
  }, [jobs]);

  const handleOpen = () => setCreateJobModalOpen(true);
  const handleClose = () => setCreateJobModalOpen(false);

  const handleJobModalClose = () => setJobModalOpen(false);

  const handleFetchJob = (id) => { 
    setJobModalOpen(true)
    getJob(id)
  }

  const onJobCreate = (newJobId) => setAllJobs([...allJobs, { id: newJobId, status: 'pending' }]);

  const { pendingJobsCount, failedJobsCount } = useMemo(() => {
    const pendingJobsCount = allJobs.filter((job) => job.status === 'pending').length;
    const failedJobsCount = allJobs.filter((job) => job.status === 'failed').length;
    return { pendingJobsCount, failedJobsCount };
  }, [allJobs]);


  const completedJobs = useMemo(() => allJobs.filter((job) => job.status === 'done'), [allJobs]);
  
  return (
    <Box m={3}>
    <Stack direction='row' justifyContent='space-between'>
    <Typography variant='h5'>
      {`${pendingJobsCount} job(s) are pending`}
      {failedJobsCount > 0 && ` and ${failedJobsCount} job(s) failed`}
    </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Job
      </Button>
    </Stack>
    <Box mt={2}>
      {loading && <JobsLoader />}
      {error && <Typography color="error">Error: {error.message}</Typography>}
      {completedJobs?.length > 0 && (
        <Grid container spacing={2}>
          {completedJobs.map((job) => (
            <Grid item xs={12} sm={6} md={3} key={job.id}>
              <Box onClick={() => handleFetchJob(job.id)} sx={{ cursor: 'pointer' }}>
                <JobCard job={job}/> 
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    {jobModalOpen && <JobModal job={job} open={jobModalOpen} onClose={handleJobModalClose} />}
    {createJobModalOpen && <CreateJobModal open={createJobModalOpen} onClose={handleClose} onJobCreate={onJobCreate} />}
    </Box>
  )
}
