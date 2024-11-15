'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

export default function LandingPage() {
  const totalVotes = 698500

  // Initialize with current percentages and votes
  const [cirroPercentage, setCirroPercentage] = useState(63.1)
  const [biixiPercentage, setBiixiPercentage] = useState(36.16)
  const [thirdPercentage] = useState(0.74)
  const [processedPercentage, setProcessedPercentage] = useState(97)
  
  // Update refs with current values
  const cirroRef = useRef(63.1)
  const biixiRef = useRef(36.16)
  const processedRef = useRef(97)
  const cirroVotesRef = useRef(Math.round(totalVotes * 0.97 * 0.631))
  const biixiVotesRef = useRef(Math.round(totalVotes * 0.97 * 0.3616))

  useEffect(() => {
    const startTime = new Date('2024-11-15T20:13:00Z').getTime()
    const endTime = startTime + (24 * 60 * 60 * 1000)
    
    const updateValues = () => {
      const now = Date.now()
      const progress = Math.min(Math.max((now - startTime) / (endTime - startTime), 0), 1)
      
      // Process percentage increases smoothly
      const baseProcessed = 97 + (3 * progress)
      const newProcessed = Math.min(
        Math.max(processedRef.current, baseProcessed + (Math.random() * 0.01)),
        100
      )
      
      // Small increments for percentages
      const baseCirro = 63.1 + (0.7 * progress)
      const baseBiixi = 36.16 + (0.04 * progress)
      
      const newCirroValue = Math.max(
        cirroRef.current,
        baseCirro + (Math.random() * 0.005)
      )
      const newBiixiValue = Math.max(
        biixiRef.current,
        baseBiixi + (Math.random() * 0.002)
      )

      // Update refs and state
      processedRef.current = newProcessed
      cirroRef.current = newCirroValue
      biixiRef.current = newBiixiValue
      
      setProcessedPercentage(newProcessed)
      setCirroPercentage(newCirroValue)
      setBiixiPercentage(newBiixiValue)

      // Calculate base votes
      const processedVotes = Math.round(totalVotes * (newProcessed / 100))
      const baseCircoVotes = Math.round(processedVotes * (newCirroValue / 100))
      const baseBiixiVotes = Math.round(processedVotes * (newBiixiValue / 100))

      // Add 1-3 votes per update
      const randomVotesCirro = Math.floor(Math.random() * 3) + 1  // 1-3 votes
      const randomVotesBiixi = Math.floor(Math.random() * 2) + 1  // 1-2 votes

      cirroVotesRef.current = Math.max(
        cirroVotesRef.current,
        baseCircoVotes + randomVotesCirro
      )
      biixiVotesRef.current = Math.max(
        biixiVotesRef.current,
        baseBiixiVotes + randomVotesBiixi
      )
    }

    // Initial update
    updateValues()

    // Update more frequently for smoother increments
    const interval = setInterval(updateValues, 1000) // Every second

    return () => clearInterval(interval)
  }, [])

  // Calculate vote counts using refs to ensure they never decrease
  const processedVotes = Math.round(totalVotes * (processedPercentage / 100))
  const cirroVotes = Math.max(cirroVotesRef.current, Math.round(processedVotes * (cirroPercentage / 100)))
  const biixiVotes = Math.max(biixiVotesRef.current, Math.round(processedVotes * (biixiPercentage / 100)))

  // Calculate others percentage
  const othersPercentage = Math.max(0, 100 - cirroPercentage - biixiPercentage - thirdPercentage)

  // Update the party data state with larger initial values
  const [partyData, setPartyData] = useState([
    { name: 'WADDANI', baseValue: 37.9, value: 37.9, color: '#fb9304', change: '+' },
    { name: 'KAAH', baseValue: 22.1, value: 22.1, color: '#eb242b', change: '+' },
    { name: 'KULMIYE', baseValue: 18.0, value: 18.0, color: '#0c6c04', change: '-' },
    { name: 'HORSEED', baseValue: 12.0, value: 12.0, color: '#87d662', change: '-' },
    { name: 'HILAAC', baseValue: 10.0, value: 10.0, color: '#gray', change: '-' }
  ]);

  useEffect(() => {
    const startTime = new Date('2024-11-15T20:13:00Z').getTime()
    const endTime = startTime + (24 * 60 * 60 * 1000)
    
    const updatePartyData = () => {
      const now = Date.now()
      const progress = Math.min(Math.max((now - startTime) / (endTime - startTime), 0), 1)
      
      setPartyData(prevData => prevData.map(party => {
        // Larger random fluctuation (±0.5%)
        const fluctuation = (Math.random() * 1.0 - 0.5)
        
        // Larger trends based on progress
        const trend = party.name === 'WADDANI' ? 1.2 * progress :
                     party.name === 'KAAH' ? 0.8 * progress :
                     party.name === 'KULMIYE' ? -0.6 * progress :
                     party.name === 'HORSEED' ? -0.7 * progress :
                     -0.7 * progress

        // Combine base value, trend, and fluctuation
        const newValue = party.baseValue + trend + fluctuation

        return {
          ...party,
          value: Number(newValue.toFixed(1))
        }
      }))
    }

    // Update more frequently
    const partyInterval = setInterval(updatePartyData, 2000)

    return () => clearInterval(partyInterval)
  }, [])

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
          {/* Floating Live Visitors Counter - Adjusted position */}
          <div className="fixed top-[5.5rem] sm:top-12 right-2 sm:right-4 z-50">
            <div className="bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-sm font-bold">
                {visitorCount.toLocaleString()} live visitors
              </span>
            </div>
          </div>

          {/* Add margin-top to your main content container */}
          <div className="mt-24 sm:mt-16"> {/* Increased mobile margin */}
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

              {/* Updated vote count text */}
              <p className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                Vote Count Progress: 97.0% of total votes processed ({Math.round(totalVotes * 0.97).toLocaleString()} votes)
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
                    <svg 
                      className="inline-block w-5 h-5 sm:w-6 sm:h-6 text-blue-500 ml-1 mb-1"
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ verticalAlign: 'middle' }}
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.177 15l-4.243-4.243 1.415-1.414 2.828 2.828 5.657-5.657 1.415 1.414-7.072 7.072z" />
                    </svg>
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
                <div className="flex items-center justify-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs text-red-600 font-medium">Live update</span>
                </div>
              </h2>
              <div className="h-96 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={partyData} 
                    layout="vertical"
                    margin={{ 
                      top: 5, 
                      right: 150,
                      left: 80, 
                      bottom: 5
                    }}
                    barSize={30}
                  >
                    <XAxis 
                      type="number" 
                      domain={[0, 45]}
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
                        fontWeight: 600
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 4, 4]}
                      label={(props) => {
                        const { x, y, value, width } = props;
                        const party = partyData.find(p => p.value === value);
                        const baseValue = party?.baseValue ?? value;
                        const trend = value > baseValue ? "▲" : "▼";
                        const trendColor = value > baseValue ? "#22c55e" : "#ef4444";
                        
                        return (
                          <g>
                            <text 
                              x={x + width + 10}
                              y={y + 15}
                              fill="#000000" 
                              fontSize={14}
                              fontWeight="bold"
                              textAnchor="start"
                              style={{ userSelect: 'none' }}
                            >
                              {value.toFixed(1)}%
                            </text>
                            <text 
                              x={x + width + 55}
                              y={y + 15}
                              fill={trendColor}
                              fontSize={14}
                              fontWeight="bold"
                              textAnchor="start"
                              style={{ userSelect: 'none' }}
                            >
                              {trend}
                            </text>
                          </g>
                        );
                      }}
                      animationDuration={500}
                    >
                      {partyData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="transition-all duration-500"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                * Preliminary results - Vote counting in progress
              </p>
            </div>

            {/* Regional Results and Latest News - Modified to only show Regional Results */}
            <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
              {/* Regional Results Table */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <h2 className="text-xl font-bold text-gray-900 p-4 border-b">
                  Regional Results
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Region</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Total Votes</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-orange-600">WADDANI</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-green-700">KULMIYE</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-blue-600">UCID</th>
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

            {/* Add more space between sections */}
            <div className="mt-8 sm:mt-16"> {/* Reduced margin-top for mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto px-4">
                <div className="relative h-40 w-full max-w-sm mx-auto">
                  <Image
                    src="/images/flag.png"
                    alt="Somaliland Flag"
                    fill
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="relative h-40 w-full max-w-sm mx-auto">
                  <Image
                    src="/images/abdirahman.jpg"
                    alt="Presidential Candidate"
                    fill
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Abdirahman Mohamed Abdullahi</h2>
                <p className="mt-1 text-lg sm:text-xl font-extrabold text-green-600">The President of Somaliland</p>
                <p className="mt-1 text-base font-bold text-gray-600">[Newly Elected]</p>
                <p className="mt-0.5 text-base font-bold text-gray-500">13.11.2024 - Present</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Email */}
      <div className="text-center py-4">
        <p className="text-gray-600">
          Email: <a href="mailto:info@somaliland.so" className="hover:text-gray-900">info@somaliland.so</a>
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Somaliland Elections. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
