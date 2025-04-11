"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowRight, Video, Brain, Pill, Stethoscope, HeartPulse, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function Home() {
  const telemedicineSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)

  const scrollToTelemedicine = () => {
    telemedicineSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Remove "Learn more" button from the About section
  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-purple-950/20 to-background z-0"></div>

        <div className="container relative z-10 flex flex-col items-center text-center max-w-4xl"></div>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">Smarter Healthcare</span>
            <br />
            one click away
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Experience the future of healthcare with AI-powered diagnostics and virtual consultations.
          </motion.p>

          {/* Update the buttons in the hero section */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" className="interactive-card blue-button-hover text-lg group" onClick={scrollToTelemedicine}>
              Get Started
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>

        {/* Background effect */}
        <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none z-0 opacity-20">
          <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-4/5">
            <div className="w-full h-full bg-gradient-to-t from-blue-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Telemedicine Overview Section */}
      <section ref={telemedicineSectionRef} className="min-h-[90vh] py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Telemedicine Platform</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Connect with healthcare professionals from anywhere, anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Video Consultations",
                description: "Face-to-face virtual appointments with licensed healthcare professionals.",
                icon: <Video className="h-10 w-10 text-blue-500" />,
                delay: 0.1,
              },
              {
                title: "AI-Assisted Diagnosis",
                description: "Our AI analyzes symptoms during consultations to assist doctors with accurate diagnoses.",
                icon: <Brain className="h-10 w-10 text-purple-400" />,
                delay: 0.2,
              },
              {
                title: "Secure Platform",
                description: "Your health data is protected with enterprise-grade security and encryption.",
                icon: <Shield className="h-10 w-10 text-pink-400" />,
                delay: 0.3,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="interactive-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <Card className="h-full glass-card border-muted">
                  <CardHeader>
                    <div className="mb-4">{item.icon}</div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  {/* Remove the "Learn more" buttons from all cards in the Telemedicine section */}
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Update the Telemedicine dashboard button */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/telemedicine">
              <Button size="lg" className="interactive-card blue-button-hover">
                Open Telemedicine Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Medicine Recommender Overview Section */}
      <section className="min-h-[90vh] py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/10 to-background z-0"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">AI Medicine Recommender</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our advanced AI analyzes your symptoms to suggest appropriate medications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Recommendations",
                description: "Tailored to your unique health profile and medical history.",
                icon: <Pill className="h-10 w-10 text-blue-500" />,
                delay: 0.1,
              },
              {
                title: "Doctor Verification",
                description: "All AI recommendations are verified by licensed healthcare professionals.",
                icon: <Stethoscope className="h-10 w-10 text-purple-400" />,
                delay: 0.2,
              },
              {
                title: "Health Monitoring",
                description: "Track your health metrics and receive personalized insights.",
                icon: <HeartPulse className="h-10 w-10 text-pink-400" />,
                delay: 0.3,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="interactive-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <Card className="h-full glass-card border-muted">
                  <CardHeader>
                    <div className="mb-4">{item.icon}</div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  {/* Remove the "Learn more" buttons from all cards in the AI Recommender section */}
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Update the AI Recommender button */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/recommender">
              <Button size="lg" className="interactive-card blue-button-hover">
                Start Recommendation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} className="min-h-[80vh] py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">About Escuta</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Revolutionizing healthcare through AI and telemedicine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6">
                At Escuta, we believe healthcare should be accessible to everyone, everywhere. Our mission is to
                leverage cutting-edge AI technology to provide accurate, personalized healthcare solutions that bridge
                the gap between patients and healthcare providers.
              </p>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                We envision a world where quality healthcare is just a click away, where AI and human expertise work
                together to deliver the best possible care, and where everyone has the tools they need to take control
                of their health.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg p-1">
                <div className="w-full h-full bg-background/80 rounded-md flex items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75"></div>
                        <div className="relative bg-background rounded-full p-4">
                          <HeartPulse className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Founded in 2023</h4>
                      <p className="text-muted-foreground">
                        With a team of healthcare professionals, AI experts, and passionate innovators
                      </p>
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-center space-x-8">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-primary">10k+</p>
                          <p className="text-sm text-muted-foreground">Users</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-secondary">500+</p>
                          <p className="text-sm text-muted-foreground">Doctors</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-accent">98%</p>
                          <p className="text-sm text-muted-foreground">Satisfaction</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}