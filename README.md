# SafeDeck – AI-Powered Pitch Deck Auditor for VCs

![SafeDeck Header](public/layers-favicon.svg)

**SafeDeck** is a high-conversion, premium frontend landing page designed for an automated venture capital deal-flow platform. SafeDeck uses advanced CrewAI agents to read incoming pitch decks from Gmail, extract critical data points perfectly into spreadsheets, and flag high-risk items so you can invest faster and smarter.

## 🚀 Features & Aesthetics

This landing page emphasizes a **Deep Space FinTech** aesthetic, complete with dynamic lighting, glowing panels, and micro-interactive elements to build trust and invoke a "WOW" factor.

- **Dynamic 3D Interactions**: Uses `framer-motion` for smooth hover states, perspective tilting, and scroll-reveal animations across featured cards and the hero section.
- **Glassmorphism Design**: Frosted glass panels seamlessly blending into an ambient neon-gradient background for a modern, high-tech vibe.
- **Workflow Visualization**: Custom grid components illustrating the full pipeline—from Gmail Interception, Drive Sync, to CrewAI Processing and Google Sheets CRM updates.
- **Responsive Layout**: Fluid design built with CSS grids and flexbox, ensuring a flawless experience from mobile to ultra-wide desktop monitors.
- **Micro-Animations**: Custom CSS keyframes for floating elements and pulsing, glowing buttons that draw user attention to main Call-to-Actions.

## 🛠️ Technology Stack

- **Core Framework**: React 18, bootstrapped with Vite for extreme performance and instantaneous Hot Module Replacement (HMR).
- **Animations**: `framer-motion` for complex orchestration and physics-based interactions.
- **Icons**: `lucide-react` for beautifully consistent and highly legible vector icons.
- **Styling**: Vanilla CSS utilizing native CSS variables for maximum performance without bloated utility libraries.

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pitchsafe-landing-page.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd "Pitchsafe Landing Page"
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Open [http://localhost:5173](http://localhost:5173) to view the application.

## 📁 Project Structure

```text
├── public/                 # Static assets (favicons, SVGs)
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx      # Navigation header with scroll states
│   │   ├── Hero.jsx        # High-impact Hero section with glowing CTAs
│   │   ├── FeatureCards.jsx# 3D interactive feature highlights
│   │   ├── ProblemSolution.jsx # Visual breakdown of the AI automation pipeline
│   │   ├── CallToAction.jsx# Final conversion section
│   │   └── Footer.jsx      # Semantic site footer
│   ├── App.jsx             # Main application layout orchestrator
│   ├── index.css           # Global design tokens and complex CSS animations
│   └── main.jsx            # React root injection
├── index.html              # Entry HTML file
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 🤝 Customization
To customize the brand colors, navigate to `src/index.css` and configure the CSS properties under `:root`:
```css
:root {
  --bg-primary: #080a0e;
  --bg-secondary: #0f1218;
  --text-primary: #f0f2f5;
  --text-secondary: #9ba1a6;
  --accent-blue: #3b82f6;
  --accent-purple: #8b5cf6;
  --accent-cyan: #06b6d4;
  --accent-red: #ef4444;       
  --accent-green: #10b981;  
  /* ... */
}
```

---

*Designed and engineered for speed, premium user experience, and venture capital scale.*
