import Hero from "./components/hero/Hero"
import Navbar from "./components/nav/Navbar"
import Slider from "./components/slider/Slider"

function App() {

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Slider />
    </div>
  )
}

export default App
