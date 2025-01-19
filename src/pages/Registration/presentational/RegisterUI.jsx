// src/pages/Register/presentational/RegisterUI.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from 'react-router-dom';
import { Mail, Lock, Building2, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import img from '../../../assets/job-hunt-concept-illustration_114360-4659.jpg';
const INDUSTRIES = [
  { id: 'tech', name: 'Technology & IT' },
  { id: 'healthcare', name: 'Healthcare & Medical' },
  { id: 'finance', name: 'Finance & Banking' },
  { id: 'education', name: 'Education & Training' },
  { id: 'manufacturing', name: 'Manufacturing & Industrial' }
];

const RegisterUI = ({ 
  formData, 
  setFormData, 
  handleSubmit, 
  isLoading,
  userRole,
  setUserRole
}) => {
  return (
    <div className="min-h-screen flex flex-row">
      {/* Form Section - Left */}
      <div className="w-full md:w-1/2 min-h-screen bg-white">
        <div className="max-w-md mx-auto px-4 py-8">
          <Card className="border-none shadow-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl md:text-3xl font-bold text-center">Create Account</CardTitle>
              <p className="text-center text-gray-500">Enter your details to register</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Fields */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <Label htmlFor="role">Select Role</Label>
                  <Select value={userRole} onValueChange={setUserRole}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employer</SelectItem>
                      <SelectItem value="jobseeker">Job Seeker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Employer Fields */}
                {userRole === 'employee' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Company Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select 
                        value={formData.industry}
                        onValueChange={(value) => setFormData({...formData, industry: value})}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((industry) => (
                            <SelectItem key={industry.id} value={industry.id}>
                              {industry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Job Seeker Fields */}
                {userRole === 'jobseeker' && (
                  <>
                    <div className="space-y-2">
                      <Label>Do you have professional experience?</Label>
                      <RadioGroup
                        value={formData.hasExperience}
                        onValueChange={(value) => setFormData({
                          ...formData, 
                          hasExperience: value,
                        })}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="exp-yes" />
                          <Label htmlFor="exp-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="exp-no" />
                          <Label htmlFor="exp-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select 
                        value={formData.industry}
                        onValueChange={(value) => setFormData({...formData, industry: value})}
                        disabled={formData.hasExperience === 'false'}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((industry) => (
                            <SelectItem key={industry.id} value={industry.id}>
                              {industry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) => setFormData({...formData, position: e.target.value})}
                          className="pl-10"
                          disabled={formData.hasExperience === 'false'}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Input
                        id="yearsOfExperience"
                        type="number"
                        min="0"
                        max="50"
                        value={formData.yearsOfExperience}
                        onChange={(e) => setFormData({...formData, yearsOfExperience: e.target.value})}
                        disabled={formData.hasExperience === 'false'}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (comma separated)</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="skills"
                          placeholder="React, Node.js, Python..."
                          value={formData.skills}
                          onChange={(e) => setFormData({...formData, skills: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Section - Right */}
      <div className="hidden md:flex md:w-1/2 bg-primary/10 h-screen fixed right-0">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={img}
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterUI;