import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import CreateListing from './pages/CreateListing'
import ListingDetails from './pages/ListingDetails'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
