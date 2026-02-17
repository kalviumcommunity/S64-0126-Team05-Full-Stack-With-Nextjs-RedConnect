"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import Cookies from "js-cookie";

interface BloodBank {
  id: number;
  name: string;
  city: string;
  inventories: {
    id: number;
    bloodType: string;
    units: number;
    minUnits: number;
  }[];
}

interface Donor {
  id: number;
  name: string;
  email: string;
  bloodType: string;
  city: string;
  isActive: boolean;
}

interface DonationData {
  donorId: number;
  bloodBankId: number;
  units: number;
  bloodType: string;
  notes?: string;
}

export default function DonatePage() {
  const [selectedDonor, setSelectedDonor] = useState<number>(0);
  const [selectedBloodBank, setSelectedBloodBank] = useState<number>(0);
  const [units, setUnits] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fetch blood banks with inventory
  const { data: bloodBanksData, error: bloodBanksError, isLoading: isBanksLoading } = useSWR(
    "/api/blood-banks?page=1&limit=20",
    fetcher,
    { refreshInterval: 30000 }
  );

  // Fetch donors
  const { data: donorsData, error: donorsError, isLoading: isDonorsLoading } = useSWR(
    "/api/donors?page=1&limit=50&isActive=true",
    fetcher,
    { refreshInterval: 60000 }
  );

  // Handle data structure properly (API returns nested structure)
  const bloodBanks: BloodBank[] = bloodBanksData?.data?.data || bloodBanksData?.data || [];
  const donors: Donor[] = donorsData?.data?.data || donorsData?.data || [];

  const selectedDonorData = donors.find((d) => d.id === selectedDonor);
  const selectedBloodBankData = bloodBanks.find((b) => b.id === selectedBloodBank);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!selectedDonor || !selectedBloodBank || units <= 0) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    if (!selectedDonorData) {
      setErrorMessage("Please select a valid donor");
      return;
    }

    setIsSubmitting(true);

    try {
      // Optimistic update for blood bank inventory
      const optimisticUpdate = {
        ...bloodBanksData,
        data: (bloodBanksData?.data?.data || bloodBanksData?.data || []).map((bank: BloodBank) => {
          if (bank.id === selectedBloodBank) {
            return {
              ...bank,
              inventories: bank.inventories.map((inv) => {
                if (inv.bloodType === selectedDonorData.bloodType) {
                  return { ...inv, units: inv.units + units };
                }
                return inv;
              }),
            };
          }
          return bank;
        }),
      };

      // Apply optimistic update
      mutate("/api/blood-banks?page=1&limit=20", optimisticUpdate, false);

      const donationData: DonationData = {
        donorId: selectedDonor,
        bloodBankId: selectedBloodBank,
        units,
        bloodType: selectedDonorData.bloodType,
        notes,
      };

      const token = Cookies.get("auth_token");
      const response = await fetch("/api/blood-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error("Unable to process donation. Please try again.");
      }

      // Success - revalidate related data
      mutate("/api/blood-banks?page=1&limit=20");
      mutate("/api/donors?page=1&limit=50&isActive=true");

      setSuccessMessage(`✅ Donation successful! ${units} units of ${selectedDonorData.bloodType} blood donated.`);
      
      // Reset form
      setSelectedDonor(0);
      setSelectedBloodBank(0);
      setUnits(1);
      setNotes("");

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);

    } catch (error: unknown) {
      // Log for debugging but don't expose to user
      console.error("Donation processing error");
      setErrorMessage((error instanceof Error) ? "Unable to process donation. Please try again." : "An unexpected error occurred");
      
      // Revalidate to restore original data on error
      mutate("/api/blood-banks?page=1&limit=20");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bloodBanksError || donorsError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Unable to load data</h2>
          <p className="text-red-600">
            We encountered an issue loading the required data. Please try again.
          </p>
          <button
            onClick={() => {
              mutate("/api/blood-banks?page=1&limit=20");
              mutate("/api/donors?page=1&limit=50&isActive=true");
            }}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Blood Donation Form</h1>
          <p className="text-gray-600">Record a new blood donation with real-time inventory updates</p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-green-600">{successMessage}</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-red-600">{errorMessage}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Donor *</label>
                <select
                  value={selectedDonor}
                  onChange={(e) => setSelectedDonor(Number(e.target.value))}
                  required
                  disabled={isDonorsLoading}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                >
                  <option value={0}>{isDonorsLoading ? "Loading donors..." : "Choose a donor..."}</option>
                  {donors.map((donor) => (
                    <option key={donor.id} value={donor.id}>
                      {donor.name} ({donor.bloodType}) - {donor.city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Blood Bank *</label>
                <select
                  value={selectedBloodBank}
                  onChange={(e) => setSelectedBloodBank(Number(e.target.value))}
                  required
                  disabled={isBanksLoading}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                >
                  <option value={0}>{isBanksLoading ? "Loading blood banks..." : "Choose a blood bank..."}</option>
                  {bloodBanks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name} - {bank.city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Units of Blood *</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Any special notes about this donation..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isBanksLoading || isDonorsLoading}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {isSubmitting ? "Processing..." : "💉 Record Donation"}
              </button>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            {/* Donor Preview */}
            {selectedDonorData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Donor Information</h3>
                <div className="space-y-2">
                  <div><span className="font-medium">Name:</span> {selectedDonorData.name}</div>
                  <div><span className="font-medium">Email:</span> {selectedDonorData.email}</div>
                  <div><span className="font-medium">Blood Type:</span> 
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {selectedDonorData.bloodType}
                    </span>
                  </div>
                  <div><span className="font-medium">City:</span> {selectedDonorData.city}</div>
                  <div><span className="font-medium">Status:</span> 
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedDonorData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedDonorData.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Blood Bank Preview */}
            {selectedBloodBankData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Blood Bank Inventory</h3>
                <div className="mb-3">
                  <div className="font-medium text-gray-900">{selectedBloodBankData.name}</div>
                  <div className="text-sm text-gray-600">{selectedBloodBankData.city}</div>
                </div>
                
                {selectedDonorData && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Current {selectedDonorData.bloodType} Inventory:
                    </div>
                    {selectedBloodBankData.inventories
                      .filter(inv => inv.bloodType === selectedDonorData.bloodType)
                      .map(inv => (
                        <div key={inv.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">{inv.bloodType}</span>
                          <span className={`font-semibold ${
                            inv.units <= inv.minUnits ? 'text-red-600' : 
                            inv.units <= inv.minUnits * 2 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {inv.units} units
                          </span>
                        </div>
                      ))
                    }
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  After donation: +{units} units
                </div>
              </div>
            )}

            {/* Summary */}
            {selectedDonorData && selectedBloodBankData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Donation Summary</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>Donor: {selectedDonorData.name}</div>
                  <div>Blood Bank: {selectedBloodBankData.name}</div>
                  <div>Blood Type: {selectedDonorData.bloodType}</div>
                  <div>Units: {units}</div>
                  {notes && <div>Notes: {notes}</div>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Donations</h3>
          <div className="text-sm text-gray-600">
            Recent donations will appear here after successful submissions.
          </div>
        </div>
      </div>
    </main>
  );
}