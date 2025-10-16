import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiMapPin, FiClock, FiPhone, FiUsers, FiInfo, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Button from '../../UI/Button';

const AdminCFNGroupTracker = () => {
  const { t } = useTranslation();
  const [searchAddress, setSearchAddress] = useState('');
  const [groups, setGroups] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    coordinator_id: '',
    group_name: '',
    country: '',
    state: '',
    city: '',
    address: ''
  });

  useEffect(() => {
    fetchGroups();
    fetchCoordinators();
  }, []);

  const fetchGroups = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "cfn_groups" }),
      });

      const result = await response.json();
      if (result.status === "success" && result.data) {
        setGroups(result.data);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCoordinators = async () => {
    try {
      const response = await fetch("/v1/admin?endpoint=listusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({}),
      });

      const result = await response.json();
      if (result.status === "success" && result.data) {
        const coords = result.data.filter(user => user.user_roles === 2);
        setCoordinators(coords);
      }
    } catch (error) {
      console.error("Error fetching coordinators:", error);
    }
  };

  const createGroup = async () => {
    try {
      const response = await fetch("/v1/admin?endpoint=addentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({
          table: "cfn_groups",
          data: formData
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert('CFN Group created successfully!');
        setShowCreateForm(false);
        setFormData({
          coordinator_id: '',
          group_name: '',
          country: '',
          state: '',
          city: '',
          address: ''
        });
        fetchGroups();
      } else {
        alert('Error creating group: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Error creating group:", error);
      alert('Error creating group. Please try again.');
    }
  };

  const handleSearch = () => {
    // Filter groups based on search address
    const filtered = groups.filter(group => 
      group.address?.toLowerCase().includes(searchAddress.toLowerCase()) ||
      group.group_name?.toLowerCase().includes(searchAddress.toLowerCase()) ||
      group.city?.toLowerCase().includes(searchAddress.toLowerCase())
    );
    return filtered;
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleEditGroup = (group) => {
    console.log('Edit group:', group);
    // Navigate to edit form
  };

  const handleDeleteGroup = (group) => {
    console.log('Delete group:', group);
    // Show confirmation dialog
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('cfnGroupTrackerTitle')} - Admin
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track CFN groups across all locations
          </p>
        </div>
        <Button 
          title="Add New Group" 
          icon={<FiPlus className="w-4 h-4" />}
          onClick={() => setShowCreateForm(true)}
        />
      </div>

      {/* Search Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Search CFN Groups
          </h2>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('searchAddress')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-paam-primary focus:border-transparent"
              />
            </div>
            <Button
              title={t('search')}
              icon={<FiSearch className="w-4 h-4" />}
              onClick={handleSearch}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-paam-primary"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      )}

      {/* Create Group Form */}
      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Create New CFN Group
            </h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Coordinator
              </label>
              <select
                value={formData.coordinator_id}
                onChange={handleInputChange('coordinator_id')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Select Coordinator</option>
                {coordinators.map(coord => (
                  <option key={coord.id} value={coord.id}>
                    {coord.firstname} {coord.lastname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Group Name
              </label>
              <input
                type="text"
                value={formData.group_name}
                onChange={handleInputChange('group_name')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={handleInputChange('country')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={handleInputChange('state')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={handleInputChange('city')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={handleInputChange('address')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button title="Create Group" onClick={createGroup} />
            <Button 
              title="Cancel" 
              variant="outline" 
              onClick={() => setShowCreateForm(false)} 
            />
          </div>
        </div>
      )}

      {/* Groups List */}
      {groups.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Groups List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              CFN Groups Found
            </h2>
            {(searchAddress ? handleSearch() : groups).map((group) => (
              <div
                key={group.id}
                className={`p-4 rounded-lg border transition-all ${
                  selectedGroup?.id === group.id
                    ? 'border-paam-primary bg-paam-primary/5 dark:bg-paam-primary/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 
                      className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-paam-primary"
                      onClick={() => handleGroupSelect(group)}
                    >
                      {group.group_name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditGroup(group)}
                        className="p-1 text-gray-400 hover:text-paam-primary transition-colors"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(group)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiMapPin className="w-4 h-4" />
                    <span>{group.address}, {group.city}, {group.state}, {group.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiUsers className="w-4 h-4" />
                    <span>Coordinator ID: {group.coordinator_id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Group Details */}
          <div className="space-y-4">
            {selectedGroup ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t('groupDetails')}
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      title="Edit"
                      variant="outline"
                      icon={<FiEdit className="w-4 h-4" />}
                      onClick={() => handleEditGroup(selectedGroup)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedGroup.group_name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{t('address')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGroup.address}, {selectedGroup.city}, {selectedGroup.state}, {selectedGroup.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <FiUsers className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Coordinator ID</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGroup.coordinator_id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {t('selectGroup')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCFNGroupTracker;