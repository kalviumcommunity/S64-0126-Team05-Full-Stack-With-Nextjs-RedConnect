"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { fetcher } from "@/lib/fetcher";
import FormSelect from "@/components/ui/FormSelect";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";

interface BloodBank {
  id: string;
  name: string;
  city: string;
  inventories: {
    id: string;
    bloodType: string;
    units: number;
    minUnits: number;
  }[];
}

interface Donor {
  id: string;
  name: string;
  email: string;
  bloodType: string;
  city: string;
  isActive: boolean;
}

// Donation Schema - using Zod for validation
const donationSchema = z.object({
  donorId: z.string().min(1, "Please select a donor"),
  bloodBankId: z.string().min(1, "Please select a blood bank"),
  units: z
    .number()
    .min(1, "At least 1 unit is required")
    .max(5, "Maximum 5 units per donation"),
  notes: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

export default function DonatePage() {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  // Fetch blood banks with inventory
  const {
    data: bloodBanksData,
    error: bloodBanksError,
    isLoading: isBanksLoading,
  } = useSWR("/api/blood-banks?page=1&limit=20", fetcher, {
    refreshInterval: 30000,
  });

  // Fetch donors
  const {
    data: donorsData,
    error: donorsError,
    isLoading: isDonorsLoading,
  } = useSWR("/api/donors?page=1&limit=50&isActive=true", fetcher, {
    refreshInterval: 60000,
  });

  // Handle data structure properly (API returns nested structure)
  const bloodBanks: BloodBank[] =
    bloodBanksData?.data?.data || bloodBanksData?.data || [];
  const donors: Donor[] = donorsData?.data?.data || donorsData?.data || [];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donorId: "",
      bloodBankId: "",
      units: 1,
      notes: "",
    },
  });

  // Watch form values for preview
  const watchedDonorId = watch("donorId");
  const watchedBloodBankId = watch("bloodBankId");
  const watchedUnits = watch("units");

  const selectedDonorData = donors.find((d) => d.id === watchedDonorId);
  const selectedBloodBankData = bloodBanks.find(
    (b) => b.id === watchedBloodBankId
  );

  const donorOptions = donors.map((donor) => ({
    value: donor.id,
    label: `${donor.name} (${donor.bloodType}) - ${donor.city}`,
  }));

  const bloodBankOptions = bloodBanks.map((bank) => ({
    value: bank.id,
    label: `${bank.name} - ${bank.city}`,
  }));

  const onSubmit = async (data: DonationFormData) => {
    setServerError("");
    setSuccessMessage("");

    if (!selectedDonorData) {
      setServerError("Please select a valid donor");
      return;
    }

    try {
      // Preserve API response structure for optimistic update
      const currentBanks =
        bloodBanksData?.data?.data || bloodBanksData?.data || [];
      const updatedBanks = currentBanks.map((bank: BloodBank) => {
        if (bank.id === data.bloodBankId) {
          return {
            ...bank,
            inventories: bank.inventories.map((inv) => {
              if (inv.bloodType === selectedDonorData.bloodType) {
                return { ...inv, units: inv.units + data.units };
              }
              return inv;
            }),
          };
        }
        return bank;
      });

      // Maintain API response structure
      const optimisticUpdate = bloodBanksData?.data?.data
        ? {
            ...bloodBanksData,
            data: { ...bloodBanksData.data, data: updatedBanks },
          }
        : { ...bloodBanksData, data: updatedBanks };

      // Apply optimistic update
      mutate("/api/blood-banks?page=1&limit=20", optimisticUpdate, false);

      const donationData = {
        donorId: data.donorId,
        bloodBankId: data.bloodBankId,
        units: data.units,
        bloodType: selectedDonorData.bloodType,
        notes: data.notes || "",
      };

      const response = await fetch("/api/blood-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(donationData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to process donation. Please try again."
        );
      }

      // Success - revalidate related data
      mutate("/api/blood-banks?page=1&limit=20");
      mutate("/api/donors?page=1&limit=50&isActive=true");

      setSuccessMessage(
        `✅ Donation successful! ${data.units} units of ${selectedDonorData.bloodType} blood donated.`
      );

      // Reset form
      reset({
        donorId: "",
        bloodBankId: "",
        units: 1,
        notes: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error: unknown) {
      setServerError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );

      // Revalidate to restore original data on error
      mutate("/api/blood-banks?page=1&limit=20");
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
          <h1 className="text-3xl font-bold text-gray-900">
            Blood Donation Form
          </h1>
          <p className="text-gray-600">
            Record a new blood donation with real-time inventory updates
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <span className="text-green-600">{successMessage}</span>
          </div>
        )}

        {serverError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-600">{serverError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Donation Details
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormSelect
                label="Select Donor"
                name="donorId"
                options={donorOptions}
                register={register("donorId", {
                  valueAsNumber: true,
                  setValueAs: (v) => Number(v),
                })}
                error={errors.donorId?.message}
                required
                disabled={isDonorsLoading}
                placeholder={
                  isDonorsLoading ? "Loading donors..." : "Choose a donor..."
                }
              />

              <FormSelect
                label="Select Blood Bank"
                name="bloodBankId"
                options={bloodBankOptions}
                register={register("bloodBankId", {
                  valueAsNumber: true,
                  setValueAs: (v) => Number(v),
                })}
                error={errors.bloodBankId?.message}
                required
                disabled={isBanksLoading}
                placeholder={
                  isBanksLoading
                    ? "Loading blood banks..."
                    : "Choose a blood bank..."
                }
              />

              <FormInput
                label="Units of Blood"
                type="number"
                name="units"
                placeholder="Enter units (1-5)"
                register={register("units", {
                  valueAsNumber: true,
                  setValueAs: (v) => Number(v),
                })}
                error={errors.units?.message}
                required
              />

              <FormTextarea
                label="Notes (Optional)"
                name="notes"
                placeholder="Any special notes about this donation..."
                register={register("notes")}
                error={errors.notes?.message}
                rows={3}
              />

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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Donor Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedDonorData.name}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedDonorData.email}
                  </div>
                  <div>
                    <span className="font-medium">Blood Type:</span>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {selectedDonorData.bloodType}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">City:</span>{" "}
                    {selectedDonorData.city}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedDonorData.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedDonorData.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Blood Bank Preview */}
            {selectedBloodBankData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Blood Bank Inventory
                </h3>
                <div className="mb-3">
                  <div className="font-medium text-gray-900">
                    {selectedBloodBankData.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedBloodBankData.city}
                  </div>
                </div>

                {selectedDonorData && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Current {selectedDonorData.bloodType} Inventory:
                    </div>
                    {selectedBloodBankData.inventories
                      .filter(
                        (inv) => inv.bloodType === selectedDonorData.bloodType
                      )
                      .map((inv) => (
                        <div
                          key={inv.id}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm">{inv.bloodType}</span>
                          <span
                            className={`font-semibold ${
                              inv.units <= inv.minUnits
                                ? "text-red-600"
                                : inv.units <= inv.minUnits * 2
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {inv.units} units
                          </span>
                        </div>
                      ))}
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  After donation: +{watchedUnits || 0} units
                </div>
              </div>
            )}

            {/* Summary */}
            {selectedDonorData && selectedBloodBankData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Donation Summary
                </h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>Donor: {selectedDonorData.name}</div>
                  <div>Blood Bank: {selectedBloodBankData.name}</div>
                  <div>Blood Type: {selectedDonorData.bloodType}</div>
                  <div>Units: {watchedUnits}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Donations
          </h3>
          <div className="text-sm text-gray-600">
            Recent donations will appear here after successful submissions.
          </div>
        </div>
      </div>
    </main>
  );
}
