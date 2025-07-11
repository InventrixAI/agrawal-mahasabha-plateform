import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Super Admin
  const hashedPassword = await bcrypt.hash('Admin@123', 12)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@agarwalsabha.com' },
    update: {},
    create: {
      email: 'admin@agarwalsabha.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      isVerified: true,
    },
  })

  const adminMember = await prisma.member.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      membershipNo: 'AGR202400001',
      firstName: 'System',
      lastName: 'Administrator',
      fatherName: 'System',
      gotra: 'Admin',
      gender: 'MALE',
      locality: 'System',
    },
  })

  // Create sample approved members
  const sampleMembers = [
    {
      email: 'rajesh@example.com',
      firstName: 'Rajesh',
      lastName: 'Agarwal',
      gotra: 'Mittal',
      locality: 'Delhi',
      occupation: 'Business Owner',
      phone: '+91 98765 43210',
    },
    {
      email: 'priya@example.com',
      firstName: 'Priya',
      lastName: 'Sharma',
      gotra: 'Bansal',
      locality: 'Mumbai',
      occupation: 'Software Engineer',
      phone: '+91 98765 43211',
    },
    {
      email: 'amit@example.com',
      firstName: 'Amit',
      lastName: 'Gupta',
      gotra: 'Goyal',
      locality: 'Bangalore',
      occupation: 'Doctor',
      phone: '+91 98765 43212',
    },
    {
      email: 'sunita@example.com',
      firstName: 'Sunita',
      lastName: 'Jain',
      gotra: 'Jindal',
      locality: 'Pune',
      occupation: 'Teacher',
      phone: '+91 98765 43213',
    },
  ]

  for (const memberData of sampleMembers) {
    const user = await prisma.user.upsert({
      where: { email: memberData.email },
      update: {},
      create: {
        email: memberData.email,
        password: hashedPassword,
        role: 'MEMBER',
        status: 'ACTIVE',
        isVerified: true,
      },
    })

    await prisma.member.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        membershipNo: `AGR${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        fatherName: 'Sample Father',
        gotra: memberData.gotra,
        gender: 'MALE',
        locality: memberData.locality,
        occupation: memberData.occupation,
        phone: memberData.phone,
      },
    })
  }

  // Create pending members for admin approval
  const pendingMembers = [
    {
      email: 'pending1@example.com',
      firstName: 'Arjun',
      lastName: 'Agarwal',
      gotra: 'Garg',
      locality: 'Jaipur',
    },
    {
      email: 'pending2@example.com',
      firstName: 'Kavya',
      lastName: 'Bansal',
      gotra: 'Bansal',
      locality: 'Chennai',
    },
  ]

  for (const memberData of pendingMembers) {
    const user = await prisma.user.upsert({
      where: { email: memberData.email },
      update: {},
      create: {
        email: memberData.email,
        password: hashedPassword,
        role: 'MEMBER',
        status: 'PENDING', // Needs admin approval
        isVerified: false,
      },
    })

    await prisma.member.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        membershipNo: `AGR${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        fatherName: 'Sample Father',
        gotra: memberData.gotra,
        gender: 'MALE',
        locality: memberData.locality,
      },
    })
  }

  // Create sample news content
  await prisma.content.upsert({
    where: { slug: 'maharaja-agrasen-jayanti-2024' },
    update: {},
    create: {
      type: 'NEWS',
      title: 'Maharaja Agrasen Jayanti Celebration 2024',
      slug: 'maharaja-agrasen-jayanti-2024',
      content: `
        <p>We are excited to announce the annual Maharaja Agrasen Jayanti celebration. This year's event will be held at the Community Hall with cultural programs, community feast, and traditional ceremonies.</p>
        
        <p>Join us in celebrating the legacy of our revered ancestor and the values he stood for - unity, prosperity, and community welfare.</p>
        
        <h3>Event Highlights:</h3>
        <ul>
          <li>Traditional prayers and ceremonies</li>
          <li>Cultural performances by community members</li>
          <li>Community feast</li>
          <li>Awards for outstanding community service</li>
        </ul>
      `,
      excerpt:
        'Annual celebration of Maharaja Agrasen birth anniversary with cultural programs and community feast.',
      category: 'Events',
      tags: ['celebration', 'community', 'culture'],
      isPublished: true,
      publishedAt: new Date(),
      createdBy: adminUser.id,
    },
  })

  // Create sample event
  await prisma.content.upsert({
    where: { slug: 'diwali-celebration-2024' },
    update: {},
    create: {
      type: 'EVENT',
      title: 'Diwali Celebration 2024',
      slug: 'diwali-celebration-2024',
      content: `
        <p>Join us for a grand Diwali celebration with lights, sweets, cultural performances, and community bonding.</p>
        
        <p>This year's celebration will feature traditional rangoli competition, cultural performances, and a grand feast for all families.</p>
      `,
      excerpt: 'Grand Diwali celebration with cultural performances and community feast.',
      category: 'Festival',
      tags: ['diwali', 'festival', 'celebration'],
      isPublished: true,
      publishedAt: new Date(),
      metadata: {
        eventDate: '2024-10-28',
        eventTime: '19:00',
        venue: 'Grand Ballroom',
        registrationRequired: true,
        maxCapacity: 500,
      },
      createdBy: adminUser.id,
    },
  })

  // Create sample gallery
  await prisma.gallery.upsert({
    where: { id: 'sample-gallery-1' },
    update: {},
    create: {
      id: 'sample-gallery-1',
      title: 'Community Events 2024',
      description: 'Photos from various community events and celebrations',
      category: 'Events',
      images: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      ],
      isPublic: true,
      createdBy: adminUser.id,
    },
  })

  // Create site settings
  const settings = [
    { key: 'site_name', value: 'Agarwal Sabha Platform', category: 'general' },
    {
      key: 'site_description',
      value: 'Modern community management platform for Agarwal Sabha',
      category: 'general',
    },
    { key: 'contact_email', value: 'contact@agarwalsabha.com', category: 'contact' },
    { key: 'contact_phone', value: '+91 98765 43210', category: 'contact' },
    { key: 'address', value: 'Community Hall, Delhi', category: 'contact' },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('📧 Admin Login: admin@agarwalsabha.com')
  console.log('🔑 Admin Password: Admin@123')
  console.log('📊 Sample members created with pending approvals')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
