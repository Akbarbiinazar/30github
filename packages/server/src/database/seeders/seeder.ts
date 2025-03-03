
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAdmin() {
    const adminEmail = 'admin@gmail.com'
    const adminPassword = 'admin123'

    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    await prisma.user.create({
        data: {
            email: adminEmail,
            hashedPassword,
            role: 'ADMIN',
            permissions: ['READ_CONTENT', 'ADD_BOOK', 'DELETE_BOOK', 'UPDATE_BOOK'],
        }
    })

    console.log('Admin user created successfully')
}


seedAdmin()
  .catch((error) => {
    console.error('Error seeding admin user:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// async function seedData() {
//   // Seed Sunnah
//   await prisma.sunnah.createMany({
//     data: [
//       {
//         text: "The best of you are those who are best to their families.",
//         source: "Sahih Bukhari",
//       },
//       {
//         text: "The most beloved of deeds to Allah are those that are consistent, even if they are small.",
//         source: "Sahih Muslim",
//       },
//     ],
//   });

//   // Seed Quran Verses
//   await prisma.quranVerse.createMany({
//     data: [
//       {
//         verse: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
//         translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
//         tafsir: "This is the opening verse of the Quran, known as the Basmala.",
//         surah: "Al-Fatiha",
//         ayahNumber: 1,
//       },
//       {
//         verse: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
//         translation: "All praise is due to Allah, the Lord of all the worlds.",
//         tafsir: "This verse praises Allah as the Creator and Sustainer of all existence.",
//         surah: "Al-Fatiha",
//         ayahNumber: 2,
//       },
//     ],
//   });

//   console.log('Database seeded successfully');
// }

// seedData()
//   .catch((error) => {
//     console.error('Error seeding database:', error);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });