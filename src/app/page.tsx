'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

export default function LandingPage() {
  const totalVotes = 920000

  // Initialize with static values
  const [cirroPercentage, setCirroPercentage] = useState(62.8)
  const [biixiPercentage, setBiixiPercentage] = useState(35.2)
  const [thirdPercentage] = useState(2.0)
  const [processedPercentage, setProcessedPercentage] = useState(70)
  
  // Use refs to track minimum values
  const cirroRef = useRef(62.8)
  const biixiRef = useRef(35.2)
  const processedRef = useRef(70)
  const cirroVotesRef = useRef(Math.round(totalVotes * 0.7 * 0.628))
  const biixiVotesRef = useRef(Math.round(totalVotes * 0.7 * 0.352))

  // Update values after component mounts
  useEffect(() => {
    // Calculate initial values
    const now = Date.now()
    const startTime = new Date('2024-11-14T21:21:00Z').getTime()
    const endTime = startTime + (12 * 60 * 60 * 1000)
    const progress = Math.min(Math.max((now - startTime) / (endTime - startTime), 0), 1)
    
    // Set initial values
    const initialProcessed = Math.min(70 + (30 * progress), 100)
    const initialCirro = Math.min(62.8 + (progress * 0.1), 62.9)
    const initialBiixi = Math.min(35.2 + (progress * 0.05), 35.3)

    // Update refs and state with initial values
    processedRef.current = Math.max(processedRef.current, initialProcessed)
    cirroRef.current = Math.max(cirroRef.current, initialCirro)
    biixiRef.current = Math.max(biixiRef.current, initialBiixi)
    
    setProcessedPercentage(processedRef.current)
    setCirroPercentage(cirroRef.current)
    setBiixiPercentage(biixiRef.current)

    // Set up interval for updates
    const interval = setInterval(() => {
      const now = Date.now()
      const progress = Math.min(Math.max((now - startTime) / (endTime - startTime), 0), 1)
      
      // Update processed percentage (only increase)
      const newProcessed = Math.max(
        processedRef.current,
        Math.min(70 + (30 * progress), 100)
      )
      processedRef.current = newProcessed
      setProcessedPercentage(newProcessed)

      // Small positive fluctuations
      const cirroPlusValue = Math.random() * 0.05
      const biixiPlusValue = Math.random() * 0.02
      
      // Update percentages (only increase)
      const newCirroValue = Math.max(
        cirroRef.current,
        Math.min(62.8 + (progress * 0.1) + cirroPlusValue, 62.9)
      )
      const newBiixiValue = Math.max(
        biixiRef.current,
        Math.min(35.2 + (progress * 0.05) + biixiPlusValue, 35.3)
      )

      // Update refs and state
      cirroRef.current = newCirroValue
      biixiRef.current = newBiixiValue
      
      setCirroPercentage(newCirroValue)
      setBiixiPercentage(newBiixiValue)

      // Update vote counts
      const newProcessedVotes = Math.round(totalVotes * (newProcessed / 100))
      const newCirroVotes = Math.round(newProcessedVotes * (newCirroValue / 100))
      const newBiixiVotes = Math.round(newProcessedVotes * (newBiixiValue / 100))

      cirroVotesRef.current = Math.max(cirroVotesRef.current, newCirroVotes)
      biixiVotesRef.current = Math.max(biixiVotesRef.current, newBiixiVotes)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Calculate vote counts using refs to ensure they never decrease
  const processedVotes = Math.round(totalVotes * (processedPercentage / 100))
  const cirroVotes = Math.max(cirroVotesRef.current, Math.round(processedVotes * (cirroPercentage / 100)))
  const biixiVotes = Math.max(biixiVotesRef.current, Math.round(processedVotes * (biixiPercentage / 100)))

  // Calculate others percentage
  const othersPercentage = Math.max(0, 100 - cirroPercentage - biixiPercentage - thirdPercentage)

  const partyData = [
    { name: 'WADDANI', value: 37, color: '#fb9304' },
    { name: 'KAAH', value: 22, color: '#eb242b' },
    { name: 'HORSEED', value: 17.2, color: '#87d662' },
    { name: 'KULMIYE', value: 16.8, color: '#0c6c04' },
    { name: 'HILAAC', value: 7, color: '#gray' }
  ];

  // Add visitor counter state
  const [visitorCount, setVisitorCount] = useState(96000)

  // Add visitor counter animation
  useEffect(() => {
    const startCount = 96000
    const targetCount = 2000000
    
    // Calculate initial count
    const now = Date.now()
    const startTime = new Date('2024-11-14T23:05:00Z').getTime()
    const endTime = startTime + (24 * 60 * 60 * 1000)
    const progress = Math.min(Math.max((now - startTime) / (endTime - startTime), 0), 1)
    const initialCount = Math.max(startCount + Math.floor((targetCount - startCount) * progress), startCount)
    
    setVisitorCount(initialCount)

    const interval = setInterval(() => {
      const now = Date.now()
      const progress = Math.min(Math.max((now - startTime) / (endTime - startTime), 0), 1)
      const baseCount = startCount + Math.floor((targetCount - startCount) * progress)
      const fluctuation = Math.floor(Math.random() * 400) - 100
      setVisitorCount(Math.max(baseCount + fluctuation, baseCount))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-2 sm:py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full overflow-hidden">
              <Image
                src="/images/emblem.png?height=64&width=64"
                alt="Somaliland Badge"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              President of the Republic of Somaliland 
              <span className="block sm:inline text-sm sm:text-base italic text-gray-500 mt-0.5 sm:mt-0 sm:ml-2">
                Madaxweynaha Soomaaliland
              </span>
            </h3>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-1 sm:py-12 px-4 sm:px-6 lg:px-8">
          {/* Move results section up for mobile */}
          <div className="max-w-3xl mx-auto mb-4 sm:mb-8">
            {/* Add election title */}
            <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
              13.11.2024 PRESIDENTIAL ELECTIONS
            </h1>

            {/* Add live indicator */}
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-red-600 font-bold">LIVE</span>
            </div>

            {/* Total votes counter - updated with counted votes */}
            <p className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
              Total Expected Votes: {totalVotes.toLocaleString()}
              <span className="block text-sm sm:text-base text-gray-600 mt-0.5 sm:mt-1">
                Vote Count Progress: {processedPercentage.toFixed(1)}% of total votes processed ({Math.round(totalVotes * (processedPercentage / 100)).toLocaleString()} votes)
              </span>
            </p>

            <div className="flex justify-center space-x-16 sm:space-x-32 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#fb9304] mx-auto mb-1 sm:mb-2">
                  <Image
                    src="/images/abdirahman.jpg"
                    alt="Cirro"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#fb9304]">
                  CIRRO {cirroPercentage.toFixed(1)}%
                  <span className="block text-base sm:text-lg">
                    ({cirroVotes.toLocaleString()} votes)
                  </span>
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#0c6b04] mx-auto mb-1 sm:mb-2">
                  <Image
                    src="/images/biixi.jpeg"
                    alt="Biixi"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#0c6b04]">
                  BIIXI {biixiPercentage.toFixed(1)}%
                  <span className="block text-base sm:text-lg">
                    ({biixiVotes.toLocaleString()} votes)
                  </span>
                </p>
              </div>
            </div>
            
            {/* Updated progress bar with faster transitions */}
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div className="flex h-full">
                <div 
                  className="bg-[#fb9304] h-full transform transition-all duration-500 ease-out" 
                  style={{ width: `${cirroPercentage}%` }}
                />
                <div 
                  className="bg-[#0c6b04] h-full transform transition-all duration-500 ease-out" 
                  style={{ width: `${biixiPercentage}%` }}
                />
                <div 
                  className="bg-gray-400 h-full transform transition-all duration-500 ease-out" 
                  style={{ width: `${othersPercentage.toFixed(1)}%` }}
                />
              </div>
            </div>
            
            {/* Scale */}
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>50</span>
              <span>60</span>
              <span>80</span>
              <span>100%</span>
            </div>
            
            {/* Notes */}
            <p className="text-gray-500 text-sm mt-4 text-center">
              Notes: Live election results as of November 13, 2024. Results are updated in real-time.
            </p>
          </div>

          {/* Political Party Results Chart */}
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
              Political Party Results
              <span className="block text-sm text-red-600 font-normal mt-1">
                Still counting - Results are preliminary
              </span>
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={partyData} 
                  layout="vertical"
                  margin={{ top: 5, right: 50, left: 80, bottom: 5 }}
                >
                  <XAxis 
                    type="number" 
                    hide 
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    width={75}
                    style={{
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 4, 4, 0]}
                    label={{ 
                      position: 'right',
                      formatter: (value: number) => `${value}% *`,
                      fill: '#000',
                      fontSize: 14,
                      fontWeight: 'bold',
                      dx: 5
                    }}
                  >
                    {partyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">
              * Preliminary results - Vote counting in progress
            </p>
          </div>

          {/* Regional Results Table */}
          <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-black">Regional Results</h3>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0 shadow-sm rounded-lg">
              <div className="inline-block min-w-full align-middle border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3 px-3 text-left text-sm font-semibold text-gray-900">Region Name</th>
                      <th scope="col" className="py-3 px-3 text-right text-sm font-semibold text-gray-900">Total Votes</th>
                      <th scope="col" className="py-3 px-3 text-right text-sm font-semibold text-[#fb9304]">WADDANI</th>
                      <th scope="col" className="py-3 px-3 text-right text-sm font-semibold text-[#0c6c04]">KULMIYE</th>
                      <th scope="col" className="py-3 px-3 text-right text-sm font-semibold text-gray-600">UCID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[
                      { name: 'AWDAL', votes: 75509, waddani: 78.8, kulmiye: 20.9, ucid: 0.2 },
                      { name: 'MAROODIJEEX', votes: 233120, waddani: 48.7, kulmiye: 50.1, ucid: 1.2 },
                      { name: 'SAAXIL', votes: 36319, waddani: 45.6, kulmiye: 54.0, ucid: 0.3 },
                      { name: 'TOGDHEER', votes: 103207, waddani: 84.9, kulmiye: 14.8, ucid: 0.3 },
                      { name: 'SOOL', votes: 14285, waddani: 83.2, kulmiye: 16.2, ucid: 0.6 },
                      { name: 'SANAAG', votes: 41216, waddani: 89.8, kulmiye: 9.9, ucid: 0.2 }
                    ].map((region) => (
                      <tr key={region.name} className="even:bg-gray-50">
                        <td className="whitespace-nowrap py-2 px-3 text-sm text-gray-900">{region.name}</td>
                        <td className="whitespace-nowrap py-2 px-3 text-sm text-right text-gray-900">{region.votes.toLocaleString()}</td>
                        <td className="whitespace-nowrap py-2 px-3 text-sm text-right font-medium text-[#fb9304]">{region.waddani}%</td>
                        <td className="whitespace-nowrap py-2 px-3 text-sm text-right font-medium text-[#0c6c04]">{region.kulmiye}%</td>
                        <td className="whitespace-nowrap py-2 px-3 text-sm text-right font-medium text-gray-600">{region.ucid}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-row items-center space-x-4 sm:space-x-8 lg:space-x-12">
              <div className="w-36 h-36 sm:w-64 sm:h-64 bg-gray-300 rounded-lg overflow-hidden">
                <Image
                  src="/images/flag.png?height=256&width=256"
                  alt="Flag of Somaliland"
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 640px) 144px, 256px"
                />
              </div>
              <div className="w-36 h-36 sm:w-64 sm:h-64 bg-gray-300 rounded-lg overflow-hidden">
                <Image
                  src="/images/abdirahman.jpg?height=256&width=256"
                  alt="President Abdirahman Mohamed Abdullahi"
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 640px) 144px, 256px"
                />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Abdirahman Mohamed Abdullahi</h2>
              <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-green-600">The President of Somaliland</p>
              <p className="mt-2 text-lg font-bold text-gray-600">[Newly Elected]</p>
              <p className="mt-1 text-lg font-bold text-gray-500">13.11.2024 - Present</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Somaliland. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating visitor counter with updated styling */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3 animate-pulse z-50">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
        <span className="text-base sm:text-lg font-bold">
          {visitorCount.toLocaleString()} live visitors
        </span>
      </div>
    </div>
  )
}
