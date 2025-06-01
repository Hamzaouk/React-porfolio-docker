import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import PreloadPage from "./components/preload-page"

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloadComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      
      {/* Preloader */}
      {isLoading && <PreloadPage onComplete={handlePreloadComplete} />}
      
      {/* Main content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="container mx-auto px-8">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App