import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Overview from './pages/Overview'
import CarbonPools from './pages/CarbonPools'
import Explorer from './pages/Explorer'
import CrossChain from './pages/CrossChain'
import Retirements from './pages/Retirements'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/carbon-pools" element={<CarbonPools />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/cross-chain" element={<CrossChain />} />
        <Route path="/retirements" element={<Retirements />} />
      </Routes>
    </Router>
  )
}

export default App
