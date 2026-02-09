export const userSafeSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
} as const;

export const donorSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  bloodType: true,
  dateOfBirth: true,
  address: true,
  city: true,
  lastDonated: true,
  isActive: true,
  createdAt: true,
} as const;

export const bloodBankSelect = {
  id: true,
  name: true,
  address: true,
  city: true,
  contactNo: true,
  email: true,
  createdAt: true,
} as const;

export const donationSelect = {
  id: true,
  units: true,
  status: true,
  notes: true,
  createdAt: true,
  donorId: true,
  bloodBankId: true,
} as const;
