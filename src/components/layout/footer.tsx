import React from 'react'
import Link from 'next/link'
import { Crown, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Agarwal Sabha</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Preserving heritage, building community. Connecting Agarwal families worldwide through
              tradition and innovation.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/members"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Members Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/matrimonial"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Matrimonial
                </Link>
              </li>
              <li>
                <Link
                  href="/business-directory"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Business Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/hall-booking"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Hall Booking
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@agarwalsabha.com</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Community Hall, Bilaspur</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-center text-sm text-muted-foreground">
              © 2024 Agarwal Sabha Platform. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
