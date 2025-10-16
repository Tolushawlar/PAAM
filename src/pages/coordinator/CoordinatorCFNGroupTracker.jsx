import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { FiSearch, FiMapPin, FiClock, FiPhone, FiUsers, FiInfo, FiEdit } from 'react-icons/fi';
import Button from '../../UI/Button';

const CoordinatorCFNGroupTracker = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchAddress, setSearchAddress] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchCoordinatorGroups();
    }
  }, [user]);

  const fetchCoordinatorGroups = async () => {
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
        const coordinatorGroups = result.data.filter(group => group.coordinator_id == user.id);
        setGroups(coordinatorGroups);
      }
    } catch (error) {
      console.error("Error fetching coordinator groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock CFN groups data for coordinator view
  const mockGroups = [
    {
      id: 1,
      name: "Downtown CFN Group",
      address: "123 Main St, Downtown, NY 10001",
      meetingTime: "Sundays 10:00 AM",
      contact: "+1 (555) 123-4567",
      members: 45,
      description: "A vibrant community focused on spiritual growth and community service.",
      leader: "Pastor John Smith",
      established: "2018",
      status: "Active",
      coordinator: "Current User"
    },
    {
      id: 2,
      name: "Riverside CFN Fellowship",
      address: "456 River Ave, Riverside, NY 10002",
      meetingTime: "Wednesdays 7:00 PM",
      contact: "+1 (555) 987-6543",
      members: 32,
      description: "Family-oriented group with emphasis on youth development and outreach.",
      leader: "Minister Sarah Johnson",
      established: "2020",
      status: "Active",
      coordinator: "Current User"
    }
  ];

  const handleSearch = () => {
    const filtered = groups.filter(group => 
      group.address?.toLowerCase().includes(searchAddress.toLowerCase()) ||
      group.group_name?.toLowerCase().includes(searchAddress.toLowerCase()) ||
      group.city?.toLowerCase().includes(searchAddress.toLowerCase())
    );
    return filtered;
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleEditGroup = (group) => {
    console.log('Edit group:', group);
    // Navigate to edit form
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
            {t('cfnGroupTrackerTitle')} - Coordinator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage CFN groups under your coordination
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Search Your CFN Groups
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

      {/* Groups List */}
      {groups.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Groups List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Your CFN Groups
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
                    <button
                      onClick={() => handleEditGroup(group)}
                      className="p-1 text-gray-400 hover:text-paam-primary transition-colors"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiMapPin className="w-4 h-4" />
                    <span>{group.address}, {group.city}, {group.state}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiClock className="w-4 h-4" />
                    <span>Coordinator Group</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <FiUsers className="w-4 h-4" />
                      <span>Group ID: {group.id}</span>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      Active
                    </span>
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
                  <Button
                    title="Edit Group"
                    variant="outline"
                    icon={<FiEdit className="w-4 h-4" />}
                    onClick={() => handleEditGroup(selectedGroup)}
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedGroup.group_name}
                    </h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                      selectedGroup.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {selectedGroup.status}
                    </span>
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
                      <FiClock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{t('meetingTime')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGroup.meetingTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <FiPhone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{t('contact')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGroup.contact}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <FiUsers className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{t('members')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGroup.members} active members</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <FiInfo className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{t('description')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGroup.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Leader</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGroup.leader}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Established</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGroup.established}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      title="Contact Group"
                      width="100%"
                      onClick={() => window.open(`tel:${selectedGroup.contact}`)}
                    />
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

export default CoordinatorCFNGroupTracker;