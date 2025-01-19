// src/components/JobSeeker/sections/LatestJobsSection/index.jsx
import { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from "lucide-react";
import JobCard from "./JobCard";
import { applyForJob, getAllJobList } from '@/lib/api/apiService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

const LatestJobsSection = ({ onActionClick, showAllJobs, title, description }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isJobSeeker } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [applying, setApplying] = useState(null);


  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await getAllJobList();
      setJobs(Array.isArray(response) ? response : []);
    } catch (error) {
      toast.error('Failed to fetch jobs');
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    console.log(isAuthenticated);
    console.log(isJobSeeker);
    if (!isAuthenticated) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }

    if (!isJobSeeker) {
      toast.error('Only job seekers can apply for jobs');
      return;
    }

    try {
      setApplying(jobId);
      const response = await applyForJob(jobId);
      
      if (response.success) {
        toast.success(response.message);
        // Optionally refresh the jobs list to update application counts
        fetchJobs();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to apply for job. Please try again.');
    } finally {
      setApplying(null);
    }
  };

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {title || "Latest Job Openings"}
          </h2>
          <p className="text-gray-600">
            {description || "Discover your next career opportunity"}
          </p>
        </div>
        {!showAllJobs && (
          <button
            onClick={() => onActionClick("viewAll")}
            className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All Jobs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No jobs available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={{
                ...job,
                position: job.title,
                postedAt: job.createdDate,
                salary: job.salaryRange,
                applications: job.jobApplicationList?.length || 0,
                location: job.location || 'Remote'
              }}
              onApply={() => handleApply(job.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestJobsSection;