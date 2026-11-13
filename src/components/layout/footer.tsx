import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12 px-4 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">MatrimonyHub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Find your perfect life partner. Trusted by thousands of families worldwide.
            </p>
          </div>
          <nav>
            <h4 className="font-medium">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/success-stories" className="text-muted-foreground hover:text-foreground">Success Stories</Link></li>
              <li><Link href="/safety" className="text-muted-foreground hover:text-foreground">Safety Tips</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </nav>
          <nav>
            <h4 className="font-medium">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/refund" className="text-muted-foreground hover:text-foreground">Refund Policy</Link></li>
            </ul>
          </nav>
          <nav>
            <h4 className="font-medium">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="/report" className="text-muted-foreground hover:text-foreground">Report Abuse</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} MatrimonyHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Facebook</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Instagram</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
