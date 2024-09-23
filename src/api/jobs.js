import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://localhost:8000'
});

// Fetch all jobs
export const getAllJobs = async () => {
  try {
    const response = await baseApi.get('/jobs');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch job by ID
export const getJobById = async (id) => {
  try {
    const response = await baseApi.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new job
export const addJob = async (jobData) => {
  try {
    const response = await baseApi.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
