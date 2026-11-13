"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, Camera, AlertCircle } from "lucide-react";
import { profileSchema, type ProfileForm } from "@/lib/validations";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: session?.user?.name?.split(" ")[0] || "",
      lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
      gender: "MALE",
      religion: "HINDU",
      maritalStatus: "NEVER_MARRIED",
      drinkingHabit: "NEVER",
      smokingHabit: "NEVER",
      preferredAgeMin: 18,
      preferredAgeMax: 60,
      preferredMaritalStatus: ["NEVER_MARRIED"],
      preferredReligion: [],
      preferredEducation: [],
      hobbies: [],
      interests: [],
      profileVisibility: true,
      showContactInfo: false,
      showLastLogin: true,
      allowMessages: true,
      emailNotifications: true,
      smsNotifications: false
    }
  });

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Failed to save profile");

      toast({ title: "Success", description: "Profile saved successfully!" });
      router.refresh();
    } catch {
      toast({ title: "Error", description: "Failed to save profile", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your profile information and preferences</p>
        </div>
        <Button type="submit" form="profile-form" disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
        </Button>
      </div>

      <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="education">Education & Career</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="preferences">Partner Preferences</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select {...register("gender")}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status *</Label>
                <Select {...register("maritalStatus")}>
                  <SelectTrigger><SelectValue placeholder="Select marital status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEVER_MARRIED">Never Married</SelectItem>
                    <SelectItem value="DIVORCED">Divorced</SelectItem>
                    <SelectItem value="WIDOWED">Widowed</SelectItem>
                    <SelectItem value="ANNULLED">Annulled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="religion">Religion *</Label>
                <Select {...register("religion")}>
                  <SelectTrigger><SelectValue placeholder="Select religion" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HINDU">Hindu</SelectItem>
                    <SelectItem value="MUSLIM">Muslim</SelectItem>
                    <SelectItem value="CHRISTIAN">Christian</SelectItem>
                    <SelectItem value="SIKH">Sikh</SelectItem>
                    <SelectItem value="BUDDHIST">Buddhist</SelectItem>
                    <SelectItem value="JAIN">Jain</SelectItem>
                    <SelectItem value="JEWISH">Jewish</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                    <SelectItem value="NONE">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" {...register("height", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" {...register("weight", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input id="bloodGroup" {...register("bloodGroup")} placeholder="O+, A-, etc." />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" {...register("country")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" {...register("state")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" {...register("pincode")} />
              </div>
            </div>
          </TabsContent>

          {/* Education & Career Tab */}
          <TabsContent value="education" className="space-y-6 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="educationLevel">Education Level</Label>
                <Select {...register("educationLevel")}>
                  <SelectTrigger><SelectValue placeholder="Select education" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                    <SelectItem value="DIPLOMA">Diploma</SelectItem>
                    <SelectItem value="BACHELORS">Bachelor's Degree</SelectItem>
                    <SelectItem value="MASTERS">Master's Degree</SelectItem>
                    <SelectItem value="PHD">PhD</SelectItem>
                    <SelectItem value="PROFESSIONAL">Professional Degree</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="educationField">Field of Study</Label>
                <Input id="educationField" {...register("educationField")} placeholder="Computer Science, Medicine, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collegeName">College/University</Label>
                <Input id="collegeName" {...register("collegeName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select {...register("employmentType")}>
                  <SelectTrigger><SelectValue placeholder="Select employment type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EMPLOYED">Employed</SelectItem>
                    <SelectItem value="SELF_EMPLOYED">Self Employed</SelectItem>
                    <SelectItem value="BUSINESS_OWNER">Business Owner</SelectItem>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="UNEMPLOYED">Unemployed</SelectItem>
                    <SelectItem value="RETIRED">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input id="occupation" {...register("occupation")} placeholder="Software Engineer, Doctor, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" {...register("companyName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income</Label>
                <Input id="annualIncome" {...register("annualIncome")} placeholder="e.g., 15-20 LPA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workLocation">Work Location</Label>
                <Input id="workLocation" {...register("workLocation")} />
              </div>
            </div>
          </TabsContent>

          {/* Lifestyle Tab */}
          <TabsContent value="lifestyle" className="space-y-6 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="diet">Diet</Label>
                <Select {...register("diet")}>
                  <SelectTrigger><SelectValue placeholder="Select diet" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VEGETARIAN">Vegetarian</SelectItem>
                    <SelectItem value="NON_VEGETARIAN">Non-Vegetarian</SelectItem>
                    <SelectItem value="VEGAN">Vegan</SelectItem>
                    <SelectItem value="EGGETARIAN">Eggetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="drinkingHabit">Drinking Habit</Label>
                <Select {...register("drinkingHabit")}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEVER">Never</SelectItem>
                    <SelectItem value="OCCASIONALLY">Occasionally</SelectItem>
                    <SelectItem value="REGULARLY">Regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smokingHabit">Smoking Habit</Label>
                <Select {...register("smokingHabit")}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEVER">Never</SelectItem>
                    <SelectItem value="OCCASIONALLY">Occasionally</SelectItem>
                    <SelectItem value="REGULARLY">Regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Hobbies & Interests</Label>
              <div className="flex flex-wrap gap-2">
                {["Reading", "Traveling", "Cooking", "Music", "Movies", "Sports", "Yoga", "Dancing", "Photography", "Gardening"].map((hobby) => (
                  <label key={hobby} className="inline-flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={watch("hobbies").includes(hobby)}
                      onCheckedChange={(checked) => {
                        const current = watch("hobbies");
                        setValue("hobbies", checked ? [...current, hobby] : current.filter((h) => h !== hobby));
                      }}
                    />
                    {hobby}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Additional Interests</Label>
              <div className="flex flex-wrap gap-2">
                {["Technology", "Art", "Literature", "History", "Science", "Spirituality", "Fashion", "Food", "Nature", "Adventure"].map((interest) => (
                  <label key={interest} className="inline-flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={watch("interests").includes(interest)}
                      onCheckedChange={(checked) => {
                        const current = watch("interests");
                        setValue("interests", checked ? [...current, interest] : current.filter((i) => i !== interest));
                      }}
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Partner Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="preferredAgeMin">Preferred Age Min</Label>
                <Input id="preferredAgeMin" type="number" {...register("preferredAgeMin", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredAgeMax">Preferred Age Max</Label>
                <Input id="preferredAgeMax" type="number" {...register("preferredAgeMax", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredHeightMin">Preferred Height Min (cm)</Label>
                <Input id="preferredHeightMin" type="number" {...register("preferredHeightMin", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredHeightMax">Preferred Height Max (cm)</Label>
                <Input id="preferredHeightMax" type="number" {...register("preferredHeightMax", { valueAsNumber: true })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Marital Status</Label>
              <div className="flex flex-wrap gap-2">
                {["NEVER_MARRIED", "DIVORCED", "WIDOWED", "ANNULLED"].map((status) => (
                  <label key={status} className="inline-flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={watch("preferredMaritalStatus").includes(status)}
                      onCheckedChange={(checked) => {
                        const current = watch("preferredMaritalStatus");
                        setValue("preferredMaritalStatus", checked ? [...current, status] : current.filter((s) => s !== status));
                      }}
                    />
                    {status.replace("_", " ")}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Religion</Label>
              <div className="flex flex-wrap gap-2">
                {["HINDU", "MUSLIM", "CHRISTIAN", "SIKH", "BUDDHIST", "JAIN", "JEWISH", "OTHER", "NONE"].map((religion) => (
                  <label key={religion} className="inline-flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={watch("preferredReligion").includes(religion)}
                      onCheckedChange={(checked) => {
                        const current = watch("preferredReligion");
                        setValue("preferredReligion", checked ? [...current, religion] : current.filter((r) => r !== religion));
                      }}
                    />
                    {religion}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Education</Label>
              <div className="flex flex-wrap gap-2">
                {["HIGH_SCHOOL", "DIPLOMA", "BACHELORS", "MASTERS", "PHD", "PROFESSIONAL", "OTHER"].map((edu) => (
                  <label key={edu} className="inline-flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={watch("preferredEducation").includes(edu)}
                      onCheckedChange={(checked) => {
                        const current = watch("preferredEducation");
                        setValue("preferredEducation", checked ? [...current, edu] : current.filter((e) => e !== edu));
                      }}
                    />
                    {edu.replace("_", " ")}
                  </label>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
