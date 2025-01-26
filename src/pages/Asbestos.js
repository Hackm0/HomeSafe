import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Home, AlertTriangle } from "react-feather";
import { ShieldCheck } from "lucide-react";
import "./Substance.css"

function Asbestos() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-800">Asbestos Awareness</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <HeroSection />
        <InfoSection />
        <ActionSection />
      </main>

      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; McHacks</p>
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
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Understanding the Dangers of Asbestos</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
      Asbestos is a silent threat that could be lurking in your home. Learn about its risks and how to protect your
        family.
      </p>
    </motion.section>
  )
}

function InfoSection() {
  const infoCards = [
    {
      title: "What is Asbestos?",
      content:
        "Asbestos is a hazardous material commonly found in older homes, posing serious health risks to occupants. In Montreal, as in many parts of the world, asbestos exposure in residential settings remains a pressing concern. This article explores the dangers of asbestos in homes and highlights how our app can assist in mitigating these risks.",
      icon: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Health Risks",
      content:
        "Asbestos is a known carcinogen linked to severe health conditions, including mesothelioma, lung cancer, and asbestosis. According to the Canadian Cancer Society, asbestos-related diseases claim over 2,000 lives annually in Canada. Prolonged exposure to asbestos fibers, which can become airborne when disturbed, significantly increases health risks. Given the long latency period of these diseases, early detection and prevention are critical",
      icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
    },
    {
      title: "Where It's Found",
      content:
        "Asbestos was widely used in construction materials throughout the 20th century due to its fire resistance, durability, and insulating properties. It was commonly found in insulation, roofing materials, floor tiles, and pipe coatings. Although its use has been banned in Canada since 2018, many older homes in Montreal still contain asbestos, posing risks during renovations or repairs.",
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
    "Test your home for asbestos using a licensed professional inspector who can safely take samples.",
    "If asbestos is confirmed, consult a certified asbestos abatement specialist to determine if removal or encapsulation is necessary.",
    "Avoid disturbing any materials that may contain asbestos, such as insulation, ceiling tiles, or flooring, until professional advice is obtained.",
    "If removal is required, hire a licensed asbestos removal contractor to safely handle and dispose of the material.",
    "Regularly monitor the condition of asbestos-containing materials that are left intact to ensure they remain undisturbed and safe.",
    ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-blue-100 p-8 rounded-lg shadow-inner"
    >
      <h3 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
        What to Do If You Suspect Asbestos in Your Home
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
          href="https://www.google.com/search?sca_esv=3772a98a9e51c46e&tbm=lcl&sxsrf=AHTn8zoZVw0m5TrhYZNg3w1QGI_PzwgWeA:1737890227992&q=asbestos+testers+near+me&rflfq=1&num=10&sa=X&ved=2ahUKEwjKw8rNoZOLAxW0lIkEHcyaB1EQjGp6BAg4EAE&biw=1920&bih=877&dpr=1#rlfi=hd:;si:;mv:[[47.4689453578819,-61.97777381800917],[41.723525247035326,-77.74018773517152]]"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
        >
          Find a Asbestos Professional Near You
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </motion.div>
    </motion.section>
  )
}

export default Asbestos



