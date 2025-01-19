// src/components/sections/UserDashboardSection/UserDashboardSection.jsx
import { Mail, Briefcase, FileCheck, BookmarkIcon } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, iconColor, bgColor }) => (
  <div className={`bg-white rounded-lg p-6 hover:shadow-sm transition-shadow`}>
    <div className="flex items-center gap-4">
      <div className={`${bgColor} p-2 rounded-lg`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-900">{value}</h4>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  </div>
);

const UserDashboardSection = ({ user = {}, stats = {} }) => {
  const userInitial = user?.name?.charAt(0)?.toUpperCase() ?? 'U';
  
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="bg-gray-200 h-24 rounded-t-lg" />
          <div className="px-6 pb-6">
            <div className="flex items-start gap-4 -mt-8">
              {/* Avatar */}
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-xl text-primary font-medium">
                {userInitial}
              </div>
              
              {/* User Info */}
              <div className="flex-1 mt-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{user?.name || 'User'}</h2>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>{user?.email}</span>
                    </div>
                  </div>
                  <span className="mt-3 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {user?.roles === 'JOBSEEKER' ? 'Job Seeker' : 'Employer'}
                  </span>
                </div>
                
                {/* Position */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4 text-purple-500" />
                  <span>{user?.position || 'Position not specified'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        {
          user.roles!="EMPLOYEER"&&<div className="grid grid-cols-3 gap-4">
          <StatCard 
            icon={Briefcase}
            value={stats?.appliedJobs || 15}
            label="Applied Jobs"
            iconColor="text-blue-500"
            bgColor="bg-blue-50"
          />
          <StatCard 
            icon={FileCheck}
            value={stats?.interviews || 0}
            label="Interviews"
            iconColor="text-green-500"
            bgColor="bg-green-50"
          />
          <StatCard 
            icon={BookmarkIcon}
            value={stats?.savedJobs || 0}
            label="Saved Jobs"
            iconColor="text-purple-500"
            bgColor="bg-purple-50"
          />
        </div>
        }
        
      </div>
    </div>
  );
};

export default UserDashboardSection;