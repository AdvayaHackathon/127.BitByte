import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Escuta</h3>
            <p className="text-muted-foreground">
              AI-powered telemedicine and medicine recommendation platform. Making healthcare accessible to everyone,
              everywhere.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/telemedicine" className="text-muted-foreground hover:text-foreground transition-colors">
                  Telemedicine
                </Link>
              </li>
              <li>
                <Link href="/recommender" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Recommender
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  HIPAA Compliance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-muted-foreground">
                <Mail size={16} className="mr-2" />
                <span>contact@escuta.com</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start text-muted-foreground">
                <MapPin size={16} className="mr-2 mt-1" />
                <span>123 Healthcare Ave, Medical District, CA 90210</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Escuta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}