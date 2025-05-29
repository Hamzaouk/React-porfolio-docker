import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

const App = () => {
  return (
    <Router>
      <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        </div>
        <div className="container mx-auto px-8">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Contact />
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

