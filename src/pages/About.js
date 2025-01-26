import React from "react"
import { Monitor, Heart, Sun, Users } from "react-feather"
import "./about.css"

const FlipCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Icon size={64} />
          <h3>{title}</h3>
        </div>
        <div className="flip-card-back">
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  const cards = [
    {
      icon: Monitor,
      title: "Technology Access",
      description: "We combine web scraping, AI models, and government data on lead detection to deliver precise results. Enter your address and view easy-to-understand graphs showcasing contamination risks",
    },
    {
      icon: Heart,
      title: "Health Care",
      description:
        "Exposure to substances like radon, asbestos, and lead can lead to serious health issues, including lung cancer and other respiratory diseases. When our analysis indicates potential danger, we connect users with government assistance programs and specialists for thorough assessments and remediation. For detailed information on health risks associated with these substances, please refer to our comprehensive guides.",
    },
    {
      icon: Sun,
      title: "Sustainability",
      description:
        "We assess risks quickly to help limit long-term contamination and promote sustainable living. By addressing harmful substances now, users can protect their health and create safer environments for future generations. Our platform encourages proactive action for a healthier tomorrow.",
    },
    {
      icon: Users,
      title: "Societal Good",
      description:
        "We empower communities by providing accessible tools to address environmental safety risks. Our platform connects users to specialists and government assistance, helping create healthier, safer living spaces. Together, we’re building a future where everyone can thrive in toxin-free homes.",
    },
  ]

  return (
    <div className="about-container">

      <div className="concept-text">
        <p>
          Your Trusted Guide to a Safer Home and Healthier Living
            Discover the risks, take action, and protect your home and loved ones. With easy-to-use tools and precise data, we’re here to help you create a secure and sustainable future.
        </p>
      </div>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <FlipCard key={index} {...card} />
        ))}
      </div>
    </div>
  )
}

export default About

