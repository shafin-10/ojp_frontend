// src/components/JobSeeker/sections/FeaturedCompaniesSection/data.js
export const FEATURED_COMPANIES = [
  {
    id: 1,
    name: "Tech Giants Co.",
    description: "Leading technology solutions provider",
    openPositions: 15,
    logo: "/api/placeholder/64/64",
  },
  {
    id: 2,
    name: "Innovate Labs",
    description: "Cutting-edge research and development",
    openPositions: 8,
    logo: "/api/placeholder/64/64",
  },
  {
    id: 3,
    name: "Digital Future",
    description: "Building tomorrow's digital solutions",
    openPositions: 12,
    logo: "/api/placeholder/64/64",
  },
];

// src/components/JobSeeker/sections/FeaturedCompaniesSection/index.jsx
import { ArrowRight } from "lucide-react";

const FeaturedCompaniesSection = ({ onActionClick }) => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-semibold mb-4 block">
                For Employers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Looking to Hire Top Talent?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Post your job openings and reach thousands of qualified
                candidates. Our platform connects you with the right talent for
                your company.
              </p>
              <button
                onClick={() => onActionClick("postJob")}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold 
                           hover:bg-blue-700 transition-all duration-300 
                           hover:shadow-lg hover:-translate-y-1
                           flex items-center gap-2 group"
              >
                Post a Job Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {FEATURED_COMPANIES.map((company) => (
                <div
                  key={company.id}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-300
                             transform hover:-translate-y-1 group cursor-pointer"
                >
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 group-hover:shadow-md transition-all">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-16 h-16 mx-auto"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-center">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    {company.openPositions} open positions
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompaniesSection;
