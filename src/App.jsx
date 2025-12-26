// App.jsx
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './sections/Home'
import About from './sections/About'
import Contact from './sections/Contact'
import Projects from './sections/Projects'
import TechStack from './sections/TechStack'
import Experiences from './sections/Experiences'
import CVPage from './pages/CVpage'

// Composant Portfolio Principal
const Portfolio = () => {
  useEffect(() => {
    // Animation simple au scroll pour les sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible')
        }
      })
    }, { threshold: 0.1 })

    // Observer chaque section
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => {
      observer.observe(section)
    })

    // Cleanup
    return () => {
      sections.forEach(section => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <Layout>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="experiences">
        <Experiences />
      </section>
      <section id="techstack">
        <TechStack />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </Layout>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/cv" element={<CVPage />} />
      </Routes>
    </Router>
  )
}

export default App