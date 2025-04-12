'use client';

import { useRef } from 'react';
// Dynamically import Spline so it's only rendered on the client-side
import Spline from '@splinetool/react-spline';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Video,
  Brain,
  Pill,
  Stethoscope,
  HeartPulse,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';






export default function Home() {
  const telemedicineSectionRef = useRef<HTMLDivElement>(null);

  const scrollToTelemedicine = () => {
    telemedicineSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 overflow-hidden">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0 filter brightness-300 drop-shadow-[0_0_40px_rgba(211,211,211,0.4)] transform "
        style={{ transform: "scale(1.4) translateY(55px)" }}>
          <Spline scene="https://prod.spline.design/e-2dVn0d4qM69ic2/scene.splinecode" />
        </div>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-purple-950/20 to-background z-10"></div>

        <div className="container relative z-20 flex flex-col items-center text-center max-w-4xl">
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

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="interactive-card blue-button-hover text-lg group"
              onClick={scrollToTelemedicine}
            >
              Get Started
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>
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
                title: 'Video Consultations',
                description: 'Face-to-face virtual appointments with licensed healthcare professionals.',
                icon: <Video className="h-10 w-10 text-blue-500" />,
                delay: 0.1,
              },
              {
                title: 'AI-Assisted Diagnosis',
                description:
                  'Our AI analyzes symptoms during consultations to assist doctors with accurate diagnoses.',
                icon: <Brain className="h-10 w-10 text-purple-400" />,
                delay: 0.2,
              },
              {
                title: 'Secure Platform',
                description: 'Your health data is protected with enterprise-grade security and encryption.',
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
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

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

      {/* AI Medicine Recommender Section */}
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
                title: 'Personalized Recommendations',
                description: 'Tailored to your unique health profile and medical history.',
                icon: <Pill className="h-10 w-10 text-blue-500" />,
                delay: 0.1,
              },
              {
                title: 'Doctor Verification',
                description: 'All AI recommendations are verified by licensed healthcare professionals.',
                icon: <Stethoscope className="h-10 w-10 text-purple-400" />,
                delay: 0.2,
              },
              {
                title: 'Health Monitoring',
                description: 'Track your health metrics and receive personalized insights.',
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
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

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

      <Footer />
    </main>
  );
}
