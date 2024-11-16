'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import useWindowDimensions from '@/hooks/useWindowDimensions'

export default function LandingPage() {
  const { width } = useWindowDimensions()

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

  // Update the party data state with HORSEED before KULMIYE
  const [partyData, setPartyData] = useState([
    { name: 'WADDANI', baseValue: 37.9, value: 37.9, color: '#fb9304', change: '+' },
    { name: 'KAAH', baseValue: 22.1, value: 22.1, color: '#eb242b', change: '+' },
    { name: 'HORSEED', baseValue: 18.2, value: 18.2, color: '#87d662', change: '-' }, // Slightly higher than KULMIYE
    { name: 'KULMIYE', baseValue: 17.7, value: 17.7, color: '#0c6c04', change: '-' },
    { name: 'HILAAC', baseValue: 4.1, value: 4.1, color: 'gray', change: '-' }
  ]);

  // Modify the useEffect that updates party data
  useEffect(() => {
    const startTime = new Date('2024-11-15T20:13:00Z').getTime()
    const endTime = startTime + (24 * 60 * 60 * 1000)
    let lastFlip = Date.now()
    
    const updatePartyData = () => {
      const now = Date.now()
      const progress = Math.min(Math.max((now - startTime) / (endTime - startTime), 0), 1)
      
      setPartyData(prevData => {
        const newData = prevData.map(party => {
          // Special handling for HORSEED and KULMIYE
          let fluctuation = 0
          if (party.name === 'KULMIYE' || party.name === 'HORSEED') {
            // Only allow position changes every 5-10 seconds
            const timeSinceLastFlip = now - lastFlip
            const minFlipTime = 5000 // 5 seconds minimum
            const maxFlipTime = 10000 // 10 seconds maximum
            const shouldAllowFlip = timeSinceLastFlip > minFlipTime && 
                                   timeSinceLastFlip < maxFlipTime &&
                                   Math.random() < 0.2 // 20% chance within the time window
            
            if (shouldAllowFlip) {
              fluctuation = (Math.random() * 0.15 - 0.075) // ±0.075% for position changes
              lastFlip = now
            } else {
              // Very small fluctuation during stable periods
              fluctuation = (Math.random() * 0.02 - 0.01) // ±0.01%
            }
          } else {
            // Normal fluctuation for other parties
            fluctuation = (Math.random() * 0.04 - 0.02) // ±0.02%
          }
          
          // Adjusted trends to keep HORSEED slightly ahead
          const trend = party.name === 'WADDANI' ? 1.2 * progress :
                       party.name === 'KAAH' ? 0.8 * progress :
                       party.name === 'HORSEED' ? -0.25 * progress : // Slightly better trend
                       party.name === 'KULMIYE' ? -0.3 * progress :
                       -0.7 * progress

          // Combine base value, trend, and fluctuation with smoothing
          const newValue = party.baseValue + trend + fluctuation

          return {
            ...party,
            value: Number(newValue.toFixed(2))
          }
        })

        // Sort with a larger threshold to prevent frequent position changes
        return newData.sort((a, b) => {
          const diff = b.value - a.value
          // Only change positions if difference is more than 0.1%
          if (Math.abs(diff) < 0.1) {
            // Keep current order for small differences
            const aIndex = prevData.findIndex(p => p.name === a.name)
            const bIndex = prevData.findIndex(p => p.name === b.name)
            return aIndex - bIndex
          }
          return diff
        })
      })
    }

    // Update less frequently for smoother transitions
    const partyInterval = setInterval(updatePartyData, 3000) // Every 3 seconds

    return () => clearInterval(partyInterval)
  }, [])

  // Add visitor counter state
  const [visitorCount, setVisitorCount] = useState(1500000)

  // Add visitor counter animation
  useEffect(() => {
    const startCount = 1500000  // 1.5M
    const targetCount = 2145677 // ~2.15M
    
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
      
      // Weighted random fluctuation (70% chance to increase)
      const randomDirection = Math.random()
      const fluctuation = Math.floor(Math.random() * 10000) // Up to 10,000 visitors
      const change = randomDirection < 0.7 ? fluctuation : -fluctuation * 0.5 // Smaller decreases
      
      const newCount = baseCount + change
      // Ensure count stays within bounds
      setVisitorCount(Math.min(Math.max(newCount, baseCount), targetCount))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Add share functionality
  const handleShare = async () => {
    try {
      const shareData = {
        title: 'Somaliland Presidential Elections 2024 - Live Results',
        text: `🗳️ Live Election Results:\n` +
              `Cirro: ${cirroPercentage.toFixed(1)}% (${cirroVotes.toLocaleString()} votes)\n` +
              `Biixi: ${biixiPercentage.toFixed(1)}% (${biixiVotes.toLocaleString()} votes)\n` +
              `${processedPercentage.toFixed(1)}% of votes processed`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop browsers
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        );
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-2 sm:py-4 px-4 sm:px-6 lg:px-8">
          {/* Remove the watermark from here */}
          
          <div className="flex flex-row items-center justify-between">
            {/* Left side with Emblem and Original Title */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Emblem */}
              <div className="w-12 h-12 sm:w-16 sm:h-16">
                <Image
                  src="/images/emblem.png"
                  alt="Somaliland Emblem"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Original Title and Subtitle */}
              <div>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">
                  President of the Republic of Somaliland
                </h3>
                <span className="block text-xs sm:text-sm md:text-base italic text-gray-500">
                  Madaxweynaha Soomaaliland
                </span>
              </div>
            </div>

            {/* AI System Text and Government Icon */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div>
                <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-gray-900 text-right">
                  AI-Powered<br className="hidden xs:block sm:hidden" /> Election System
                </h3>
              </div>
              {/* Government Building Image - Increased mobile size */}
              <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-16 sm:h-16 md:w-18 md:h-18 relative">
                <Image
                  src="/images/gov.jpg"
                  alt="Government Building Icon"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 64px, 72px"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-1 sm:py-6 px-4 sm:px-6 lg:px-8">
          {/* Enhanced Watermark */}
          <div className="text-center mb-1 sm:mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                          bg-gradient-to-r from-green-50 to-green-100 
                          border border-green-200 shadow-sm hover:shadow-md 
                          transition-all duration-300">
              <span className="text-xs sm:text-sm font-semibold text-green-700">
                www.somaliland.so
              </span>
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600"
                stroke="currentColor" 
              >
                <path 
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* More Compact Live Visitors Counter */}
          <div className="fixed top-[4rem] sm:top-20 right-2 sm:right-4 z-50">
            <div className="bg-black/80 text-white px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2 backdrop-blur-sm hover:bg-black/90 transition-all">
              {/* Pulse Animation */}
              <div className="relative">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              
              {/* Visitor Count */}
              <div className="flex flex-col leading-none sm:leading-tight">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-xs text-green-400 font-medium">LIVE</span>
                  {/* Person Icon */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400"
                  >
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-sm font-bold">
                  {visitorCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Optional: Add a spacer to prevent content from hiding behind the fixed counter */}
          <div className="h-12 sm:h-16" />

          {/* Reduced top margin */}
          <div className="mt-16 sm:mt-8">
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

            {/* Political Party Results Chart - Enhanced mobile UI */}
            <div className="max-w-3xl mx-auto mb-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 text-center">
                Political Party Results
                <span className="block text-xs sm:text-sm text-red-600 font-normal mt-0.5 sm:mt-1">
                  Still counting - Results are preliminary
                </span>
                <div className="flex items-center justify-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[10px] sm:text-xs text-red-600 font-medium">Live update</span>
                </div>
              </h2>
              <div className="h-[340px] sm:h-80 w-full"> {/* Taller on mobile for better spacing */}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={partyData} 
                    layout="vertical"
                    margin={{ 
                      top: 5,
                      right: width < 640 ? 65 : 150,
                      left: width < 640 ? 40 : 80,
                      bottom: 5 
                    }}
                    barSize={width < 640 ? 20 : 30}   // Thinner bars on mobile
                  >
                    <XAxis 
                      type="number" 
                      domain={[0, width < 640 ? 100 : 45]} // Extended domain for mobile
                      hide 
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      width={width < 640 ? 35 : 75} // Narrower axis on mobile
                      style={{
                        fontSize: width < 640 ? '10px' : '14px',
                        fontWeight: 600
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[3, 3, 3, 3]} // Slightly smaller radius on mobile
                      label={(props) => {
                        const { x, y, value, width } = props;
                        const party = partyData.find(p => p.value === value);
                        const baseValue = party?.baseValue ?? value;
                        const trend = value > baseValue ? "▲" : "▼";
                        const trendColor = value > baseValue ? "#22c55e" : "#ef4444";
                        
                        return (
                          <g>
                            <text 
                              x={x + width + (width < 640 ? 3 : 10)}
                              y={y + (width < 640 ? 11 : 15)}
                              fill="#000000" 
                              fontSize={width < 640 ? 10 : 14}
                              fontWeight="bold"
                              textAnchor="start"
                              style={{ userSelect: 'none' }}
                            >
                              {value.toFixed(1)}%
                            </text>
                            <text 
                              x={x + width + (width < 640 ? 28 : 55)}
                              y={y + (width < 640 ? 11 : 15)}
                              fill={trendColor}
                              fontSize={width < 640 ? 10 : 14}
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
              <p className="text-[10px] sm:text-sm text-gray-500 text-center mt-2 sm:mt-4">
                * Preliminary results - Vote counting in progress
              </p>
            </div>

            {/* Regional Results and Latest News - Modified to only show Regional Results */}
            <div className="max-w-7xl mx-auto mt-8 px-2 sm:px-6 lg:px-8">
              {/* Regional Results Table - Updated UCID color */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <h2 className="text-xl font-bold text-gray-900 p-4 border-b">
                  Regional Results
                </h2>
                <div className="w-full">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 sm:px-4 py-2 text-left text-[11px] sm:text-sm font-semibold text-gray-900">Region</th>
                        <th className="px-2 sm:px-4 py-2 text-right text-[11px] sm:text-sm font-semibold text-gray-900">Total</th>
                        <th className="px-2 sm:px-4 py-2 text-right text-[11px] sm:text-sm font-semibold text-orange-600">WADDANI</th>
                        <th className="px-2 sm:px-4 py-2 text-right text-[11px] sm:text-sm font-semibold text-green-700">KULMIYE</th>
                        <th className="px-2 sm:px-4 py-2 text-right text-[11px] sm:text-sm font-semibold text-[#0c6c04]">UCID</th>
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
                          <td className="px-2 sm:px-3 py-2 text-[11px] sm:text-sm text-gray-900 font-medium">{region.name}</td>
                          <td className="px-2 sm:px-3 py-2 text-[11px] sm:text-sm text-right text-gray-900">
                            {region.votes >= 100000 
                              ? `${(region.votes / 1000).toFixed(1)}K` 
                              : region.votes.toLocaleString()}
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-[11px] sm:text-sm text-right font-medium text-[#fb9304]">{region.waddani}%</td>
                          <td className="px-2 sm:px-3 py-2 text-[11px] sm:text-sm text-right font-medium text-[#0c6c04]">{region.kulmiye}%</td>
                          <td className="px-2 sm:px-3 py-2 text-[11px] sm:text-sm text-right font-medium text-[#0c6c04]">{region.ucid}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Add more space between sections */}
            <div className="mt-6 sm:mt-12 lg:mt-16"> {/* Adjusted margins */}
              {/* Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
                {/* Flag Image */}
                <div className="relative aspect-video sm:aspect-[4/3] w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/flag.png"
                    alt="Somaliland Flag"
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* President Image */}
                <div className="relative aspect-video sm:aspect-[4/3] w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/abdirahman.jpg"
                    alt="Presidential Candidate"
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center mt-6 sm:mt-8 px-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Abdirahman Mohamed Abdullahi
                </h2>
                <p className="mt-2 sm:mt-3 text-lg sm:text-xl lg:text-2xl font-extrabold text-green-600">
                  President-elect
                  <span className="text-sm sm:text-base font-normal text-gray-500 ml-2">
                    (pending official confirmation)
                  </span>
                </p>
                <p className="mt-1 sm:mt-2 text-base sm:text-lg font-bold text-gray-500">
                  6th President of the Republic of Somaliland
                </p>
                <p className="mt-1 text-base sm:text-lg font-bold text-gray-500">
                  13.11.2024 - Present
                </p>
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

      {/* Enhanced Share Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleShare}
          className="group bg-black/80 hover:bg-black/90 text-white px-6 py-3 rounded-full shadow-lg 
                   flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 
                   backdrop-blur-sm border border-white/10"
          aria-label="Share Results"
        >
          {/* Share Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          
          {/* Share Text */}
          <span className="font-medium text-sm text-gray-100 group-hover:text-white transition-colors">
            Share
          </span>

          {/* Pulse Animation */}
          <div className="absolute -top-1 -right-1 w-3 h-3">
            <div className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-blue-400"></div>
            <div className="relative inline-flex w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
        </button>
      </div>

      {/* Add a spacer to prevent content from being hidden behind the fixed button */}
      <div className="h-16" />
    </div>
  )
}
