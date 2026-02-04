async function main() {
  console.log("Seeding database...");

  const hospital = await prisma.hospital.upsert({
    where: { email: "contact@redcross.com" },
    update: {},
    create: {
      name: "Red Cross Hospital",
      email: "contact@redcross.com",
      latitude: 28.7041,
      longitude: 77.1025,
    },
  });

  await prisma.user.upsert({
    where: { email: "donor1@redconnect.com" },
    update: {},
    create: {
      name: "Rahul Donor",
      email: "donor1@redconnect.com",
      password: "hashedpassword123",
      role: Role.DONOR,
      latitude: 28.6139,
      longitude: 77.2090,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@redconnect.com" },
    update: {},
    create: {
      name: "System Admin",
      email: "admin@redconnect.com",
      password: "hashedpassword123",
      role: Role.ADMIN,
    },
  });

  await prisma.bloodInventory.upsert({
    where: { id: "seed-inventory-1" },
    update: {},
    create: {
      id: "seed-inventory-1",
      bloodGroup: "O+",
      units: 10,
      expiryDate: new Date("2026-03-01"),
      hospitalId: hospital.id,
    },
  });

  await prisma.emergencyRequest.upsert({
    where: { id: "seed-request-1" },
    update: {},
    create: {
      id: "seed-request-1",
      bloodGroup: "A+",
      hospitalId: hospital.id,
      status: RequestStatus.PENDING,
    },
  });

  console.log("🌱 Seed data inserted successfully");
}