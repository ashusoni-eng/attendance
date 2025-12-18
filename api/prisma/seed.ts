import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const holidays = [

    {
      name: 'Christmas Day',
      description: 'Christian holiday',
      date: new Date('2025-12-25'),
    },

    // 2026 Holidays
    {
      name: 'New Year’s Day',
      description: 'First day of the year',
      date: new Date('2026-01-01'),
    },
    {
      name: 'Pongal',
      description: 'Harvest festival (Tamil Nadu)',
      date: new Date('2026-01-14'),
    },
    {
      name: 'Republic Day',
      description: 'National holiday',
      date: new Date('2026-01-26'),
    },
    {
      name: 'Maha Shivaratri',
      description: 'Hindu festival honoring Lord Shiva',
      date: new Date('2026-03-06'),
    },
    {
      name: 'Holi',
      description: 'Festival of colors',
      date: new Date('2026-03-17'),
    },
    {
      name: 'Good Friday',
      description: 'Christian holiday',
      date: new Date('2026-04-03'),
    },
    {
      name: 'Ram Navami',
      description: 'Birthday of Lord Rama',
      date: new Date('2026-04-09'),
    },
    {
      name: 'Mahavir Jayanti',
      description: 'Birthday of Lord Mahavir',
      date: new Date('2026-04-19'),
    },
    {
      name: 'May Day',
      description: 'International Workers’ Day',
      date: new Date('2026-05-01'),
    },
    {
      name: 'Eid al-Fitr',
      description: 'End of Ramadan (approximate)',
      date: new Date('2026-05-16'),
    },
    {
      name: 'Buddha Purnima',
      description: 'Birth of Buddha',
      date: new Date('2026-05-21'),
    },
    {
      name: 'Independence Day',
      description: 'National holiday',
      date: new Date('2026-08-15'),
    },
    {
      name: 'Raksha Bandhan',
      description: 'Hindu festival celebrating sibling bond',
      date: new Date('2026-08-23'),
    },
    {
      name: 'Janmashtami',
      description: 'Birthday of Lord Krishna',
      date: new Date('2026-08-30'),
    },
    {
      name: 'Ganesh Chaturthi',
      description: 'Festival honoring Lord Ganesha',
      date: new Date('2026-09-17'),
    },
    {
      name: 'Mahatma Gandhi Jayanti',
      description: 'Birthday of Mahatma Gandhi',
      date: new Date('2026-10-02'),
    },
    {
      name: 'Dussehra',
      description: 'Victory of good over evil',
      date: new Date('2026-10-12'),
    },
    {
      name: 'Diwali',
      description: 'Festival of Lights',
      date: new Date('2026-10-31'),
    },
    {
      name: 'Guru Nanak Jayanti',
      description: 'Birth of Guru Nanak',
      date: new Date('2026-11-15'),
    },
    {
      name: 'Christmas Day',
      description: 'Christian holiday',
      date: new Date('2026-12-25'),
    },
  ]

for (const holiday of holidays) {
  await prisma.publicHoliday.upsert({
    where: { date: holiday.date }, // Matches the @unique constraint
    update: {
      name: holiday.name,
      description: holiday.description,
    },
    create: holiday,
  })
}

console.log('Seed successful: December & January holidays synchronized.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })