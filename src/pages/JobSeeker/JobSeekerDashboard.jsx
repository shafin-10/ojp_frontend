// src/pages/JobSeeker/JobSeekerDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/lib/context/AuthContext";
import HeroSection from "./components/HeroSection";
import Banner from "./components/Banner";
import LatestJobsSection from "./components/LatestJobsSection";
import FeaturedCompaniesSection from "./components/FeaturedCompaniesSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import Footer from "./components/Footer";
import EmployerJobsSection from "./components/EmployerJobsSection";
import UserDashboardSection from "./components/UserDashboardSection";
import { useAuth } from "@/lib/AuthContext";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isEmployer, isJobSeeker } = useAuth();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateStats = () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      if (isJobSeeker) {
        setStats({
          appliedJobs: user.jobApplicationList.length,
          interviews: user.jobApplicationList.filter(app => app.status === 'INTERVIEW').length,
          savedJobs: user.jobApplicationList.filter(app => app.status === 'SAVED').length,
          recentActivities: user.jobApplicationList
            .slice(0, 5)
            .map(application => ({
              type: 'application',
              job: application.jobTitle || 'Job Title',
              company: application.companyName || 'Company',
              date: application.appliedAt || new Date().toISOString()
            }))
        });
      } else if (isEmployer) {
        const totalApplications = user.jobsList.reduce(
          (total, job) => total + (job.applications?.length || 0),
          0
        );

        setStats({
          postedJobs: user.jobsList.length,
          totalApplications,
          activeJobs: user.jobsList.filter(job => job.status === 'ACTIVE').length,
          recentActivities: user.jobsList
            .slice(0, 5)
            .map(job => ({
              type: 'jobPosted',
              job: job.title,
              applications: job.applications?.length || 0,
              date: job.createdAt
            }))
        });
      }

      setIsLoading(false);
    };

    calculateStats();
  }, [user, isEmployer, isJobSeeker]);

  const handleActionClick = (action) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    switch (action) {
      case 'apply':
        if (isJobSeeker) {
          navigate('/jobs');
        }
        break;
      case 'post':
        if (isEmployer) {
          navigate('/post-job');
        }
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <>
          <Banner />
          <HeroSection onActionClick={handleActionClick} />
        </>
      ) : (
        <UserDashboardSection 
          user={{
            name: user.username,
            email: user.email,
            roles: isEmployer ? 'EMPLOYEER' : 'JOBSEEKER',
            jobsList: user.jobsList,
            jobApplicationList: user.jobApplicationList,
            position: isEmployer 
              ? `Employer at ${user.companyName || 'Company'}`
              : user.position || 'Job Seeker'
          }} 
          stats={stats}
        />
      )}

      {!isAuthenticated ? (
        <>
          <LatestJobsSection onActionClick={handleActionClick} />
          <FeaturedCompaniesSection onActionClick={handleActionClick} />
          <WhyChooseUsSection />
        </>
      ) : isEmployer ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <EmployerJobsSection 
              jobs={user.jobsList}
              totalApplications={stats?.totalApplications}
            />
          </div>
        </section>
      ) : (
        <>
          <LatestJobsSection 
            onActionClick={handleActionClick} 
            showAllJobs={true}
            title="Your Job Applications"
            description={`You have applied to ${stats?.appliedJobs || 0} jobs`}
            applications={user.jobApplicationList}
          />
          <FeaturedCompaniesSection 
            onActionClick={handleActionClick}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default JobSeekerDashboard;