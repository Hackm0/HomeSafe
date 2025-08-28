# 🏠 HomeSafe
**Saving Lives, One Home at a Time**

[![DevPost](https://img.shields.io/badge/DevPost-HomeSafe-blue?style=for-the-badge)](https://devpost.com/software/homesafe-n08b2f)
[![McHacks 12](https://img.shields.io/badge/McHacks%2012-Submission-orange?style=for-the-badge)](https://devpost.com/software/homesafe-n08b2f)

HomeSafe is a web application designed for Montreal residents to identify and assess risks from hazardous materials in their homes, including **asbestos 🏭**, **lead ⚠️**, and **radon ☢️**. Using publicly available health data and machine learning, HomeSafe helps users make informed decisions about environmental risks in their living spaces.

## 🌟 Features

- **Interactive Risk Assessment**: Check your home for environmental hazards using postal code data
- **Real-Time Data Visualization**: Clear, intuitive presentation of risk levels with interactive maps
- **Multi-Hazard Detection**: Comprehensive analysis for asbestos, lead, and radon exposure
- **Machine Learning Predictions**: AI-powered risk assessment models
- **User-Friendly Interface**: Simple, accessible design for all users

## �️ Tech Stack

**Frontend:**
- React.js
- CSS3 / Tailwind CSS
- JavaScript (ES6+)
- Interactive Maps Integration

**Backend:**
- Python Flask Server
- Machine Learning Models (scikit-learn)
- Data Processing & Analysis

**Data Sources:**
- Public health datasets
- Montreal municipal data
- Environmental monitoring data

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hackm0/HomeSafe.git
   cd HomeSafe
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Set up Python Backend**
   ```bash
   cd src/flask-server
   pip install flask flask-cors pandas scikit-learn numpy
   ```

4. **Start the Development Servers**
   
   **Frontend (Terminal 1):**
   ```bash
   npm start
   ```
   
   **Backend (Terminal 2):**
   ```bash
   cd src/flask-server
   python server.py
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
HomeSafe/
├── public/                    # Static assets & images
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── Pictures/              # Team member photos
├── src/
│   ├── components/
│   │   └── InteractiveMap.js  # Interactive map component
│   ├── pages/                 # Application pages
│   │   ├── About.js
│   │   ├── Asbestos.js
│   │   ├── Contact.js
│   │   ├── Home.js
│   │   ├── Lead.js
│   │   ├── Radon.js
│   │   ├── about.css
│   │   └── Substance.css
│   ├── flask-server/          # Python backend
│   │   ├── server.py          # Flask server
│   │   └── methods/           # Risk assessment modules
│   │       ├── ageBatiment.py # Building age analysis
│   │       ├── modelPrediction.py # ML predictions
│   │       ├── plomb.py       # Lead risk assessment
│   │       ├── radonLevel.py  # Radon level analysis
│   │       ├── data/          # CSV datasets
│   │       └── model/         # Trained ML models (.pkl)
│   ├── App.js                 # Main React component
│   ├── App.css
│   ├── Navbar.js              # Navigation component
│   ├── Navbar.css
│   └── index.js               # React entry point
├── config-overrides.js        # Webpack configuration
├── tailwind.config.js         # Tailwind CSS config
├── webpack.config.js          # Additional Webpack config
└── package.json              # Frontend dependencies
```

## 🔬 How It Works

### � The Approach

HomeSafe combines multiple data sources and machine learning to provide comprehensive home safety assessments:

1. **Data Collection**: Gathering public data on asbestos, lead, and radon from Montreal health authorities
2. **Data Processing**: Cleaning and integrating datasets from multiple sources
3. **Machine Learning**: Training models to predict risk levels based on location and building characteristics
4. **Visualization**: Presenting results through interactive maps and clear risk indicators
5. **User Experience**: Providing actionable insights and safety recommendations

### 🏭 Risk Factors Analyzed

- **Asbestos**: Building age analysis and historical construction data
- **Lead**: Water system assessments and building infrastructure
- **Radon**: Geological and environmental factors

## ⚠️ Development Challenges

- **Data Integration**: Successfully merged datasets from different government sources with varying formats
- **User Accessibility**: Designed intuitive interfaces that make complex environmental data understandable
- **Performance Optimization**: Implemented efficient data processing to handle large datasets smoothly
- **Cross-Platform Compatibility**: Ensured consistent functionality across different devices and browsers

## 🎯 Future Roadmap

- [ ] **Expand Geographic Coverage**: Extend beyond Montreal to other Canadian cities
- [ ] **Additional Risk Factors**: Include mold, air quality, and other environmental hazards
- [ ] **Community Features**: User reporting and neighborhood safety tracking
- [ ] **Mobile Application**: Native iOS and Android apps
- [ ] **Professional Integration**: Tools for real estate professionals and inspectors

## 👥 Team

This project was created during **McHacks 12** by:

- **[MAt1l0rd Tardy](https://github.com/MAt1l0rd)** - Data collection, content creation, and frontend development
- **[Jason Xa](https://github.com/JasonXa)** - Frontend development, backend integration, Git management, and project submission
- **[Hackm0 Raouj](https://github.com/Hackm0)** - Interactive map integration and API development
- **[Olivier Hamel](https://github.com/olivier-hamel)** - Additional development support

## 🌟 What We Learned

Through building HomeSafe, our team gained valuable experience in:

- **Full-Stack Development**: Integrating React frontend with Python backend
- **Data Science**: Processing real-world datasets and building predictive models
- **User-Centered Design**: Creating accessible interfaces for complex data
- **Team Collaboration**: Managing a multi-developer project with Git workflows
- **Public Health Technology**: Understanding the intersection of technology and community safety

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **[DevPost Submission](https://devpost.com/software/homesafe-n08b2f)** - Complete project showcase
- **[Live Demo](#)** - Try HomeSafe online *(coming soon)*
- **[McHacks 12](https://mchacks.ca/)** - The hackathon where HomeSafe was born

---

<div align="center">
  <strong>Built with ❤️ for community safety</strong><br>
  <em>Making Montreal homes safer, one assessment at a time</em>
</div>
