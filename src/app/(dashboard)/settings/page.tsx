"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Save, Camera, Bell, Shield, Palette, Key, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getInitials } from "@/lib/utils";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState("account");
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const notifications = {
    email: true,
    sms: false,
    push: true,
    interests: true,
    messages: true,
    matches: true,
    profileViews: false,
    newsletter: false,
  };

  const privacy = {
    profileVisibility: true,
    showContactInfo: false,
    showLastLogin: true,
    allowMessages: true,
    showOnlineStatus: true,
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await update({ name, email });
      toast({ title: "Success", description: "Profile updated successfully!" });
    } catch {
      toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 8) {
      toast({ title: "Error", description: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      if (!res.ok) throw new Error("Failed to change password");
      toast({ title: "Success", description: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast({ title: "Error", description: "Failed to change password", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    if (!confirm("This will permanently delete all your data. Type DELETE to confirm.")) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/auth/delete-account", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete account");
      toast({ title: "Account Deleted", description: "Your account has been permanently deleted" });
      window.location.href = "/";
    } catch {
      toast({ title: "Error", description: "Failed to delete account", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account, privacy, and notification preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your basic account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback className="text-2xl">{getInitials(session?.user?.name || "U")}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">
                    <Camera className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your password for security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </div>
              <Button onClick={handleChangePassword} disabled={isSaving} variant="outline">
                <Key className="mr-2 h-4 w-4" />
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Change Password"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Delete Account
              </CardTitle>
              <CardDescription>Permanently delete your account and all data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button onClick={handleDeleteAccount} variant="destructive" disabled={isSaving}>
                <Trash2 className="mr-2 h-4 w-4" />
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete Account"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Delivery Methods</h4>
                <div className="space-y-3">
                  {Object.entries({
                    email: "Email Notifications",
                    sms: "SMS Notifications",
                    push: "Push Notifications",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via {label.toLowerCase()}</p>
                      </div>
                      <Switch
                        checked={notifications[key as keyof typeof notifications]}
                        onCheckedChange={(checked) => console.log(key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-4">Activity Notifications</h4>
                <div className="space-y-3">
                  {Object.entries({
                    interests: "New Interest Received",
                    messages: "New Messages",
                    matches: "New Matches",
                    profileViews: "Profile Views",
                    newsletter: "Newsletter & Updates",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-muted-foreground">Get notified when {label.toLowerCase()}</p>
                      </div>
                      <Switch
                        checked={notifications[key as keyof typeof notifications]}
                        onCheckedChange={(checked) => console.log(key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={() => toast({ title: "Saved", description: "Notification preferences updated" })}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Control who can see your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries({
                profileVisibility: { label: "Profile Visibility", desc: "Allow your profile to be visible in search results" },
                showContactInfo: { label: "Show Contact Info", desc: "Display your contact information to matches" },
                showLastLogin: { label: "Show Last Login", desc: "Let others see when you were last active" },
                allowMessages: { label: "Allow Messages", desc: "Let members send you messages" },
                showOnlineStatus: { label: "Show Online Status", desc: "Display when you\'re online" },
              }).map(([key, { label, desc }]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <Switch
                    checked={privacy[key as keyof typeof privacy]}
                    onCheckedChange={(checked) => console.log(key, checked)}
                  />
                </div>
              ))}
              <Button onClick={() => toast({ title: "Saved", description: "Privacy settings updated" })}>
                <Save className="mr-2 h-4 w-4" />
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Data & Account Deletion
              </CardTitle>
              <CardDescription>Download your data or permanently delete your account</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button variant="outline">Download My Data</Button>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how MatrimonyHub looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme</Label>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  {["light", "dark", "system"].map((theme) => (
                    <button
                      key={theme}
                      className="p-4 border rounded-lg hover:bg-accent transition-colors text-left"
                    >
                      <p className="font-medium capitalize">{theme}</p>
                      <p className="text-sm text-muted-foreground">{theme === "system" ? "Matches your system setting" : `${theme} mode`}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Language</Label>
                <div className="mt-2">
                  <select className="w-full max-w-xs px-3 py-2 border rounded-md">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                    <option>Telugu</option>
                    <option>Bengali</option>
                    <option>Marathi</option>
                    <option>Gujarati</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
