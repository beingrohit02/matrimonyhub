"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, X, Heart, MessageSquare, ChevronLeft, ChevronRight, MapPin, Briefcase, GraduationCap, Utensils, Wine, Cigarette } from "lucide-react";
import { getInitials, calculateAge } from "@/lib/utils";
import { searchSchema, type SearchForm } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const mockProfiles = [
  { id: "1", name: "Priya Sharma", age: 28, city: "Bangalore", state: "Karnataka", profession: "Software Engineer", company: "TCS", education: "MASTERS", religion: "HINDU", caste: "Brahmin", height: 165, diet: "VEGETARIAN", drinking: "NEVER", smoking: "NEVER", manglik: false, photo: null, compatibility: 92 },
  { id: "2", name: "Anjali Patel", age: 26, city: "Mumbai", state: "Maharashtra", profession: "Doctor", company: "Apollo Hospitals", education: "MASTERS", religion: "HINDU", caste: "Patel", height: 160, diet: "VEGETARIAN", drinking: "NEVER", smoking: "NEVER", manglik: true, photo: null, compatibility: 88 },
  { id: "3", name: "Neha Gupta", age: 29, city: "Delhi", state: "Delhi", profession: "Teacher", company: "DPS", education: "BACHELORS", religion: "HINDU", caste: "Gupta", height: 162, diet: "NON_VEGETARIAN", drinking: "OCCASIONALLY", smoking: "NEVER", manglik: false, photo: null, compatibility: 85 },
  { id: "4", name: "Rahul Kumar", age: 30, city: "Pune", state: "Maharashtra", profession: "Software Engineer", company: "Infosys", education: "BACHELORS", religion: "HINDU", caste: "Kumar", height: 175, diet: "NON_VEGETARIAN", drinking: "OCCASIONALLY", smoking: "NEVER", manglik: false, photo: null, compatibility: 90 },
  { id: "5", name: "Vikram Singh", age: 32, city: "Chennai", state: "Tamil Nadu", profession: "Business Owner", company: "Singh Enterprises", education: "MASTERS", religion: "SIKH", caste: "Singh", height: 178, diet: "VEGETARIAN", drinking: "NEVER", smoking: "NEVER", manglik: false, photo: null, compatibility: 78 },
  { id: "6", name: "Aisha Khan", age: 27, city: "Hyderabad", state: "Telangana", profession: "Architect", company: "Design Studio", education: "MASTERS", religion: "MUSLIM", caste: "Khan", height: 168, diet: "NON_VEGETARIAN", drinking: "NEVER", smoking: "NEVER", manglik: false, photo: null, compatibility: 82 },
];

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProfiles] = useState(mockProfiles);
  const profilesPerPage = 6;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      gender: undefined,
      ageMin: 18,
      ageMax: 60,
      religion: [],
      maritalStatus: ["NEVER_MARRIED"],
      educationLevel: [],
      employmentType: [],
      diet: [],
      drinkingHabit: [],
      smokingHabit: [],
      verifiedOnly: false,
      hasPhoto: false,
      page: 1,
      limit: 20,
      sortBy: "newest"
    }
  });

  const onSubmit = (data: SearchForm) => {
    console.log("Search filters:", data);
    setCurrentPage(1);
    toast({ title: "Search Applied", description: `Found ${filteredProfiles.length} matches` });
  };

  const clearFilters = () => {
    reset({
      gender: undefined,
      ageMin: 18,
      ageMax: 60,
      religion: [],
      maritalStatus: ["NEVER_MARRIED"],
      educationLevel: [],
      employmentType: [],
      diet: [],
      drinkingHabit: [],
      smokingHabit: [],
      verifiedOnly: false,
      hasPhoto: false,
      sortBy: "newest"
    });
  };

  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Search Profiles</h1>
          <p className="text-muted-foreground">Find your perfect match using advanced filters</p>
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Filters Sidebar/Drawer */}
      <Card className={showFilters ? "block" : "hidden"}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Advanced Filters</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select {...register("gender")}>
                  <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageMin">Min Age</Label>
                <Input id="ageMin" type="number" {...register("ageMin", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageMax">Max Age</Label>
                <Input id="ageMax" type="number" {...register("ageMax", { valueAsNumber: true })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Religion</Label>
              <div className="flex flex-wrap gap-2">
                {["HINDU", "MUSLIM", "CHRISTIAN", "SIKH", "BUDDHIST", "JAIN", "JEWISH", "OTHER", "NONE"].map((religion) => (
                  <label key={religion} className="inline-flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={watch("religion").includes(religion)}
                      onCheckedChange={(checked) => {
                        const current = watch("religion");
                        setValue("religion", checked ? [...current, religion] : current.filter((r) => r !== religion));
                      }}
                    />
                    {religion}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Marital Status</Label>
              <div className="flex flex-wrap gap-2">
                {["NEVER_MARRIED", "DIVORCED", "WIDOWED", "ANNULLED"].map((status) => (
                  <label key={status} className="inline-flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={watch("maritalStatus").includes(status)}
                      onCheckedChange={(checked) => {
                        const current = watch("maritalStatus");
                        setValue("maritalStatus", checked ? [...current, status] : current.filter((s) => s !== status));
                      }}
                    />
                    {status.replace("_", " ")}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Education Level</Label>
                <div className="flex flex-wrap gap-2">
                  {["HIGH_SCHOOL", "DIPLOMA", "BACHELORS", "MASTERS", "PHD", "PROFESSIONAL", "OTHER"].map((edu) => (
                    <label key={edu} className="inline-flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={watch("educationLevel").includes(edu)}
                        onCheckedChange={(checked) => {
                          const current = watch("educationLevel");
                          setValue("educationLevel", checked ? [...current, edu] : current.filter((e) => e !== edu));
                        }}
                      />
                      {edu.replace("_", " ")}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Employment Type</Label>
                <div className="flex flex-wrap gap-2">
                  {["EMPLOYED", "SELF_EMPLOYED", "BUSINESS_OWNER", "STUDENT", "UNEMPLOYED", "RETIRED"].map((type) => (
                    <label key={type} className="inline-flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={watch("employmentType").includes(type)}
                        onCheckedChange={(checked) => {
                          const current = watch("employmentType");
                          setValue("employmentType", checked ? [...current, type] : current.filter((t) => t !== type));
                        }}
                      />
                      {type.replace("_", " ")}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Diet</Label>
                <div className="flex flex-col gap-2">
                  {["VEGETARIAN", "NON_VEGETARIAN", "VEGAN", "EGGETARIAN"].map((diet) => (
                    <label key={diet} className="inline-flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={watch("diet").includes(diet)}
                        onCheckedChange={(checked) => {
                          const current = watch("diet");
                          setValue("diet", checked ? [...current, diet] : current.filter((d) => d !== diet));
                        }}
                      />
                      {diet.replace("_", " ")}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Drinking</Label>
                <div className="flex flex-col gap-2">
                  {["NEVER", "OCCASIONALLY", "REGULARLY"].map((drink) => (
                    <label key={drink} className="inline-flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={watch("drinkingHabit").includes(drink)}
                        onCheckedChange={(checked) => {
                          const current = watch("drinkingHabit");
                          setValue("drinkingHabit", checked ? [...current, drink] : current.filter((d) => d !== drink));
                        }}
                      />
                      {drink}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Smoking</Label>
                <div className="flex flex-col gap-2">
                  {["NEVER", "OCCASIONALLY", "REGULARLY"].map((smoke) => (
                    <label key={smoke} className="inline-flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={watch("smokingHabit").includes(smoke)}
                        onCheckedChange={(checked) => {
                          const current = watch("smokingHabit");
                          setValue("smokingHabit", checked ? [...current, smoke] : current.filter((s) => s !== smoke));
                        }}
                      />
                      {smoke}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <Checkbox checked={watch("verifiedOnly")} onCheckedChange={(e) => setValue("verifiedOnly", e.target.checked)} />
                Verified Only
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <Checkbox checked={watch("hasPhoto")} onCheckedChange={(e) => setValue("hasPhoto", e.target.checked)} />
                With Photos
              </label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Apply Filters</Button>
              <Button type="button" variant="outline" onClick={clearFilters}>Clear All</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedProfiles.length} of {filteredProfiles.length} profiles
          </p>
          <Select defaultValue="newest" onValueChange={(v) => setValue("sortBy", v as any)}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="profileViews">Most Viewed</SelectItem>
              <SelectItem value="age">Age: Youngest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProfiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative aspect-[4/3] bg-muted">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <Avatar className="w-full h-full">
                    <AvatarFallback className="text-3xl">{getInitials(profile.name)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="absolute top-2 right-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {profile.compatibility}% Match
                  </span>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{profile.name}, {profile.age}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {profile.city}, {profile.state}
                    </p>
                  </div>
                  {profile.manglik && (
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">Manglik</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {profile.profession}</span>
                  <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {profile.education}</span>
                  <span className="flex items-center gap-1"><Utensils className="h-3 w-3" /> {profile.diet.replace("_", " ")}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {profile.drinking !== "NEVER" && <span className="flex items-center gap-1 px-2 py-1 bg-muted rounded"><Wine className="h-3 w-3" /> {profile.drinking}</span>}
                  {profile.smoking !== "NEVER" && <span className="flex items-center gap-1 px-2 py-1 bg-muted rounded"><Cigarette className="h-3 w-3" /> {profile.smoking}</span>}
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Heart className="mr-1 h-3 w-3" /> Interest
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <MessageSquare className="mr-1 h-3 w-3" /> Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {filteredProfiles.length > profilesPerPage && (
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.ceil(filteredProfiles.length / profilesPerPage) }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredProfiles.length / profilesPerPage), p + 1))} disabled={currentPage === Math.ceil(filteredProfiles.length / profilesPerPage)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
