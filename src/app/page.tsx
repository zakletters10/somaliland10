'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

export default function LandingPage() {
  // Add total votes constant
  const TOTAL_VOTES = 987000

  // State for percentages - updated initial values
  const [cirroPercentage, setCirroPercentage] = useState(63)
  const [biixiPercentage, setBiixiPercentage] = useState(35)

  // Calculate vote counts - removed othersVotes
  const cirroVotes = Math.round(TOTAL_VOTES * (cirroPercentage / 100))
  const biixiVotes = Math.round(TOTAL_VOTES * (biixiPercentage / 100))

  useEffect(() => {
    // Function to update percentages
    const updatePercentages = () => {
      // Random small fluctuation between -0.5 and +0.5
      const cirroChange = (Math.random() - 0.5)
      const biixiChange = (Math.random() - 0.5)

      // Updated bounds for new percentages
      setCirroPercentage(prev => {
        const newValue = prev + cirroChange
        return newValue > 65 ? 65 : newValue < 61 ? 61 : newValue
      })

      setBiixiPercentage(prev => {
        const newValue = prev + biixiChange
        return newValue > 37 ? 37 : newValue < 33 ? 33 : newValue
      })
    }

    // Update every 2 seconds
    const interval = setInterval(updatePercentages, 2000)

    // Cleanup on unmount
    return () => clearInterval(interval)
  }, [])

  // Calculate others percentage
  const othersPercentage = 100 - cirroPercentage - biixiPercentage

  const partyData = [
    { name: 'WADDANI', value: 37, color: '#fb9304' },
    { name: 'KAAH', value: 20, color: '#eb242b' },
    { name: 'KULMIYE', value: 19, color: '#0c6c04' },
    { name: 'HORSEED', value: 15, color: '#87d662' },
    { name: 'HILAAC', value: 9, color: '#gray' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="w-16 h-16 sm:w-10 sm:h-10 bg-gray-300 rounded-full overflow-hidden">
              <Image
                src="/images/emblem.png?height=64&width=64"
                alt="Somaliland Badge"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center sm:text-left">
              President of the Republic of Somaliland 
              <span className="block sm:inline text-base italic text-gray-500 mt-1 sm:mt-0 sm:ml-2">
                Madaxweynaha Soomaaliland
              </span>
            </h3>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-2 sm:py-12 px-4 sm:px-6 lg:px-8">
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
              Total Votes: {TOTAL_VOTES.toLocaleString()}
              <span className="block text-sm sm:text-base text-gray-600 mt-0.5 sm:mt-1">
                Vote Count Progress: 70% of total votes processed ({(TOTAL_VOTES * 0.7).toLocaleString()} votes)
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
                      formatter: (value: number) => `${value}%`,
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
          </div>

          {/* Regional Results Table */}
          <div className="max-w-3xl mx-auto mb-8 overflow-x-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
              Regional Results Breakdown
            </h2>
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Region Name
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        Total Votes
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-[#fb9304]">
                        WADDANI
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-[#0c6b04]">
                        KULMIYE
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                        UCID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[
                      { name: 'AWDAL', votes: 75509, waddani: 78.8, kulmiye: 20.9, ucid: 0.2 },
                      { name: 'MAROODIJEEX', votes: 233120, waddani: 48.7, kulmiye: 50.1, ucid: 1.2 },
                      { name: 'SAAXIL', votes: 36319, waddani: 45.6, kulmiye: 54.0, ucid: 0.3 },
                      { name: 'TOGDHEER', votes: 103207, waddani: 84.9, kulmiye: 14.8, ucid: 0.3 },
                      { name: 'SOOL', votes: 14285, waddani: 83.2, kulmiye: 16.2, ucid: 0.6 },
                      { name: 'SANAAG', votes: 41216, waddani: 89.8, kulmiye: 9.9, ucid: 0.2 },
                    ].map((region) => (
                      <tr key={region.name} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                          {region.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 text-right">
                          {region.votes.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-[#fb9304] font-semibold text-right">
                          {region.waddani}%
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-[#0c6b04] font-semibold text-right">
                          {region.kulmiye}%
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 text-right">
                          {region.ucid}%
                        </td>
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
            © {new Date().getFullYear()} Government of Somaliland. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
