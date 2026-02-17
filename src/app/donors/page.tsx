'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Donor {
  id: string;
  name: string;
  bloodType: string;
  lastDonation: string;
  totalDonations: number;
  city: string;
  verified: boolean;
  availability: 'Available' | 'Not Available' | 'Soon';
}

const mockDonors: Donor[] = [
  {
    id: '1',
    name: 'John Doe',
    bloodType: 'O+',
    lastDonation: '2025-01-15',
    totalDonations: 12,
    city: 'New York',
    verified: true,
    availability: 'Available',
  },
  {
    id: '2',
    name: 'Jane Smith',
    bloodType: 'A+',
    lastDonation: '2025-02-01',
    totalDonations: 8,
    city: 'Los Angeles',
    verified: true,
    availability: 'Not Available',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    bloodType: 'B+',
    lastDonation: '2025-01-28',
    totalDonations: 15,
    city: 'Chicago',
    verified: true,
    availability: 'Available',
  },
  {
    id: '4',
    name: 'Emily Davis',
    bloodType: 'AB+',
    lastDonation: '2024-12-20',
    totalDonations: 5,
    city: 'Houston',
    verified: false,
    availability: 'Soon',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    bloodType: 'O-',
    lastDonation: '2025-02-05',
    totalDonations: 20,
    city: 'Phoenix',
    verified: true,
    availability: 'Available',
  },
  {
    id: '6',
    name: 'Sarah Brown',
    bloodType: 'A-',
    lastDonation: '2025-01-10',
    totalDonations: 11,
    city: 'Philadelphia',
    verified: true,
    availability: 'Available',
  },
];

export default function DonorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | 'Available' | 'Not Available' | 'Soon'>('All');

  const filteredDonors = mockDonors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodType = !bloodTypeFilter || donor.bloodType === bloodTypeFilter;
    const matchesAvailability = availabilityFilter === 'All' || donor.availability === availabilityFilter;

    return matchesSearch && matchesBloodType && matchesAvailability;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Not Available':
        return 'bg-red-100 text-red-800';
      case 'Soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Donor Profiles</h1>
          <p className="text-gray-600">
            Browse and view detailed information about our verified donors
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Donors
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 text-lg">🔍</span>
                <input
                  type="text"
                  placeholder="Search by name or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Blood Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blood Type
              </label>
              <select
                value={bloodTypeFilter}
                onChange={(e) => setBloodTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Blood Types</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value as "Available" | "Not Available" | "Soon" | "All")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="All">All</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
                <option value="Soon">Coming Soon</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredDonors.length} of {mockDonors.length} donors
          </div>
        </div>

        {/* Donors Grid */}
        {filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <Link key={donor.id} href={`/donors/${donor.id}`}>
                <div className="h-full bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{donor.name}</h3>
                      {donor.verified && <span className="text-lg">✓</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {donor.bloodType}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getAvailabilityColor(donor.availability)}`}>
                        {donor.availability}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 font-semibold">Total Donations</p>
                        <p className="text-xl font-bold text-blue-600">{donor.totalDonations}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 font-semibold">Last Donation</p>
                        <p className="text-xs font-semibold text-purple-600">
                          {new Date(donor.lastDonation).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>📍</span>
                      <span className="text-sm">{donor.city}</span>
                    </div>

                    {/* View Profile Button */}
                    <button className="w-full flex items-center justify-between px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-colors group-hover:gap-2">
                      <span>View Profile</span>
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No donors found matching your criteria</p>
          </div>
        )}
      </div>
    </main>
  );
}
