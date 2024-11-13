'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  // State for percentages
  const [cirroPercentage, setCirroPercentage] = useState(68)
  const [biixiPercentage, setBiixiPercentage] = useState(29)

  useEffect(() => {
    // Function to update percentages
    const updatePercentages = () => {
      // Random small fluctuation between -0.5 and +0.5
      const cirroChange = (Math.random() - 0.5)
      const biixiChange = (Math.random() - 0.5)

      // Update percentages while keeping them within reasonable bounds
      setCirroPercentage(prev => {
        const newValue = prev + cirroChange
        return newValue > 70 ? 70 : newValue < 66 ? 66 : newValue
      })

      setBiixiPercentage(prev => {
        const newValue = prev + biixiChange
        return newValue > 31 ? 31 : newValue < 27 ? 27 : newValue
      })
    }

    // Update every 2 seconds
    const interval = setInterval(updatePercentages, 2000)

    // Cleanup on unmount
    return () => clearInterval(interval)
  }, [])

  // Calculate others percentage
  const othersPercentage = 100 - cirroPercentage - biixiPercentage

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
        <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-900">
            13.11.2024 PRESIDENTIAL ELECTION
            <span className="block text-xl sm:text-2xl text-gray-500 mt-3 font-medium">
              Live Results
            </span>
          </h1>

          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-green-600">
            CURRENT WINNER: President Abdirahman Mohamed Abdullahi
          </h2>
          
          {/* Live Election Results */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex justify-center space-x-32 mb-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#fb9304] mx-auto mb-2">
                  <Image
                    src="/images/abdirahman.jpg"
                    alt="Cirro"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-2xl font-bold text-[#fb9304]">
                  CIRRO {cirroPercentage.toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#0c6b04] mx-auto mb-2">
                  <Image
                    src="/images/biixi.jpeg"
                    alt="Biixi"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-2xl font-bold text-[#0c6b04]">
                  BIIXI {biixiPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div className="flex h-full">
                <div 
                  className="bg-[#fb9304] h-full transition-all duration-1000" 
                  style={{ width: `${cirroPercentage}%` }}
                />
                <div 
                  className="bg-[#0c6b04] h-full transition-all duration-1000" 
                  style={{ width: `${biixiPercentage}%` }}
                />
                <div 
                  className="bg-gray-400 h-full transition-all duration-1000" 
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
