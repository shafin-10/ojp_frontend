// src/components/JobSeeker/sections/WhyChooseUsSection/data.js
export const FEATURES = [
  {
    title: "Smart Job Matching",
    description:
      "Our AI-powered system matches you with the most relevant opportunities",
    icon: "🎯",
  },
  {
    title: "Verified Employers",
    description:
      "All companies are thoroughly vetted to ensure legitimate opportunities",
    icon: "✓",
  },
  {
    title: "Career Growth",
    description: "Access resources and tools to help advance your career",
    icon: "📈",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose JobPortal
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to making your job search experience seamless and
            successful
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
