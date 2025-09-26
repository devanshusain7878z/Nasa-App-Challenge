# Asteroid Impact Simulation & Mitigation Tool

An interactive visualization and simulation platform that integrates real NASA and USGS data to model asteroid impact scenarios, predict consequences, and evaluate mitigation strategies. This tool enables scientists, policymakers, educators, and the public to understand and prepare for potential asteroid threats.

## 🌟 Features

### Core Functionality

- **Real-time NASA NEO Data Integration**: Live asteroid tracking and orbital data from NASA's Near-Earth Object API
- **USGS Environmental Data**: Integration with USGS datasets for seismic activity, topography, and tsunami zones
- **3D Orbital Visualization**: Interactive 3D models of asteroid trajectories and Earth's orbit
- **Impact Simulation**: Physics-based calculations for crater size, energy release, and environmental effects
- **Mitigation Strategies**: Simulation of deflection methods including kinetic impactors and gravity tractors

### Advanced Features

- **Interactive Dashboard**: Comprehensive control panel for scenario modeling
- **Impact Zone Mapping**: 2D and 3D visualization of potential impact areas
- **Tsunami Modeling**: Coastal impact analysis using USGS elevation data
- **Educational Tools**: Built-in explanations, tooltips, and infographics
- **Gamified Scenarios**: "Defend Earth" mode with time-pressured mitigation challenges
- **Storytelling Mode**: Interactive "Impactor-2025" scenario walkthrough

### Scientific Accuracy

- **Orbital Mechanics**: Keplerian orbital element calculations
- **Impact Physics**: Energy calculations using TNT equivalents
- **Crater Scaling**: Established scaling relationships for crater size estimation
- **Environmental Effects**: Secondary effects modeling (seismic, atmospheric, tsunami)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- NASA API Key (get one at [api.nasa.gov](https://api.nasa.gov))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd project1
   ```

2. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Create .env file in server directory
   cd ../server
   echo "NASA_API_KEY=your_api_key_here" > .env
   echo "PORT=7000" >> .env
   ```

4. **Start the application**

   ```bash
   # Terminal 1: Start backend server
   cd server
   npm start

   # Terminal 2: Start frontend development server
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:7000

## 🏗️ Architecture

### Backend (Express.js)

- **API Routes**: RESTful endpoints for asteroid data and simulations
- **NASA Integration**: Real-time NEO data fetching with caching
- **USGS Integration**: Environmental and geological data processing
- **Calculation Engine**: Physics-based impact and mitigation calculations

### Frontend (React + Vite)

- **3D Visualization**: Three.js for orbital mechanics and impact modeling
- **Interactive Maps**: React Leaflet for geographic impact visualization
- **Data Visualization**: Recharts for impact analysis and risk assessment
- **Modern UI**: Tailwind CSS with responsive design

### Key Components

- **Dashboard**: Main control interface
- **OrbitalView**: 3D asteroid trajectory visualization
- **ImpactMap**: Geographic impact zone mapping
- **MitigationPanel**: Deflection strategy simulation
- **EducationalOverlay**: Interactive learning features

## 📊 Data Sources

### NASA NEO API

- Asteroid orbital data and characteristics
- Close approach information
- Hazardous asteroid classifications
- Real-time tracking data

### USGS Data

- Seismic activity monitoring
- Topographic elevation data
- Tsunami zone mapping
- Geological impact assessments

## 🎮 Usage Scenarios

### For Scientists

- Advanced orbital mechanics modeling
- Detailed impact physics calculations
- Mitigation strategy analysis
- Data export and sharing capabilities

### For Educators

- Interactive learning modules
- Visual explanations of complex concepts
- Scenario-based problem solving
- Student engagement tools

### For Policymakers

- Risk assessment dashboards
- Mitigation strategy comparisons
- Public communication tools
- Decision support systems

### For the Public

- Educational asteroid information
- Interactive impact simulations
- Gamified learning experiences
- Social sharing capabilities

## 🔧 API Endpoints

### Asteroid Data

- `GET /api/asteroids` - Fetch asteroid list
- `GET /api/asteroids/:id` - Get specific asteroid details
- `POST /api/asteroids/simulate-impact` - Run impact simulation

### USGS Data

- `GET /api/usgs/seismic` - Recent earthquake data
- `GET /api/usgs/topography` - Elevation data
- `GET /api/usgs/tsunami-zones` - Tsunami risk areas

### Mitigation Strategies

- `POST /api/mitigation/kinetic-impactor` - Kinetic impactor simulation
- `POST /api/mitigation/gravity-tractor` - Gravity tractor simulation
- `POST /api/mitigation/laser-ablation` - Laser ablation simulation

## 🎯 Educational Features

### Interactive Learning

- **Tooltips**: Hover explanations for technical terms
- **Infographics**: Visual breakdowns of complex concepts
- **Progressive Disclosure**: Layered information for different expertise levels
- **Scenario Walkthroughs**: Step-by-step guided experiences

### Gamification

- **Defend Earth Mode**: Time-pressured mitigation challenges
- **Achievement System**: Unlock features through learning
- **Leaderboards**: Compare mitigation strategies
- **Social Sharing**: Share results and scenarios

## 🌍 Accessibility

- **Colorblind-Friendly Palettes**: Accessible color schemes
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Multilingual Support**: Internationalization ready
- **Mobile Optimization**: Responsive design for all devices

## 🔬 Scientific Methodology

### Orbital Mechanics

- Keplerian orbital element calculations
- N-body simulation approximations
- Gravitational perturbation modeling
- Close approach prediction algorithms

### Impact Physics

- Kinetic energy calculations (KE = ½mv²)
- TNT equivalent conversions
- Crater scaling relationships
- Seismic magnitude estimation

### Environmental Modeling

- Tsunami propagation algorithms
- Atmospheric entry effects
- Secondary impact calculations
- Regional risk assessment

## 🚀 Future Enhancements

- **Machine Learning**: Predictive impact modeling
- **Augmented Reality**: AR asteroid visualization
- **Real-time Updates**: Live data streaming
- **Advanced Physics**: N-body simulations
- **Collaborative Features**: Multi-user scenarios

## 📝 Contributing

We welcome contributions! Please see our contributing guidelines for:

- Code style and standards
- Testing requirements
- Documentation standards
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **NASA**: For providing comprehensive NEO data and APIs
- **USGS**: For environmental and geological datasets
- **Three.js Community**: For 3D visualization capabilities
- **React Community**: For modern web development tools

## 📞 Support

For questions, issues, or feature requests:

- Create an issue on GitHub
- Contact the development team
- Check the documentation wiki

---

**Transform raw data into powerful insights for global asteroid risk management!** 🌍☄️
