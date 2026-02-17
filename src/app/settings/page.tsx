"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "sonner";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [userSettings, setUserSettings] = useState({
    email: "admin@redconnect.org",
    fullName: "Administrator",
    organization: "RedConnect",
    role: "ADMIN",
    phone: "+1 (555) 123-4567",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    emergencyAlerts: true,
    weeklyReport: true,
    systemUpdates: false,
    donorSignups: true,
    campaignUpdates: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "PUBLIC",
    dataSharing: false,
    analyticsTracking: true,
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved");
  };

  const handleSavePrivacy = () => {
    toast.success("Privacy settings updated");
  };

  const handleChangePassword = () => {
    toast.success("Password change email sent");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Manage your account, preferences, and system settings
        </p>
      </div>

      {/* Theme Settings */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Theme & Appearance
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Customize how RedConnect looks and feels
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Theme Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["light", "dark", "system"].map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption as "light" | "dark" | "system")}
                  className={`p-4 rounded-lg border-2 transition text-center ${
                    theme === themeOption
                      ? "border-brand-DEFAULT bg-brand-light"
                      : "border-gray-200 hover:border-brand-DEFAULT"
                  }`}
                >
                  <span className="text-2xl block mb-2">
                    {themeOption === "light"
                      ? "☀️"
                      : themeOption === "dark"
                        ? "🌙"
                        : "🔄"}
                  </span>
                  <p className="text-sm font-medium capitalize text-gray-900">
                    {themeOption}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Profile Information
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={userSettings.fullName}
                onChange={(e) =>
                  setUserSettings({ ...userSettings, fullName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={userSettings.email}
                onChange={(e) =>
                  setUserSettings({ ...userSettings, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={userSettings.phone}
                onChange={(e) =>
                  setUserSettings({ ...userSettings, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization
              </label>
              <input
                type="text"
                value={userSettings.organization}
                onChange={(e) =>
                  setUserSettings({
                    ...userSettings,
                    organization: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={userSettings.role}
              onChange={(e) =>
                setUserSettings({ ...userSettings, role: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
            >
              <option value="DONOR">Donor</option>
              <option value="HOSPITAL">Hospital</option>
              <option value="NGO">NGO</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSaveProfile}
              className="px-6 py-2 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium"
            >
              Save Changes
            </button>
            <button
              onClick={handleChangePassword}
              className="px-6 py-2 border border-brand-DEFAULT text-brand-DEFAULT rounded-lg hover:bg-brand-light transition font-medium"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Notifications
        </h2>

        <div className="space-y-4">
          {[
            {
              key: "emailNotifications",
              label: "Email Notifications",
              description: "Receive email updates about your activities",
            },
            {
              key: "emergencyAlerts",
              label: "Emergency Alerts",
              description: "Get notified of urgent blood requests",
            },
            {
              key: "weeklyReport",
              label: "Weekly Report",
              description: "Receive a summary of your activities every week",
            },
            {
              key: "systemUpdates",
              label: "System Updates",
              description: "Be informed about new features and updates",
            },
            {
              key: "donorSignups",
              label: "Donor Sign-ups",
              description: "Notifications when new donors register",
            },
            {
              key: "campaignUpdates",
              label: "Campaign Updates",
              description: "Get updates on active campaigns",
            },
          ].map((setting) => (
            <label
              key={setting.key}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition"
            >
              <input
                type="checkbox"
                checked={
                  notificationSettings[setting.key as keyof typeof notificationSettings]
                }
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    [setting.key]: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded border-gray-300 text-brand-DEFAULT cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {setting.label}
                </p>
                <p className="text-sm text-gray-600">
                  {setting.description}
                </p>
              </div>
            </label>
          ))}

          <button
            onClick={handleSaveNotifications}
            className="mt-4 px-6 py-2 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium"
          >
            Save Notification Settings
          </button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Privacy & Security
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Profile Visibility
            </label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) =>
                setPrivacySettings({
                  ...privacySettings,
                  profileVisibility: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
            >
              <option value="PUBLIC">Public (Visible to all users)</option>
              <option value="PRIVATE">Private (Only you)</option>
              <option value="TRUSTED">Trusted (Only verified members)</option>
            </select>
            <p className="text-xs text-gray-600 mt-2">
              Choose who can see your profile and donation history
            </p>
          </div>

          <label className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition">
            <input
              type="checkbox"
              checked={privacySettings.dataSharing}
              onChange={(e) =>
                setPrivacySettings({
                  ...privacySettings,
                  dataSharing: e.target.checked,
                })
              }
              className="w-5 h-5 rounded border-gray-300 text-brand-DEFAULT cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Data Sharing
              </p>
              <p className="text-sm text-gray-600">
                Allow your anonymized data to be used for research
              </p>
            </div>
          </label>

          <label className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition">
            <input
              type="checkbox"
              checked={privacySettings.analyticsTracking}
              onChange={(e) =>
                setPrivacySettings({
                  ...privacySettings,
                  analyticsTracking: e.target.checked,
                })
              }
              className="w-5 h-5 rounded border-gray-300 text-brand-DEFAULT cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Analytics & Tracking
              </p>
              <p className="text-sm text-gray-600">
                Help us improve RedConnect by analyzing usage patterns
              </p>
            </div>
          </label>

          <button
            onClick={handleSavePrivacy}
            className="mt-4 px-6 py-2 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium"
          >
            Save Privacy Settings
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-lg p-6 border border-red-200">
        <h2 className="text-lg font-semibold text-red-800 mb-4">
          ⚠️ Danger Zone
        </h2>
        <p className="text-sm text-red-700 mb-4">
          These actions cannot be undone. Please proceed with caution.
        </p>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-100 transition font-medium">
            🔐 Deactivate Account
          </button>
          <button className="px-6 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-100 transition font-medium">
            🗑️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
