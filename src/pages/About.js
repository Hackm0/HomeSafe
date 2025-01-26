import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Home, AlertTriangle } from "react-feather";
import { ShieldCheck } from "lucide-react";
import "./About.css"

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-800">Radon Awareness</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <HeroSection />
        <InfoSection />
        <ActionSection />
      </main>

      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Radon Awareness Campaign. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-blue-900 mb-4">Understanding the Dangers of Radon</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Radon is a silent threat that could be lurking in your home. Learn about its risks and how to protect your
        family.
      </p>
    </motion.section>
  )
}

function InfoSection() {
  const infoCards = [
    {
      title: "What is Radon?",
      content:
        "Radon is a colorless, odorless, radioactive gas that comes from the natural decay of uranium in soil and rock.",
      icon: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Health Risks",
      content:
        "Long-term exposure to high levels of radon can lead to lung cancer, making it the second leading cause after smoking.",
      icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
    },
    {
      title: "Where It's Found",
      content:
        "Radon can accumulate in any building, but it's most commonly found in basements and ground floors of homes.",
      icon: <Home className="w-12 h-12 text-blue-500" />,
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-16"
    >
      <h3 className="text-2xl font-semibold text-blue-800 mb-8 text-center">Key Information</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {infoCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex justify-center mb-4">{card.icon}</div>
            <h4 className="text-xl font-semibold text-blue-900 mb-2">{card.title}</h4>
            <p className="text-gray-600">{card.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function ActionSection() {
  const steps = [
    "Test your home for radon levels using a professional service or a home test kit.",
    "If levels are high (4 pCi/L or above), consult with a radon mitigation specialist.",
    "Implement a radon reduction system, which typically involves sealing cracks and installing a vent pipe system.",
    "Improve ventilation in your home, especially in basements and crawl spaces.",
    "Regularly retest your home to ensure radon levels remain low.",
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-blue-100 p-8 rounded-lg shadow-inner"
    >
      <h3 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
        What to Do If You Suspect Radon in Your Home
      </h3>
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="flex items-start"
          >
            <ShieldCheck className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
            <span>{step}</span>
          </motion.li>
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <a
          href="#"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
        >
          Find a Radon Professional Near You
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </motion.div>
    </motion.section>
  )
}

export default About



