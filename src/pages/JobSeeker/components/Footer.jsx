import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-white text-xl font-bold">About JobPortal</h3>
            <p className="text-gray-400 leading-relaxed">
              We're dedicated to connecting talented professionals with their dream careers.
              Join thousands of job seekers who've found their perfect match through our platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Find Jobs', 'Company Reviews', 'Career Resources', 'Help Center'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="mr-2">→</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:support@jobportal.com" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>support@jobportal.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>(555) 123-4567</span>
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>123 Job Street, Tech Valley, Silicon City, 12345</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest job updates and career tips.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {currentYear} JobPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;