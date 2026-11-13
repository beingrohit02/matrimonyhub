import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Heart, Shield, Search, Users, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Find Your <span className="text-primary">Perfect Match</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl md:text-2xl">
              Join thousands of verified members on India\'s most trusted matrimonial platform.
              Free to join, free to search, free to connect.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                <Link href="/register">Register Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                <Link href="/login">Login</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required · 100% free membership · Cancel anytime
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCard value="50,000+" label="Active Members" icon={Users} />
            <StatCard value="10,000+" label="Successful Matches" icon={Heart} />
            <StatCard value="99%" label="Profile Verification" icon={Shield} />
            <StatCard value="24/7" label="Support Available" icon={Star} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose MatrimonyHub?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for serious relationships with privacy and safety at the core.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={Shield}
              title="Verified Profiles"
              description="Photo verification and manual review ensure genuine profiles. Optional verification badge for added trust."
            />
            <FeatureCard
              icon={Search}
              title="Advanced Search"
              description="Filter by religion, caste, education, profession, location, lifestyle preferences and more."
            />
            <FeatureCard
              icon={Heart}
              title="Smart Matches"
              description="AI-powered recommendations based on your preferences, values, and compatibility factors."
            />
            <FeatureCard
              icon={Users}
              title="Family Involvement"
              description="Designed for family participation with guardian accounts and family profile views."
            />
            <FeatureCard
              icon={Star}
              title="Privacy First"
              description="Control who sees your contact info, photos, and profile. Block and report features included."
            />
            <FeatureCard
              icon={Check}
              title="Completely Free"
              description="No hidden charges, no premium tiers. All features free forever - register, search, connect."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Find Your Life Partner?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Join thousands of members who trust MatrimonyHub for their matrimonial search.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary" className="px-8 py-3 text-lg">
              <Link href="/register">Create Free Profile</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-4 text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
