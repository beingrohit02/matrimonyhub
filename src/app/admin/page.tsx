"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, FileText, BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";

const stats = [
  { label: "Total Users", value: "12,345", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Active Today", value: "1,234", change: "+5%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Pending Reports", value: "23", change: "+3", icon: Shield, color: "text-orange-500", bg: "bg-orange-500/10" },
  { label: "New Matches", value: "456", change: "+8%", icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const recentUsers = [
  { id: "1", name: "Priya Sharma", email: "priya@example.com", role: "USER", status: "ACTIVE", joined: "2024-01-15", lastLogin: "2 hours ago" },
  { id: "2", name: "Rahul Kumar", email: "rahul@example.com", role: "USER", status: "ACTIVE", joined: "2024-01-14", lastLogin: "1 day ago" },
  { id: "3", name: "Anjali Patel", email: "anjali@example.com", role: "USER", status: "PENDING", joined: "2024-01-13", lastLogin: "Never" },
  { id: "4", name: "Vikram Singh", email: "vikram@example.com", role: "ADMIN", status: "ACTIVE", joined: "2024-01-10", lastLogin: "5 hours ago" },
  { id: "5", name: "Neha Gupta", email: "neha@example.com", role: "USER", status: "BANNED", joined: "2024-01-08", lastLogin: "1 week ago" },
];

const recentReports = [
  { id: "1", reporter: "User A", reported: "User B", reason: "Inappropriate content", status: "PENDING", created: "2024-01-15" },
  { id: "2", reporter: "User C", reported: "User D", reason: "Fake profile", status: "RESOLVED", created: "2024-01-14" },
  { id: "3", reporter: "User E", reported: "User F", reason: "Harassment", status: "PENDING", created: "2024-01-13" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform activity and moderation</p>
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
                  <p className="text-sm font-medium text-green-600">{stat.change}</p>
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
        {/* Recent Users */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent User Registrations</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <a href="/admin/users">View All</a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Joined</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Last Login</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={user.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"} className="px-2 py-1 text-xs rounded-full">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={
                            user.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                            user.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          } className="px-2 py-1 text-xs rounded-full">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{user.joined}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{user.lastLogin}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon"><CheckCircle className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pending Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Pending Reports
              </CardTitle>
              <Button asChild variant="ghost" size="sm">
                <a href="/admin/reports">View All</a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{report.reporter} reported {report.reported}</p>
                        <p className="text-sm text-muted-foreground">Reason: {report.reason}</p>
                        <p className="text-xs text-muted-foreground">Reported on {report.created}</p>
                      </div>
                      <span className={
                        report.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                      } className="px-2 py-1 text-xs rounded-full">
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start" variant="outline">
                <a href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </a>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <a href="/admin/reports">
                  <Shield className="mr-2 h-4 w-4" />
                  Review Reports
                </a>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <a href="/admin/content">
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Content
                </a>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <a href="/admin/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </a>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <a href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Site Settings
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" /> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>API</span>
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email Service</span>
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" /> Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Storage</span>
                <span className="flex items-center gap-2 text-yellow-600">
                  <Clock className="h-4 w-4" /> 78% used
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
