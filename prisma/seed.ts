import { PrismaClient, Gender, MaritalStatus, Religion, Diet, DrinkingHabit, SmokingHabit, EducationLevel, EmploymentType, UserRole, VerificationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("?? Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@matrimony.com" },
    update: {},
    create: {
      email: "admin@matrimony.com",
      name: "Admin User",
      passwordHash: adminPassword,
      role: UserRole.SUPER_ADMIN,
      emailVerified: new Date(),
      profile: {
        create: {
          firstName: "Admin",
          lastName: "User",
          dateOfBirth: new Date("1990-01-01"),
          gender: Gender.MALE,
          religion: Religion.HINDU,
          country: "India",
          state: "Maharashtra",
          city: "Mumbai",
          verificationStatus: VerificationStatus.VERIFIED,
          verifiedAt: new Date(),
          profileVisibility: false
        }
      }
    }
  });
  console.log("? Admin created:", admin.email);

  // Create demo user
  const userPassword = await bcrypt.hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@matrimony.com" },
    update: {},
    create: {
      email: "demo@matrimony.com",
      name: "Demo User",
      passwordHash: userPassword,
      role: UserRole.USER,
      emailVerified: new Date(),
      profile: {
        create: {
          firstName: "Demo",
          lastName: "User",
          dateOfBirth: new Date("1995-06-15"),
          gender: Gender.FEMALE,
          religion: Religion.HINDU,
          country: "India",
          state: "Karnataka",
          city: "Bangalore",
          height: 165,
          educationLevel: EducationLevel.MASTERS,
          employmentType: EmploymentType.EMPLOYED,
          occupation: "Software Engineer",
          companyName: "Tech Corp",
          annualIncome: "15-20 LPA",
          diet: Diet.VEGETARIAN,
          drinkingHabit: DrinkingHabit.NEVER,
          smokingHabit: SmokingHabit.NEVER,
          hobbies: ["Reading", "Traveling", "Cooking"],
          interests: ["Music", "Movies", "Yoga"],
          preferredAgeMin: 25,
          preferredAgeMax: 35,
          preferredReligion: [Religion.HINDU],
          preferredEducation: [EducationLevel.BACHELORS, EducationLevel.MASTERS],
          verificationStatus: VerificationStatus.VERIFIED,
          verifiedAt: new Date()
        }
      }
    }
  });
  console.log("? Demo user created:", user.email);

  // Create site settings
  const settings = [
    { key: "site_name", value: { value: "MatrimonyHub" }, description: "Site name" },
    { key: "site_tagline", value: { value: "Find Your Perfect Match" }, description: "Site tagline" },
    { key: "max_photos", value: { value: 6 }, description: "Maximum photos per profile" },
    { key: "min_age", value: { value: 18 }, description: "Minimum registration age" },
    { key: "max_age", value: { value: 70 }, description: "Maximum registration age" },
    { key: "enable_verification", value: { value: true }, description: "Enable photo verification" },
    { key: "maintenance_mode", value: { value: false }, description: "Maintenance mode" }
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    });
  }
  console.log("? Site settings created");

  // Create static pages
  const pages = [
    { slug: "about", title: "About Us", content: "<h1>About MatrimonyHub</h1><p>We help you find your perfect life partner.</p>", metaTitle: "About Us", metaDesc: "Learn about MatrimonyHub" },
    { slug: "privacy", title: "Privacy Policy", content: "<h1>Privacy Policy</h1><p>Your privacy is important to us.</p>", metaTitle: "Privacy Policy", metaDesc: "Privacy Policy" },
    { slug: "terms", title: "Terms of Service", content: "<h1>Terms of Service</h1><p>Please read our terms carefully.</p>", metaTitle: "Terms of Service", metaDesc: "Terms of Service" },
    { slug: "contact", title: "Contact Us", content: "<h1>Contact Us</h1><p>Get in touch with us.</p>", metaTitle: "Contact Us", metaDesc: "Contact MatrimonyHub" },
    { slug: "safety", title: "Safety Tips", content: "<h1>Safety Tips</h1><p>Stay safe while searching for your partner.</p>", metaTitle: "Safety Tips", metaDesc: "Online dating safety tips" },
    { slug: "success-stories", title: "Success Stories", content: "<h1>Success Stories</h1><p>Real couples who found love.</p>", metaTitle: "Success Stories", metaDesc: "Matrimony success stories" }
  ];

  for (const page of pages) {
    await prisma.pageContent.upsert({
      where: { slug: page.slug },
      update: { content: page.content },
      create: page
    });
  }
  console.log("? Static pages created");

  console.log("?? Seeding completed!");
}

main()
  .catch((e) => {
    console.error("? Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
