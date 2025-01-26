import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Home, AlertTriangle } from "react-feather";
import { ShieldCheck } from "lucide-react";
import "./Substance.css"

function Lead() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-800">Lead Awareness</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <HeroSection />
        <InfoSection />
        <ActionSection />
      </main>

      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>McHacks</p>
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
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Understanding the Dangers of Lead</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Lead is a silent threat that could be lurking in your home. Learn about its risks and how to protect your
        family.
      </p>
    </motion.section>
  )
}

function InfoSection() {
  const infoCards = [
    {
      title: "What is Lead?",
      content:
        "Lead is a dense, soft, malleable metal with the chemical symbol Pb and atomic number 82. It is known for its high corrosion resistance, low melting point, and excellent shielding properties against radiation, making it commonly used in batteries, construction materials, and protective coatings. However, lead is toxic and poses significant health and environmental risks when improperly handled.",
      icon: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Health Risks",
      content:
        "Lead is a toxic metal that can cause severe health problems, especially in children and pregnant women. Even at low levels, lead exposure can result in developmental delays, learning difficulties, and behavioral problems in children. In adults, prolonged exposure can lead to high blood pressure, kidney damage, and neurological issues. According to Health Canada, an estimated 25% of elevated blood lead levels in Canadians are linked to contaminated drinking water, highlighting the importance of addressing this issue. Cities like Montreal provide access to free lead detection in the pipes close to their houses, giving residents a crucial tool to mitigate risks and ensure safer water for their families.",
      icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
    },
    {
      title: "Where It's Found",
      content:
        "Lead contamination typically originates from older plumbing systems, including lead pipes, solder joints, and fixtures. Homes built before the 1980s are more likely to have lead components in their water supply infrastructure. As these materials corrode over time, lead can leach into the water, particularly when the water is acidic or has been sitting in pipes for extended periods. Despite modern regulations banning the use of lead in plumbing, many older systems in Montreal continue to pose risks.",
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
    "Test your home's water for lead using a certified laboratory or a home test kit approved by your local health department.",  
    "If lead is detected, consult with a water treatment specialist to identify the source and determine the best solution.",  
    "Avoid using hot tap water for drinking, cooking, or mixing baby formula, as hot water can contain higher lead levels.",  
    "Install a certified water filter designed to remove lead, or consider replacing lead-containing pipes and fixtures.",  
    "Regularly retest your water to ensure lead levels remain safe and within acceptable limits."  
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-blue-100 p-8 rounded-lg shadow-inner"
    >
      <h3 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
        What to Do If You Suspect Lead in Your Home
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
          href="https://www.canada.ca/en/health-canada/services/environmental-workplace-health/environmental-contaminants/lead/lead-information-package-some-commonly-asked-questions-about-lead-human-health.html#a18"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
        >
          Find a Lead Professional Near You
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </motion.div>
    </motion.section>
  )
}

export default Lead



