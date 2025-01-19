// src/pages/Register/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '@/lib/api/apiService';
import RegisterUI from './presentational/RegisterUI';
import { toast } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('JOBSEEKER');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    // Employee fields
    companyName: '',
    location: '',
    industry: '',
    // Job seeker fields
    hasExperience: 'false',
    skills: '',
    position: '',
    yearsOfExperience: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare registration data based on role
      const registrationData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        roles: userRole,
        ...(userRole === 'EMPLOYEER' ? {
          companyName: formData.companyName,
          location: formData.location,
          industry: formData.industry,
        } : {
          hasExperience: formData.hasExperience === 'true',
          skills: formData.skills,
          position: formData.position,
          yearsOfExperience: formData.yearsOfExperience,
        })
      };

      const response = await register(registrationData);
      
      if (response.success) {
        toast.success(response.message);
        navigate('/login');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterUI
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      userRole={userRole}
      setUserRole={setUserRole}
    />
  );
};

export default Register;