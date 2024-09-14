import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";
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
  applyingFor: string;
  appliedJobs: string[];
  loading: boolean;
  error: string | null;
  success: boolean;
  meta: Meta;
}

// Define initial state
const initialState: JobsState = {
  jobs: [],
  job: {},
  applyingFor: "",
  appliedJobs: [],
  loading: false,
  error: null,
  success: false,
  meta: {
    total: 0,
    page: 1,
    limit: 10,
  },
};

// fetch all jobs  - admin (posted only)
export const fetchJobs = createAsyncThunk<ApiReponse, Record<string, any>>(
  "jobs/fetchJobs",
  async (query: Record<string, any>, { getState }) => {
    const state = getState() as RootState;
    const { page, limit } = state.job.meta;
    let queryString = "";

    for (const key in query) {
      if (query[key]) {
        queryString += `&${key}=${query[key]}`;
      }
    }

    const response = await apiClient.get(
      `/jobs?page=${page}&limit=${limit}${queryString}`
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

// Apply for a job
export const applyForJob = createAsyncThunk<Job, { id: string }>(
  "jobs/applyForJob",
  async ({ id }) => {
    const response = await apiClient.post(`/jobs/${id}/apply`);
    return response.data.data;
  }
);

// Fetch applied jobs
export const fetchAppliedJobs = createAsyncThunk<Job[]>(
  "jobs/fetchAppliedJobs",
  async () => {
    const response = await apiClient.get("/jobs?appliedOnly=1");
    return response.data.data;
  }
);

// Job slice
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.meta.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.meta.limit = action.payload;
    },
    setApplyingFor(state, action: PayloadAction<string>) {
      state.applyingFor = action.payload;
    },
    resetError(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.success = false;
    },
    resetJobs(state) {
      state.jobs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.job = action.payload;
        state.loading = false;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch job";
        state.job = {};
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data as Job[];
        state.meta = action.payload.meta as Meta;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch jobs";
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
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.appliedJobs.push(action.payload._id);
        state.loading = false;
        state.success = true;
        state.error = null;
        state.applyingFor = "";
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.applyingFor = "";
        state.error = action.error.message ?? "Failed to apply for job";
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.appliedJobs = action.payload?.map((job) => job._id);
      });

    builder.addMatcher(
      isAnyOf(
        fetchJob.pending,
        fetchJobs.pending,
        postJob.pending,
        updateJob.pending,
        deleteJob.pending,
        applyForJob.pending
      ),
      (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      }
    );
  },
});

// Export the action creators
export const {
  resetError,
  resetSuccess,
  setPage,
  setLimit,
  setApplyingFor,
  resetJobs,
} = jobSlice.actions;

// Export the reducer
export default jobSlice.reducer;
