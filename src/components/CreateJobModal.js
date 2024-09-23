import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Typography,
  CircularProgress
} from '@mui/material';
import { useApi } from '../hooks';
import { addJob } from '../api/jobs';

const initialValues = { title: '', description: '', company: '' };

export const CreateJobModal = ({ open, onClose, onJobCreate }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const { title, description, company } = formValues;
  const [createJob, { data, loading, error }] = useApi(addJob);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value});
  };

  useEffect(() => {
    if (data) {
      onJobCreate(data.jobId);
      onClose()
    };
  }, [data, formValues, onClose, onJobCreate]);

  const handleSubmit = async () => await createJob(formValues);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Job</DialogTitle>
      <DialogContent>
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error: {error.message}</Typography>}
        <Grid container spacing={0.5} mt={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Title"
              name="title"
              variant="outlined"
              value={title}
              onChange={handleChange}
              margin="dense"
              size='small'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              variant="outlined"
              value={description}
              onChange={handleChange}
              margin="dense"
              size='small'
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company"
              name="company"
              variant="outlined"
              value={company}
              onChange={handleChange}
              margin="dense"
              size='small'
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{py: 2, px:3}}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button disableElevation variant='contained' onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Create Job'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
