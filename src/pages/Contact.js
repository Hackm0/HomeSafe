import React from "react"

export default function Contact() {
  const teamMembers = [
    {
      name: "Olivier Hamel",
      description: "Computer engineering student at Polytechnique Montréal",
      image: "/Pictures/OlivierHamel.jpeg",
      linkedin: "https://www.linkedin.com/in/olivier-hamel/",
    },
    {
      name: "Jason Xa",
      description: "Software Engineering Student @ Polytechnique Montréal",
      image: "/Pictures/JasonXa.jpeg",
      linkedin: "https://www.linkedin.com/in/jasonxa",
    },
    {
      name: "Matéo Tardy",
      description: "First time Hackaton participant, student at Polytechnique Montréal",
      image: "/Pictures/MateoTardy.jpg",
      linkedin: "https://www.linkedin.com/in/matéo-tardy",
    },
    {
      name: "Hakeem Raouj",
      description: "First year software engineer student at Polytechnique Montréal.",
      image: "/Pictures/HakeemRaouj.png",
      linkedin: "https://www.linkedin.com/in/hakeem-raouj",
    },
  ]
return (
  <div className="min-h-screen bg-gray-50">
    {/* Header Section */}
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4">About Our Team</h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            We are a dedicated team of professionals committed to delivering exceptional solutions. Our diverse
            expertise and collaborative approach enable us to tackle complex challenges and create innovative
            solutions for our clients.
          </p>
        </div>
      </div>
    </div>
{/* Team Members Grid */}
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 ease-in-out"
          >
            <div className="p-6 flex flex-col sm:flex-row items-center">
              <div className="flex-shrink-0 mb-4 sm:mb-0">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
              </div>
              <div className="sm:ml-6 text-center sm:text-left">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="mt-2 text-gray-600">{member.description}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-3 text-green-600 hover:text-green-800"
                >
                  Connect on LinkedIn
                  <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
}