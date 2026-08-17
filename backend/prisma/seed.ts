import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const dataPath = path.join(__dirname, 'seed-data', 'db.json');
const raw = fs.readFileSync(dataPath, 'utf-8');
const data = JSON.parse(raw);

function mapRole(role: string): Role {
  switch (role) {
    case 'Head Admin':
      return Role.HEAD_ADMIN;
    case 'Admin':
      return Role.ADMIN;
    default:
      return Role.USER;
  }
}

async function main() {
  console.log('Seeding attractions...');
  for (const a of data.attractions ?? []) {
    await prisma.attraction.create({
      data: { text: a.text, img: a.img },
    });
  }

  console.log('Seeding gallery...');
  for (const g of data.gallery ?? []) {
    await prisma.galleryImage.create({
      data: { imgPath: g.img_Path, description: g.description },
    });
  }

  console.log('Seeding apartments...');
  const apartmentIdMap = new Map<string, string>();

  for (const apt of data.apartaments ?? []) {
    const created = await prisma.apartment.create({
      data: {
        imagePath: apt.imagePath,
        name: apt.name,
        city: apt.city,
        street: apt.street,
        rentalFee: apt.rentalFee,
        apartmentSize: apt.apartmentSize,
        rooms: apt.rooms,
        description: apt.description,
        floor: apt.floor,
        elevator: apt.elevator,
        parkingSpace: apt.parkingSpace,
        available: apt.available,
        fullDescription: apt.fullDescription,
        kitchenType: apt.details?.flat?.kitchenType,
        bathroomWithToilet: apt.details?.flat?.bathroomWithToilet,
        balcony: apt.details?.flat?.balcony,
        terrace: apt.details?.flat?.terrace,
        market: apt.details?.flat?.market,
        buildingType: apt.details?.buidling?.buildingType,
        buildingMaterial: apt.details?.buidling?.buildingMaterial,
        dateBuilding: apt.details?.buidling?.dateBuilding,
        addedDate: apt.details?.advertisement?.addedDate,
        lastUpdate: apt.details?.advertisement?.lastUpdate,
        idAdvertisement: apt.details?.advertisement?.idAdvertisement,
        views: apt.details?.advertisement?.views ?? 0,
      },
    });
    apartmentIdMap.set(apt.id, created.id);
  }

  console.log('Seeding opinions...');
  for (const op of data.opinions ?? []) {
    const apartmentId = apartmentIdMap.get(op.apartamentId);
    if (!apartmentId) {
      console.warn(`Skipping opinion ${op.id} — no matching apartment for ${op.apartamentId}`);
      continue;
    }
    await prisma.opinion.create({
      data: {
        customerId: op.CustomerId,
        gender: op.gender,
        firstName: op.firstName,
        lastName: op.lastName,
        opinionDate: op.opinionDate,
        opinionContent: op.opinionContent,
        rating: op.rating,
        apartmentId,
      },
    });
  }

  console.log('Seeding users...');
  for (const u of data.users ?? []) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        passwordHash,
        gender: u.gender,
        firstName: u.firstName,
        lastName: u.lastName,
        phone: u.phone,
        role: mapRole(u.role),
      },
      create: {
        email: u.email,
        passwordHash,
        gender: u.gender,
        firstName: u.firstName,
        lastName: u.lastName,
        phone: u.phone,
        role: mapRole(u.role),
      },
    });
  }

  console.log('Seeding messages...');
  for (const m of data.messages ?? []) {
    await prisma.message.create({
      data: {
        name: m.name,
        email: m.email,
        number: m.number,
        subject: m.subject,
        message: m.message,
        check: !!m.check,
      },
    });
  }

  console.log('Seeding contact requests...');
  for (const c of data.contact ?? []) {
    await prisma.contactRequest.create({
      data: {
        message: c.message,
        name: c.name,
        email: c.email,
        phoneNumber: c.phoneNumber,
        news: !!c.news,
        loan: !!c.loan,
      },
    });
  }

  console.log('Seeding phone call requests...');
  for (const p of data.PhoneNumbersToCall ?? []) {
    await prisma.phoneCallRequest.create({
      data: {
        number: p.number,
        time: p.time,
      },
    });
  }

  console.log('Done seeding!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });