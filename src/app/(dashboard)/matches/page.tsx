"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, X, Check, Clock, User, ArrowRight } from "lucide-react";
import { getInitials } from "@/lib/utils";

const mockReceivedInterests = [
  { id: "1", name: "Priya Sharma", age: 28, city: "Bangalore", profession: "Software Engineer", photo: null, message: "Hi, I liked your profile!", time: "2 hours ago" },
  { id: "2", name: "Anjali Patel", age: 26, city: "Mumbai", profession: "Doctor", photo: null, time: "1 day ago" },
  { id: "3", name: "Neha Gupta", age: 29, city: "Delhi", profession: "Teacher", photo: null, time: "3 days ago" },
];

const mockSentInterests = [
  { id: "4", name: "Rahul Kumar", age: 30, city: "Pune", profession: "Software Engineer", photo: null, status: "PENDING", time: "5 hours ago" },
  { id: "5", name: "Vikram Singh", age: 32, city: "Chennai", profession: "Business Owner", photo: null, status: "ACCEPTED", time: "2 days ago" },
  { id: "6", name: "Aisha Khan", age: 27, city: "Hyderabad", profession: "Architect", photo: null, status: "DECLINED", time: "1 week ago" },
];

const mockMatches = [
  { id: "7", name: "Priya Sharma", age: 28, city: "Bangalore", profession: "Software Engineer", photo: null, matchedAt: "2024-01-15" },
  { id: "8", name: "Vikram Singh", age: 32, city: "Chennai", profession: "Business Owner", photo: null, matchedAt: "2024-01-10" },
];

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState("received");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Matches & Interests</h1>
        <p className="text-muted-foreground">Manage your connections and find your perfect match</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="received">Received ({mockReceivedInterests.length})</TabsTrigger>
          <TabsTrigger value="sent">Sent ({mockSentInterests.length})</TabsTrigger>
          <TabsTrigger value="matches">Matches ({mockMatches.length})</TabsTrigger>
        </TabsList>

        {/* Received Interests */}
        <TabsContent value="received" className="space-y-4 pt-4">
          {mockReceivedInterests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No interests received yet</h3>
                <p className="text-muted-foreground">Complete your profile to start receiving interests</p>
                <Button asChild className="mt-4">
                  <a href="/dashboard/profile">Complete Profile</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockReceivedInterests.map((interest) => (
                <Card key={interest.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={interest.photo || ""} alt={interest.name} />
                        <AvatarFallback className="text-xl">{getInitials(interest.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{interest.name}, {interest.age}</h4>
                            <p className="text-sm text-muted-foreground">{interest.profession} • {interest.city}</p>
                          </div>
                          <Badge variant="secondary">New</Badge>
                        </div>
                        {interest.message && (
                          <p className="mt-2 text-sm italic text-muted-foreground">"{interest.message}"</p>
                        )}
                        <p className="mt-2 text-xs text-muted-foreground">{interest.time}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">
                          <Check className="mr-1 h-3 w-3" /> Accept
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="mr-1 h-3 w-3" /> Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Sent Interests */}
        <TabsContent value="sent" className="space-y-4 pt-4">
          {mockSentInterests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No interests sent yet</h3>
                <p className="text-muted-foreground">Start connecting with profiles you like</p>
                <Button asChild className="mt-4">
                  <a href="/dashboard/search">Search Profiles</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockSentInterests.map((interest) => (
                <Card key={interest.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={interest.photo || ""} alt={interest.name} />
                        <AvatarFallback className="text-xl">{getInitials(interest.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{interest.name}, {interest.age}</h4>
                            <p className="text-sm text-muted-foreground">{interest.profession} • {interest.city}</p>
                          </div>
                          <Badge
                            variant={
                              interest.status === "ACCEPTED" ? "default" :
                              interest.status === "DECLINED" ? "destructive" : "secondary"
                            }
                          >
                            {interest.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{interest.time}</p>
                      </div>
                      {interest.status === "PENDING" && (
                        <Button size="sm" variant="ghost">Cancel</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Matches */}
        <TabsContent value="matches" className="space-y-4 pt-4">
          {mockMatches.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No matches yet</h3>
                <p className="text-muted-foreground">When someone accepts your interest, you\'ll become a match</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {mockMatches.map((match) => (
                <Card key={match.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={match.photo || ""} alt={match.name} />
                        <AvatarFallback className="text-xl">{getInitials(match.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{match.name}, {match.age}</h4>
                        <p className="text-sm text-muted-foreground">{match.profession} • {match.city}</p>
                        <p className="mt-2 text-xs text-muted-foreground">Matched on {match.matchedAt}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" asChild>
                          <a href={`/dashboard/messages/${match.id}`}>
                            <MessageSquare className="mr-1 h-3 w-3" /> Chat
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`/dashboard/profile/${match.id}`}>
                            <User className="mr-1 h-3 w-3" /> View Profile
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
