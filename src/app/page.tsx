import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Crown,
  Users,
  Calendar,
  Heart,
  Building,
  Image as ImageIcon,
  MapPin,
  Phone,
  Mail,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Award,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Agarwal Sabha</span>
            </Link>
          </div>

          <nav className="mx-6 hidden space-x-6 md:flex">
            <Link
              href="#about"
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="#events"
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              Events
            </Link>
            <Link
              href="#contact"
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Join Community</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 to-amber-50 px-4 py-20 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="container mx-auto text-center">
            <div className="mx-auto max-w-4xl">
              <Crown className="mx-auto mb-8 h-20 w-20 text-primary drop-shadow-lg" />
              <h1 className="mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-7xl">
                Welcome to <br className="hidden sm:block" />
                <span className="text-primary">Agarwal Sabha</span>
              </h1>
              <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                Connect, celebrate, and grow with thousands of Agarwal families worldwide. Your
                gateway to community, culture, and lifelong relationships.
              </p>

              <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="px-8 py-4 text-lg" asChild>
                  <Link href="/register">
                    Join Our Community
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg" asChild>
                  <Link href="#about">Learn More</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
                <div className="group text-center transition-transform duration-200 hover:scale-105">
                  <div className="mb-4 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                    <Users className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                    <div className="text-3xl font-bold text-foreground lg:text-4xl">10,000+</div>
                    <div className="text-sm font-medium text-muted-foreground">Active Members</div>
                  </div>
                </div>
                <div className="group text-center transition-transform duration-200 hover:scale-105">
                  <div className="mb-4 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                    <Calendar className="mx-auto mb-4 h-12 w-12 text-green-500" />
                    <div className="text-3xl font-bold text-foreground lg:text-4xl">500+</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Events Organized
                    </div>
                  </div>
                </div>
                <div className="group text-center transition-transform duration-200 hover:scale-105">
                  <div className="mb-4 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                    <Heart className="mx-auto mb-4 h-12 w-12 text-pink-500" />
                    <div className="text-3xl font-bold text-foreground lg:text-4xl">1,200+</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Successful Marriages
                    </div>
                  </div>
                </div>
                <div className="group text-center transition-transform duration-200 hover:scale-105">
                  <div className="mb-4 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                    <Building className="mx-auto mb-4 h-12 w-12 text-purple-500" />
                    <div className="text-3xl font-bold text-foreground lg:text-4xl">800+</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Businesses Listed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">About Agarwal Sabha</h2>
              <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                Preserving our heritage while building bridges to the future. The Agarwal Sabha has
                been the cornerstone of our community for generations.
              </p>
            </div>

            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="text-center transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Shield className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                  <CardTitle>Heritage & Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Rooted in the teachings of Maharaja Agrasen, we uphold the values of unity,
                    prosperity, and community welfare.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Globe className="mx-auto mb-4 h-12 w-12 text-green-500" />
                  <CardTitle>Global Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connecting Agarwal families across continents, fostering relationships that span
                    the globe while staying true to our roots.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Award className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Promoting excellence in business, education, and community service while
                    supporting each other's growth and success.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-muted/50 px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Services</h2>
              <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                Comprehensive platform designed to serve every aspect of our community life
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Users className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Members Directory</CardTitle>
                  <CardDescription>
                    Connect with fellow community members across the globe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Advanced search
                      filters
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Gotra-based
                      connections
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Location-based
                      networking
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Heart className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Matrimonial Services</CardTitle>
                  <CardDescription>Find life partners within our trusted community</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Verified profiles
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Advanced matching
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Privacy controls
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Building className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Business Directory</CardTitle>
                  <CardDescription>
                    Promote and discover businesses within our community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Business listings
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Networking
                      opportunities
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Community support
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Calendar className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Events & Gatherings</CardTitle>
                  <CardDescription>
                    Stay connected through community events and celebrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Cultural celebrations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Business conferences
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Social gatherings
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <ImageIcon className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Gallery & Media</CardTitle>
                  <CardDescription>Preserve and share our community memories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Event photo galleries
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Heritage preservation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Community achievements
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <Star className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Hall Booking</CardTitle>
                  <CardDescription>
                    Reserve community spaces for your special occasions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Online booking system
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Multiple venues
                      available
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Member discounts
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section id="events" className="px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Upcoming Events</h2>
              <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                Join us in celebrating our culture and strengthening our community bonds
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="h-48 bg-gradient-to-r from-orange-400 to-amber-400"></div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge>Cultural</Badge>
                    <span className="text-sm text-muted-foreground">Sep 15, 2024</span>
                  </div>
                  <CardTitle>Maharaja Agrasen Jayanti</CardTitle>
                  <CardDescription>
                    Annual celebration of our founder's birth anniversary with cultural programs and
                    community feast.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    Community Hall, Delhi
                  </div>
                  <Button className="w-full">Register Now</Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge>Festival</Badge>
                    <span className="text-sm text-muted-foreground">Oct 28, 2024</span>
                  </div>
                  <CardTitle>Diwali Celebration 2024</CardTitle>
                  <CardDescription>
                    Grand Diwali celebration with lights, cultural performances, and traditional
                    sweets.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    Grand Ballroom, Mumbai
                  </div>
                  <Button className="w-full">Register Now</Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge>Business</Badge>
                    <span className="text-sm text-muted-foreground">Nov 10, 2024</span>
                  </div>
                  <CardTitle>Business Networking Summit</CardTitle>
                  <CardDescription>
                    Connect with successful entrepreneurs and explore new business opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    Convention Center, Bangalore
                  </div>
                  <Button className="w-full">Register Now</Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/events">
                  View All Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary px-4 py-20 text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Join Our Community?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
              Become part of a thriving community that celebrates tradition while embracing
              progress. Your journey with the Agarwal Sabha starts here.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg" asChild>
                <Link href="/register">
                  Join Now - It's Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground px-8 py-4 text-lg text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <Crown className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Agarwal Sabha</span>
              </Link>
              <p className="max-w-xs text-sm text-muted-foreground">
                Preserving heritage, building community. Connecting Agarwal families worldwide
                through tradition and innovation.
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
    </div>
  )
}
