import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import Button from '../../UI/Button';

export default function AddMember() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    othername: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    lga: '',
    city: '',
    address: '',
    country_code: '',
    occupation: '',
    user_roles: '',
    team: '',
    role_title: '',
    location_title: '',
    email_validated: 1,
    phone_validated: 0
  });

  const breadcrumbItems = [
    { label: 'Member Management', onClick: () => navigate('/admin/MemberManagement') },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://paamintl.org/v1/admin?endpoint=adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer fsdgsdfsdfgv4vwewetvwev'
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          othername: formData.othername,
          email: formData.email,
          phone: formData.phone,
          email_validated: formData.email_validated,
          phone_validated: formData.phone_validated,
          country: formData.country,
          state: formData.state,
          lga: formData.lga,
          city: formData.city,
          address: formData.address,
          country_code: formData.country_code,
          occupation: formData.occupation,
          user_roles: parseInt(formData.user_roles),
          team: formData.team,
          role_title: formData.role_title,
          location_title: formData.location_title
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        navigate('/admin/MemberManagement');
      } else {
        setError(result.message || 'Failed to create member');
      }
    } catch (error) {
      setError(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <InputField
              label="Other Name"
              placeholder="Enter other name"
              value={formData.othername}
              onChange={handleInputChange('othername')}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Country Code"
              placeholder="e.g. +234"
              value={formData.country_code}
              onChange={handleInputChange('country_code')}
              required
            />
            <InputField
              label="Occupation"
              placeholder="Enter occupation"
              value={formData.occupation}
              onChange={handleInputChange('occupation')}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <InputField
              label="Country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleInputChange('country')}
              required
            />
            <InputField
              label="State"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleInputChange('state')}
              required
            />
            <InputField
              label="LGA"
              placeholder="Enter LGA"
              value={formData.lga}
              onChange={handleInputChange('lga')}
              required
            />
            <InputField
              label="City"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleInputChange('city')}
              required
            />
          </div>

          <InputField
            label="Address"
            placeholder="Enter full address"
            value={formData.address}
            onChange={handleInputChange('address')}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Role"
              options={roleOptions}
              value={formData.user_roles}
              onChange={handleInputChange('user_roles')}
              placeholder="Select user role"
              required
            />
            <InputField
              label="Team"
              placeholder="Enter team"
              value={formData.team}
              onChange={handleInputChange('team')}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Role Title"
              placeholder="Enter role title"
              value={formData.role_title}
              onChange={handleInputChange('role_title')}
              required
            />
            <InputField
              label="Location Title"
              placeholder="Enter location title"
              value={formData.location_title}
              onChange={handleInputChange('location_title')}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              title={loading ? "Creating..." : "Create Member"}
              type="submit"
              disabled={loading}
            />
            <Button
              title="Cancel"
              backgroundColor="#6B7280"
              onClick={() => navigate('/admin/MemberManagement')}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}