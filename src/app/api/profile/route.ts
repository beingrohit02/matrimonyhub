import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { photos: true }
    });

    if (!profile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = profileSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validated.data;

    // Convert arrays to JSON for Prisma
    const profileData = {
      ...data,
      hobbies: data.hobbies || [],
      interests: data.interests || [],
      preferredMaritalStatus: data.preferredMaritalStatus || [],
      preferredReligion: data.preferredReligion || [],
      preferredEducation: data.preferredEducation || [],
    };

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: profileData,
      create: {
        userId: session.user.id,
        ...profileData,
      },
    });

    return NextResponse.json({ profile, message: "Profile saved successfully" });
  } catch (error) {
    console.error("Save profile error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
