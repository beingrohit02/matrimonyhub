"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Search, Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { getInitials, formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    { label: "Profile Views", value: "24", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Interests Received", value: "5", icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
    { label: "Interests Sent", value: "12", icon: Search, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Messages", value: "8", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const recentActivity = [
    { type: "interest_received", name: "Priya Sharma", time: "2 hours ago", icon: Heart, color: "text-pink-500" },
    { type: "message", name: "Rahul Kumar", time: "5 hours ago", icon: MessageSquare, color: "text-purple-500" },
    { type: "interest_sent", name: "Anjali Patel", time: "1 day ago", icon: Search, color: "text-green-500" },
    { type: "profile_view", name: "Vikram Singh", time: "2 days ago", icon: Users, color: "text-blue-500" },
  ];

  const recommendedMatches = [
    { id: "1", name: "Priya Sharma", age: 28, city: "Bangalore", profession: "Software Engineer", religion: "Hindu", photo: null, compatibility: 92 },
    { id: "2", name: "Anjali Patel", age: 26, city: "Mumbai", profession: "Doctor", religion: "Hindu", photo: null, compatibility: 88 },
    { id: "3", name: "Neha Gupta", age: 29, city: "Delhi", profession: "Teacher", religion: "Hindu", photo: null, compatibility: 85 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {session?.user?.name?.split(" ")[0] || "User"}!</h1>
          <p className="text-muted-foreground">Here\'s what\'s happening with your profile today.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/profile">Edit Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/search">Find Matches</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={stat.bg + " p-3 rounded-full"}>
                  <stat.icon className={stat.color + " h-6 w-6"} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Completion & Recommended Matches */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Profile Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Basic Information</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Partner Preferences</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Photos</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/profile">Complete Your Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Matches */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recommended for You</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/search">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {recommendedMatches.map((match) => (
                  <Link
                    key={match.id}
                    href={`/dashboard/profile/${match.id}`}
                    className="flex gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={match.photo || ""} alt={match.name} />
                      <AvatarFallback className="text-xl">{getInitials(match.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium truncate">{match.name}, {match.age}</h4>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          {match.compatibility}% Match
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{match.profession} • {match.city}</p>
                      <p className="text-xs text-muted-foreground">{match.religion}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recent Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={activity.color + " p-2 rounded-full"}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.type === "interest_received" && "sent you an interest"}
                        {activity.type === "message" && "sent you a message"}
                        {activity.type === "interest_sent" && "accepted your interest"}
                        {activity.type === "profile_view" && "viewed your profile"}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="/dashboard/matches">View All Activity</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/search">
                    <Search className="mr-2 h-4 w-4" />
                    Search Profiles
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/matches">
                    <Heart className="mr-2 h-4 w-4" />
                    View Interests
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Check Messages
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/profile">
                    <Users className="mr-2 h-4 w-4" />
                    Update Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
