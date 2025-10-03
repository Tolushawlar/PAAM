import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiMapPin, FiClock, FiPhone, FiUsers, FiInfo } from 'react-icons/fi';
import Button from '../../UI/Button';

const UserCFNGroupTracker = () => {
  const { t } = useTranslation();
  const [searchAddress, setSearchAddress] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock CFN groups data
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
      established: "2018"
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
      established: "2020"
    },
    {
      id: 3,
      name: "Hillside CFN Community",
      address: "789 Hill Rd, Hillside, NY 10003",
      meetingTime: "Saturdays 6:00 PM",
      contact: "+1 (555) 456-7890",
      members: 28,
      description: "Small, intimate group focused on deep biblical study and prayer.",
      leader: "Elder Michael Brown",
      established: "2019"
    }
  ];

  const handleSearch = () => {
    if (!searchAddress.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockGroups);
      setIsLoading(false);
    }, 1000);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t('cfnGroupTrackerTitle')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('cfnGroupTrackerDesc')}
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t('enterAddress')}
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

      {/* Search Results */}
      {searchResults.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Groups List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              CFN Groups Found
            </h2>
            {searchResults.map((group) => (
              <div
                key={group.id}
                onClick={() => handleGroupSelect(group)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedGroup?.id === group.id
                    ? 'border-paam-primary bg-paam-primary/5 dark:bg-paam-primary/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-paam-primary/50'
                }`}
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {group.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiMapPin className="w-4 h-4" />
                    <span>{group.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiClock className="w-4 h-4" />
                    <span>{group.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiUsers className="w-4 h-4" />
                    <span>{group.members} {t('members')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Group Details */}
          <div className="space-y-4">
            {selectedGroup ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {t('groupDetails')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedGroup.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{t('address')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGroup.address}</p>
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

      {/* No Results */}
      {searchResults.length === 0 && searchAddress && !isLoading && (
        <div className="text-center py-8">
          <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default UserCFNGroupTracker;