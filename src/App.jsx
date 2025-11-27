import React from 'react'
import Layout from './components/layout/Layout'
import Home from './sections/Home'
import About from './sections/About'
import Contact from './sections/Contact'
import Projects from './sections/Projects'
import TechStack from './sections/TechStack'
import Parcours from './sections/Parcours'
function App() {
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
      <section id="parcours">
        <Parcours />
      </section>
      <section id="TechStack">
        <TechStack />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </Layout>
  )
}

export default App