"use client";

import { useState } from "react";
import { Modal, Loader } from "@/components";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Delete Confirmation Demo Page
 * 
 * This page demonstrates:
 * 1. Modal for blocking feedback (delete confirmation)
 * 2. Toast for instant feedback (successful deletion)
 * 3. Loader for process feedback (deletion in progress)
 * 4. Complete user flow with error handling
 */
export default function DeleteConfirmationDemo() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Carol White", email: "carol@example.com" },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle delete confirmation flow
  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Handle deletion API call
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Remove user from list
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));

      // Close modal
      setIsDeleteModalOpen(false);
      setUserToDelete(null);

      // Show success toast
      toast.success(`${userToDelete.name} has been deleted successfully!`, {
        description: "The user has been permanently removed from the system.",
      });
    } catch {
      // Show error toast
      toast.error("Failed to delete user", {
        description: "An error occurred while deleting. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Delete Confirmation Demo
          </h1>
          <p className="mt-2 text-gray-600">
            This page demonstrates the complete feedback flow: Modal for
            blocking feedback, Loader for process feedback, and Toast for
            instant feedback.
          </p>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Users</h2>
          </div>

          {users.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    disabled={isDeleting}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 transition font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-lg">
                No users found. All users have been deleted.
              </p>
            </div>
          )}
        </div>

        {/* Feedback Elements Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Modal</h3>
            <p className="text-sm text-gray-600">
              Click delete to open a blocking confirmation modal that asks for
              user confirmation.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Loader</h3>
            <p className="text-sm text-gray-600">
              While the deletion is processing (1.5s simulation), a loader
              shows progress feedback.
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Toast</h3>
            <p className="text-sm text-gray-600">
              After successful deletion, a toast notification provides instant
              feedback.
            </p>
          </div>
        </div>

        {/* UX Principles */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <h3 className="text-xl font-semibold mb-4">UX Principles Demonstrated</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <span>
                <strong>Non-intrusive feedback:</strong> Toasts appear in top-right,
                modals overlay the content clearly, loaders don&apos;t block
                the entire interface unless necessary.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <span>
                <strong>Informative messages:</strong> Each action provides
                context-specific feedback so users understand what happened.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <span>
                <strong>Accessible interactions:</strong> All elements have ARIA
                roles, keyboard navigation works (Esc to close modal), focus is
                properly managed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <span>
                <strong>Clear visual hierarchy:</strong> Danger actions are red,
                success is green, neutral actions are gray/blue.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete User?"
        description={
          userToDelete
            ? `Are you sure you want to delete "${userToDelete.name}"? This action cannot be undone.`
            : ""
        }
        onClose={() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        size="md"
        actions={{
          confirm: {
            label: isDeleting ? "Deleting..." : "Delete",
            onClick: handleConfirmDelete,
            variant: "danger",
          },
          cancel: { label: "Cancel" },
        }}
      />

      {/* Deletion Loader Overlay */}
      <Loader
        isLoading={isDeleting}
        message="Deleting user..."
        variant="spinner"
        fullScreen={true}
      />
    </div>
  );
}
