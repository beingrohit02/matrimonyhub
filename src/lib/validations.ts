import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

export const profileSchema = z.object({
  // Basic Info
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  maritalStatus: z.enum(["NEVER_MARRIED", "DIVORCED", "WIDOWED", "ANNULLED"]).default("NEVER_MARRIED"),
  height: z.coerce.number().min(100).max(250).optional(),
  weight: z.coerce.number().min(30).max(200).optional(),
  bloodGroup: z.string().optional(),
  complexion: z.string().optional(),
  bodyType: z.string().optional(),
  physicalDisability: z.string().optional(),

  // Location
  country: z.string().min(1, "Country is required").default("India"),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  citizenship: z.string().optional(),
  residencyStatus: z.string().optional(),

  // Religion & Culture
  religion: z.enum(["HINDU", "MUSLIM", "CHRISTIAN", "SIKH", "BUDDHIST", "JAIN", "JEWISH", "OTHER", "NONE"]),
  caste: z.string().optional(),
  subCaste: z.string().optional(),
  motherTongue: z.string().optional(),
  gotra: z.string().optional(),
  manglik: z.boolean().default(false),
  starSign: z.string().optional(),

  // Education & Career
  educationLevel: z.enum(["HIGH_SCHOOL", "DIPLOMA", "BACHELORS", "MASTERS", "PHD", "PROFESSIONAL", "OTHER"]).optional(),
  educationField: z.string().optional(),
  collegeName: z.string().optional(),
  employmentType: z.enum(["EMPLOYED", "SELF_EMPLOYED", "BUSINESS_OWNER", "STUDENT", "UNEMPLOYED", "RETIRED"]).optional(),
  occupation: z.string().optional(),
  companyName: z.string().optional(),
  annualIncome: z.string().optional(),
  workLocation: z.string().optional(),

  // Family
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  siblingsCount: z.coerce.number().min(0).max(20).default(0),
  marriedSiblingsCount: z.coerce.number().min(0).max(20).default(0),
  familyType: z.string().optional(),
  familyValues: z.string().optional(),
  familyStatus: z.string().optional(),

  // Lifestyle
  diet: z.enum(["VEGETARIAN", "NON_VEGETARIAN", "VEGAN", "EGGETARIAN"]).optional(),
  drinkingHabit: z.enum(["NEVER", "OCCASIONALLY", "REGULARLY"]).default("NEVER"),
  smokingHabit: z.enum(["NEVER", "OCCASIONALLY", "REGULARLY"]).default("NEVER"),
  hobbies: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),

  // Partner Preferences
  preferredAgeMin: z.coerce.number().min(18).max(100).default(18),
  preferredAgeMax: z.coerce.number().min(18).max(100).default(60),
  preferredHeightMin: z.coerce.number().min(100).max(250).optional(),
  preferredHeightMax: z.coerce.number().min(100).max(250).optional(),
  preferredMaritalStatus: z.array(z.enum(["NEVER_MARRIED", "DIVORCED", "WIDOWED", "ANNULLED"])).default(["NEVER_MARRIED"]),
  preferredReligion: z.array(z.enum(["HINDU", "MUSLIM", "CHRISTIAN", "SIKH", "BUDDHIST", "JAIN", "JEWISH", "OTHER", "NONE"])).default([]),
  preferredCaste: z.string().optional(),
  preferredEducation: z.array(z.enum(["HIGH_SCHOOL", "DIPLOMA", "BACHELORS", "MASTERS", "PHD", "PROFESSIONAL", "OTHER"])).default([]),
  preferredOccupation: z.string().optional(),
  preferredLocation: z.string().optional(),
  preferredIncome: z.string().optional(),
  manglikPreference: z.boolean().default(false),

  // Privacy
  profileVisibility: z.boolean().default(true),
  showContactInfo: z.boolean().default(false),
  showLastLogin: z.boolean().default(true),
  allowMessages: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false)
});

export const searchSchema = z.object({
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  ageMin: z.coerce.number().min(18).max(100).optional(),
  ageMax: z.coerce.number().min(18).max(100).optional(),
  heightMin: z.coerce.number().min(100).max(250).optional(),
  heightMax: z.coerce.number().min(100).max(250).optional(),
  religion: z.array(z.enum(["HINDU", "MUSLIM", "CHRISTIAN", "SIKH", "BUDDHIST", "JAIN", "JEWISH", "OTHER", "NONE"])).optional(),
  caste: z.string().optional(),
  maritalStatus: z.array(z.enum(["NEVER_MARRIED", "DIVORCED", "WIDOWED", "ANNULLED"])).optional(),
  educationLevel: z.array(z.enum(["HIGH_SCHOOL", "DIPLOMA", "BACHELORS", "MASTERS", "PHD", "PROFESSIONAL", "OTHER"])).optional(),
  employmentType: z.array(z.enum(["EMPLOYED", "SELF_EMPLOYED", "BUSINESS_OWNER", "STUDENT", "UNEMPLOYED", "RETIRED"])).optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  diet: z.array(z.enum(["VEGETARIAN", "NON_VEGETARIAN", "VEGAN", "EGGETARIAN"])).optional(),
  drinkingHabit: z.array(z.enum(["NEVER", "OCCASIONALLY", "REGULARLY"])).optional(),
  smokingHabit: z.array(z.enum(["NEVER", "OCCASIONALLY", "REGULARLY"])).optional(),
  manglik: z.boolean().optional(),
  verifiedOnly: z.boolean().optional(),
  hasPhoto: z.boolean().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
  sortBy: z.enum(["newest", "oldest", "profileViews", "age"]).default("newest")
});

export const interestSchema = z.object({
  receiverId: z.string().cuid(),
  message: z.string().max(500).optional()
});

export const messageSchema = z.object({
  receiverId: z.string().cuid(),
  content: z.string().min(1).max(5000)
});

export const adminUserSchema = z.object({
  userId: z.string().cuid(),
  action: z.enum(["BAN", "UNBAN", "VERIFY", "UNVERIFY", "DELETE", "MAKE_ADMIN", "REMOVE_ADMIN"]),
  reason: z.string().optional()
});

export const pageContentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  isPublished: z.boolean().default(true)
});
