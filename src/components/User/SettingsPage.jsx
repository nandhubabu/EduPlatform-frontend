import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaUser,
  FaBell,
  FaPalette,
  FaShieldAlt,
  FaGlobe,
  FaKey,
  FaSave,
  FaToggleOn,
  FaToggleOff,
  FaEnvelope,
  FaMobile,
  FaDesktop,
  FaMoon,
  FaSun,
  FaVolumeUp,
  FaEye,
  FaLock,
  FaHistory,
  FaRocket,
  FaLightbulb,
  FaBuilding,
  FaGraduationCap
} from 'react-icons/fa';

const Settings = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Settings state
  const [settings, setSettings] = useState({
    // Profile settings
    profile: {
      firstName: userProfile?.name?.split(' ')[0] || '',
      lastName: userProfile?.name?.split(' ')[1] || '',
      email: userProfile?.email || '',
      phone: '',
      bio: '',
      location: '',
      timezone: 'UTC',
    },
    // Notification settings
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      courseUpdates: true,
      assignmentReminders: true,
      promotionalEmails: false,
      weeklyDigest: true,
      instantMessages: true,
    },
    // Career Exploration
    career: {
      careerGoals: [],
      experienceLevel: 'beginner',
      interestedRoles: [],
      salaryExpectation: '',
      workPreference: 'hybrid',
      availableToStart: 'immediately',
      willingToRelocate: false,
      preferredWorkSchedule: 'full-time',
    },
    // Skills & Interests
    interests: {
      technicalSkills: [],
      softSkills: [],
      learningStyle: 'visual',
      careerInterests: [],
      industryInterests: [],
      skillAssessmentCompleted: false,
      strengthsIdentified: [],
      areasForImprovement: [],
    },
    // Theme & Appearance
    appearance: {
      theme: 'light',
      primaryColor: 'blue',
      fontSize: 'medium',
      compactMode: false,
      animationsEnabled: true,
      highContrast: false,
    },
    // Privacy & Security
    privacy: {
      profileVisibility: 'public',
      showProgress: true,
      showAchievements: true,
      twoFactorAuth: false,
      loginAlerts: true,
      dataSharing: false,
    },
    // Learning preferences
    learning: {
      autoplay: true,
      playbackSpeed: '1x',
      subtitles: false,
      downloadQuality: 'medium',
      offlineMode: false,
      reminderTime: '18:00',
      dailyGoal: 30,
    },
    // Language & Region
    localization: {
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      currency: 'USD',
      region: 'US',
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
    }
  }, []);

  // Handle setting changes
  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  // Save settings
  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings));
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle component
  const Toggle = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`${
        enabled ? 'text-blue-600' : 'text-gray-400'
      } text-2xl transition-colors duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
      }`}
    >
      {enabled ? <FaToggleOn /> : <FaToggleOff />}
    </button>
  );

  // Tab navigation
  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'career', label: 'Career Exploration', icon: FaRocket },
    { id: 'interests', label: 'Skills & Interests', icon: FaLightbulb },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'privacy', label: 'Privacy & Security', icon: FaShieldAlt },
    { id: 'learning', label: 'Learning', icon: FaDesktop },
    { id: 'localization', label: 'Language & Region', icon: FaGlobe },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your learning experience and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="text-lg" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-md p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaUser className="mr-3 text-blue-600" />
                    Profile Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.firstName}
                        onChange={(e) => handleSettingChange('profile', 'firstName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.lastName}
                        onChange={(e) => handleSettingChange('profile', 'lastName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Career Exploration Tab */}
              {activeTab === 'career' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaRocket className="mr-3 text-blue-600" />
                    Career Exploration
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-4">Experience Level</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: 'beginner', label: 'Beginner', desc: 'New to the field' },
                          { value: 'intermediate', label: 'Intermediate', desc: '1-3 years experience' },
                          { value: 'advanced', label: 'Advanced', desc: '3+ years experience' }
                        ].map((level) => (
                          <button
                            key={level.value}
                            onClick={() => handleSettingChange('career', 'experienceLevel', level.value)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                              settings.career.experienceLevel === level.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium">{level.label}</div>
                            <div className="text-sm text-gray-500">{level.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills & Interests Tab */}
              {activeTab === 'interests' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaLightbulb className="mr-3 text-blue-600" />
                    Skills & Interests
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-4">Learning Style</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { value: 'visual', label: 'Visual', desc: 'Learn through images' },
                          { value: 'auditory', label: 'Auditory', desc: 'Learn through listening' },
                          { value: 'kinesthetic', label: 'Hands-on', desc: 'Learn by doing' },
                          { value: 'reading', label: 'Reading', desc: 'Learn through text' }
                        ].map((style) => (
                          <button
                            key={style.value}
                            onClick={() => handleSettingChange('interests', 'learningStyle', style.value)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                              settings.interests.learningStyle === style.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium">{style.label}</div>
                            <div className="text-sm text-gray-500">{style.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaBell className="mr-3 text-blue-600" />
                    Notification Preferences
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-800">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Toggle
                        enabled={settings.notifications.emailNotifications}
                        onChange={(value) => handleSettingChange('notifications', 'emailNotifications', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-800">Push Notifications</h3>
                        <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                      </div>
                      <Toggle
                        enabled={settings.notifications.pushNotifications}
                        onChange={(value) => handleSettingChange('notifications', 'pushNotifications', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaPalette className="mr-3 text-blue-600" />
                    Appearance & Theme
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-4">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: 'light', label: 'Light', icon: FaSun },
                          { value: 'dark', label: 'Dark', icon: FaMoon },
                          { value: 'auto', label: 'Auto', icon: FaDesktop }
                        ].map((theme) => {
                          const Icon = theme.icon;
                          return (
                            <button
                              key={theme.value}
                              onClick={() => handleSettingChange('appearance', 'theme', theme.value)}
                              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center ${
                                settings.appearance.theme === theme.value
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Icon className="text-2xl mb-2" />
                              <span className="font-medium">{theme.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaShieldAlt className="mr-3 text-blue-600" />
                    Privacy & Security
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <Toggle
                        enabled={settings.privacy.twoFactorAuth}
                        onChange={(value) => handleSettingChange('privacy', 'twoFactorAuth', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Learning Tab */}
              {activeTab === 'learning' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaDesktop className="mr-3 text-blue-600" />
                    Learning Preferences
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-800">Autoplay Videos</h3>
                        <p className="text-sm text-gray-600">Automatically play next video</p>
                      </div>
                      <Toggle
                        enabled={settings.learning.autoplay}
                        onChange={(value) => handleSettingChange('learning', 'autoplay', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Localization Tab */}
              {activeTab === 'localization' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaGlobe className="mr-3 text-blue-600" />
                    Language & Region
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Language
                      </label>
                      <select
                        value={settings.localization.language}
                        onChange={(e) => handleSettingChange('localization', 'language', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    {saveMessage && (
                      <p className={`text-sm ${saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {saveMessage}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaSave className="text-sm" />
                    <span>{isLoading ? 'Saving...' : 'Save Settings'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
