export const userSafeSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
} as const;

export const messageSelect = {
  id: true,
  content: true,
  createdAt: true,
  senderId: true,
  receiverId: true,
  sender: { select: userSafeSelect },
  receiver: { select: userSafeSelect },
} as const;

export const reportSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  category: true,
  createdAt: true,
  userId: true,
  user: { select: userSafeSelect },
} as const;

export const notificationSelect = {
  id: true,
  message: true,
  isRead: true,
  createdAt: true,
  userId: true,
  user: { select: userSafeSelect },
} as const;

