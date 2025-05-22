export const SUPPORTED_REGISTRIES = [
  {
    id: 'VCS',
    name: 'Verified Carbon Standard',
    description: 'The world\'s most widely used voluntary GHG program',
    status: 'Active',
    totalBridged: '15,000,000',
    lastUpdate: '2024-02-20',
    projectTypes: ['Forestry', 'Renewable Energy', 'Agriculture'],
    locations: ['Global'],
    minAmount: 1,
    maxAmount: 1000000
  },
  {
    id: 'GS',
    name: 'Gold Standard',
    description: 'Premium standard for climate and development interventions',
    status: 'Active',
    totalBridged: '5,000,000',
    lastUpdate: '2024-02-19',
    projectTypes: ['Renewable Energy', 'Energy Efficiency', 'Waste Management'],
    locations: ['Global'],
    minAmount: 1,
    maxAmount: 500000
  },
  {
    id: 'ACR',
    name: 'American Carbon Registry',
    description: 'Leading offset program for the U.S. carbon market',
    status: 'Coming Soon',
    totalBridged: '-',
    lastUpdate: '-',
    projectTypes: ['Forestry', 'Agriculture', 'Wetlands'],
    locations: ['North America'],
    minAmount: 1,
    maxAmount: 100000
  }
]

export const PROJECT_TYPES = {
  VCS: ['Forestry', 'Renewable Energy', 'Agriculture'],
  GS: ['Renewable Energy', 'Energy Efficiency', 'Waste Management'],
  ACR: ['Forestry', 'Agriculture', 'Wetlands']
}

export const LOCATIONS = {
  VCS: ['Global'],
  GS: ['Global'],
  ACR: ['North America']
}

export const VINTAGE_YEARS = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString())

export const BRIDGE_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  FAILED: 'Failed'
}

export const BRIDGE_PROGRESS_STAGES = [
  { value: 0, label: 'Initiated' },
  { value: 25, label: 'Verification' },
  { value: 50, label: 'Tokenization' },
  { value: 75, label: 'Finalization' },
  { value: 100, label: 'Completed' }
] 