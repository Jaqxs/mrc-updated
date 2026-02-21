import { api } from "../api-client";

export interface Category {
    id: number;
    name: string;
}

export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    category: number | Category | null;
    experience: string;
    visa: string;
    salary_range: string;
    description: string;
    featured: boolean;
    urgent: boolean;
    is_active: boolean;
    created_at?: string;
}

export interface JobApplication {
    id: number;
    job: number;
    job_title: string;
    job_company: string;
    applicant_first_name: string;
    applicant_last_name: string;
    applicant_email: string;
    status: string;
    resume: string;
    cover_letter: string;
    applied_at: string;
    submitted_at: string;
}

export const jobService = {
    // Public Job Endpoints
    async getJobs(): Promise<Job[]> {
        return api.get<Job[]>("/jobs/", { skipAuth: true });
    },

    async getJobDetails(id: string | number): Promise<Job> {
        return api.get<Job>(`/jobs/${id}/`, { skipAuth: true });
    },

    async getCategories(): Promise<Category[]> {
        return api.get<Category[]>("/jobs/categories/", { skipAuth: true });
    },

    // Admin Job Endpoints
    async getAdminJobs(): Promise<Job[]> {
        return api.get<Job[]>("/jobs/admin/all/");
    },

    async createJob(jobData: any): Promise<Job> {
        return api.post<Job>("/jobs/create/", jobData);
    },

    async updateJob(id: number, data: Partial<Job>): Promise<Job> {
        return api.patch<Job>(`/jobs/update/${id}/`, data);
    },

    async deleteJob(id: number): Promise<void> {
        return api.delete(`/jobs/update/${id}/`);
    },

    // Application Endpoints
    async getApplications(): Promise<JobApplication[]> {
        return api.get<JobApplication[]>("/jobs/applications/");
    },

    async getAllApplicationsAdmin(): Promise<JobApplication[]> {
        return api.get<JobApplication[]>("/jobs/applications/all/");
    },

    async submitApplication(formData: FormData): Promise<any> {
        return api.post("/jobs/applications/submit/", formData);
    },

    async updateApplicationStatus(id: number, status: string): Promise<any> {
        return api.patch(`/jobs/applications/update/${id}/`, { status });
    }
};
