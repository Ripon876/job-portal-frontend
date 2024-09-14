import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "@/apiClient";
import { AxiosError } from "axios";
import { RootState } from "../store";

export interface Job {
  _id: string;
  companyName: string;
  position: string;
  contract: string;
  location: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

interface ApiReponse {
  status: string;
  data: Job[] | Job;
  meta?: Meta;
}

interface JobsState {
  jobs: Job[];
  job: Job | {};
  loading: boolean;
  error: string | null;
  success: boolean;
  meta: Meta;
}

// Define initial state
const initialState: JobsState = {
  jobs: [],
  job: {},
  loading: false,
  error: null,
  success: false,
  meta: {
    total: 0,
    page: 1,
    limit: 10,
  },
};

// fetch all jobs
export const fetchJobs = createAsyncThunk<Job[]>("jobs/fetchJobs", async () => {
  const response = await apiClient.get("/jobs");
  return response.data;
});

// Get posted jobs for admin
export const fetchPostedJobs = createAsyncThunk<ApiReponse>(
  "jobs/fetchPostedJobs",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { page, limit } = state.job.meta;

    const response = await apiClient.get(
      `/jobs/admin?page=${page}&limit=${limit}`
    );
    return response.data;
  }
);

// Post a new job
export const postJob = createAsyncThunk<Job, Partial<Job>>(
  "jobs/postJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/jobs/admin", jobData);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }

        return rejectWithValue(error.response.data);
      } else {
        throw error;
      }
    }
  }
);

// Fetch a single job to edit
export const fetchJob = createAsyncThunk<Job, string>(
  "jobs/fetchJob",
  async (id: string) => {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data.data;
  }
);

// Update a job
export const updateJob = createAsyncThunk<
  Job,
  { id: string; jobData: Partial<Job> }
>("jobs/updateJob", async ({ id, jobData }) => {
  const response = await apiClient.put(`/jobs/${id}`, jobData);
  return response.data.data;
});

// Delete a job
export const deleteJob = createAsyncThunk<string, string>(
  "jobs/deleteJob",
  async (id) => {
    await apiClient.delete(`/jobs/${id}`);
    return id;
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.meta.page = action.payload;
    },
    resetError(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.job = action.payload;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch job";
        state.job = {};
      })
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch jobs";
      })
      .addCase(fetchPostedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data as Job[];
        state.meta = action.payload.meta as Meta;
      })
      .addCase(fetchPostedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch jobs";
      })
      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(postJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.jobs.push(action.payload);
      })
      .addCase(postJob.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch jobs";
      })
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action: PayloadAction<Job>) => {
        const index = state.jobs.findIndex(
          (job) => job._id === action.payload._id
        );
        if (index >= 0) {
          state.jobs[index] = action.payload;
        }

        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error.message ?? "Failed to update job";
      })
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action: PayloadAction<string>) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete job";
      });
  },
});

export const { resetError, resetSuccess, setPage } = jobSlice.actions;

// Export the reducer
export default jobSlice.reducer;
