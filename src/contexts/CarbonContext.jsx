import { createContext, useContext, useState, useEffect } from 'react'

const CarbonContext = createContext()

export const useCarbon = () => {
  const context = useContext(CarbonContext)
  if (!context) {
    throw new Error('useCarbon must be used within a CarbonProvider')
  }
  return context
}

export const CarbonProvider = ({ children }) => {
  const [credits, setCredits] = useState([])
  const [loading, setLoading] = useState(true)

  // Load credits from localStorage on mount
  useEffect(() => {
    const loadCredits = () => {
      try {
        const savedCredits = localStorage.getItem('carbonCredits')
        if (savedCredits) {
          setCredits(JSON.parse(savedCredits))
        }
      } catch (error) {
        console.error('Error loading credits:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCredits()
  }, [])

  // Save credits to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('carbonCredits', JSON.stringify(credits))
    }
  }, [credits, loading])

  const addCredit = (credit) => {
    const newCredit = {
      id: Date.now().toString(),
      ...credit,
      status: 'Pending',
      progress: 0,
      timestamp: new Date().toISOString()
    }
    setCredits(prev => [...prev, newCredit])
    return newCredit
  }

  const updateCredit = (id, updates) => {
    setCredits(prev => 
      prev.map(credit => 
        credit.id === id ? { ...credit, ...updates } : credit
      )
    )
  }

  const deleteCredit = (id) => {
    setCredits(prev => prev.filter(credit => credit.id !== id))
  }

  const clearAllCredits = () => {
    setCredits([])
    localStorage.removeItem('carbonCredits')
  }

  const getCreditById = (id) => {
    return credits.find(credit => credit.id === id)
  }

  const getCreditsByStatus = (status) => {
    return credits.filter(credit => credit.status === status)
  }

  const value = {
    credits,
    loading,
    addCredit,
    updateCredit,
    deleteCredit,
    clearAllCredits,
    getCreditById,
    getCreditsByStatus
  }

  return (
    <CarbonContext.Provider value={value}>
      {children}
    </CarbonContext.Provider>
  )
} 