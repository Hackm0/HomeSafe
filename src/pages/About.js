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
      description:
        "Bridging the digital divide by making technology accessible to all communities through innovative solutions and education.",
    },
    {
      icon: Heart,
      title: "Health Care",
      description:
        "Improving healthcare accessibility and outcomes through digital transformation and patient-centered solutions.",
    },
    {
      icon: Sun,
      title: "Sustainability",
      description:
        "Promoting environmental consciousness through eco-friendly practices and sustainable technological solutions.",
    },
    {
      icon: Users,
      title: "Societal Good",
      description:
        "Creating positive social impact through community engagement and inclusive technological advancement.",
    },
  ]

  return (
    <div className="about-container">

      <div className="concept-text">
        <p>
          We are dedicated to creating innovative solutions that bridge technology and social impact, working towards a
          more inclusive and sustainable future for all.
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

