'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Brain,
  Video,
  Lock,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { TopRightShine } from '../ui/Shine';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
    >
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-0 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="relative">
            <Brain className="h-8 w-8 text-purple-500 animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-spin" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Elytra
          </span>
        </motion.div>
        <nav className="flex items-center space-x-6">
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              AI-Powered
            </span>
            <br />
            Student Counseling
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto"
          >
            Experience the future of student guidance with our intelligent AI
            counselor. Available 24/7, confidential, and tailored to your needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-lg group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Why Choose Elytra?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Video className="h-12 w-12 text-purple-500" />}
              title="Interactive Video Chat"
              description="Engage in face-to-face conversations with our AI counselor for a more personal experience."
            />
            <FeatureCard
              icon={<Brain className="h-12 w-12 text-purple-500" />}
              title="Advanced AI Technology"
              description="Powered by cutting-edge AI to provide accurate, contextual, and helpful guidance."
            />
            <FeatureCard
              icon={<Lock className="h-12 w-12 text-purple-500" />}
              title="Complete Privacy"
              description="Your conversations are encrypted and secure, ensuring complete confidentiality."
            />
            <FeatureCard
              icon={<MessageCircle className="h-12 w-12 text-purple-500" />}
              title="24/7 Availability"
              description="Get instant support whenever you need it, day or night."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Journey?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Join thousands of students who have found their path with
              AI-powered counseling.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="md:w-64 bg-gray-800/50 text-white border-purple-500 focus:border-purple-600"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full">
                Get Started Free
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 Elytra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
