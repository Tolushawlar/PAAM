import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import Button from '../../UI/Button';

export default function AddMember() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userRole: ''
  });

  const breadcrumbItems = [
    { label: 'Member Management', href: '/admin/MemberManagement' },
    { label: 'Add New Member' }
  ];

  const roleOptions = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Coordinator' },
    { value: '3', label: 'Member' }
  ];

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Member data:', formData);
    // Handle form submission
  };

  return (
    <div className="p-6 w-full">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Add New Member</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Create a new member account for the platform</p>
      </div>

      <div className="card-base p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              placeholder="Enter first name"
              value={formData.firstname}
              onChange={handleInputChange('firstname')}
              required
            />

            <InputField
              label="Last Name"
              placeholder="Enter last name"
              value={formData.lastname}
              onChange={handleInputChange('lastname')}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
            />

            <InputField
              label="Phone Number"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              required
            />
          </div>

          <SelectField
            label="Role"
            options={roleOptions}
            value={formData.userRole}
            onChange={handleInputChange('userRole')}
            placeholder="Select user role"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange('password')}
              required
            />

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              title="Create Member"
              type="submit"
            />
            <Button
              title="Cancel"
              backgroundColor="#6B7280"
              onClick={() => window.history.back()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}