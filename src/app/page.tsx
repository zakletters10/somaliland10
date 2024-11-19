'use client'

import Image from 'next/image'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import useWindowDimensions from '@/hooks/useWindowDimensions'

export default function LandingPage() {
  const { width } = useWindowDimensions()

  // Static values for the final results
  const totalVotes = 638126;  // New total votes
  const cirroVotes = 407885;  // 63.92% of 638126
  const biixiVotes = 222132;  // 34.81% of 638126
  const faisalVotes = 8109;   // remaining votes (approximately 1.27%)

  // Calculate percentages once - using exact percentages provided
  const cirroPercentage = 63.92;
  const biixiPercentage = 34.81;
  const faisalPercentage = 1.27;  // 100 - 63.92 - 34.81

  // Party data for chart
  const partyData = [
    { 
      name: 'WADDANI', 
      value: Math.round((216284 / totalVotes) * 100 * 10) / 10,
      baseValue: 33.7, 
      color: '#fb9304', 
      qualified: true 
    },
    { 
      name: 'KULMIYE', 
      value: Math.round((131507 / totalVotes) * 100 * 10) / 10,
      baseValue: 20.5, 
      color: '#0c6c04', 
      qualified: true 
    },
    { 
      name: 'KAAH', 
      value: Math.round((108100 / totalVotes) * 100 * 10) / 10,
      baseValue: 16.8, 
      color: '#eb242b', 
      qualified: true 
    },
    { 
      name: 'HORSEED', 
      value: Math.round((78774 / totalVotes) * 100 * 10) / 10, // 11.9%
      baseValue: 11.9, 
      color: '#87d662', 
      qualified: false 
    },
    { 
      name: 'HILAAC', 
      value: Math.round((59254 / totalVotes) * 100 * 10) / 10, // 9.0%
      baseValue: 9.0, 
      color: '#666666', 
      qualified: false 
    },
    { 
      name: 'BARWAAQO', 
      value: Math.round((17031 / totalVotes) * 100 * 10) / 10, // 2.6%
      baseValue: 2.6, 
      color: '#999999', 
      qualified: false 
    },
    { 
      name: 'UCID', 
      value: Math.round((10191 / totalVotes) * 100 * 10) / 10, // 1.5%
      baseValue: 1.5, 
      color: '#999999', 
      qualified: false 
    },
    { 
      name: 'TALO-WADAAG', 
      value: Math.round((6569 / totalVotes) * 100 * 10) / 10, // 1.0%
      baseValue: 1.0, 
      color: '#999999', 
      qualified: false 
    },
    { 
      name: 'RAJO', 
      value: Math.round((2108 / totalVotes) * 100 * 10) / 10, // 0.3%
      baseValue: 0.3, 
      color: '#999999', 
      qualified: false 
    },
    { 
      name: 'SHACABKA', 
      value: Math.round((2040 / totalVotes) * 100 * 10) / 10, // 0.3%
      baseValue: 0.3, 
      color: '#999999', 
      qualified: false 
    }
  ];

  // Final percentages and processed state
  // const processedPercentage = 100;

  // No need for state or refs since these are final results
  // Just use cirroPercentage and biixiPercentage directly from the calculations above

  // Initialize state with calculated value
  // const [visitorCount, setVisitorCount] = useState(INITIAL_VISITOR_COUNT);
  // const [totalVisitors, setTotalVisitors] = useState(1500000);

  // Live Visitors Counter Component
  // const LiveVisitorCounter = () => {
  //   const [visitorCount, setVisitorCount] = useState(152000);
  //   const [totalVisitors, setTotalVisitors] = useState(2145677);
  //   const [lastHourChecked, setLastHourChecked] = useState(new Date().getHours());

  //   useEffect(() => {
  //     // Check and add hourly increase
  //     const checkHourlyIncrease = () => {
  //       const currentHour = new Date().getHours();
  //       if (currentHour !== lastHourChecked) {
  //         setVisitorCount(prev => prev + 2000); // Add 2000 for the new hour
  //         setTotalVisitors(prev => prev + 2000);
  //         setLastHourChecked(currentHour);
  //       }
  //     };

  //     // Random fluctuations in visitors
  //     const updateVisitors = () => {
  //       checkHourlyIncrease();

  //       // Generate random change (-50 to +100)
  //       const changeTypes = [
  //         { change: -50, probability: 0.15 },
  //         { change: -30, probability: 0.15 },
  //         { change: 10, probability: 0.2 },
  //         { change: 50, probability: 0.3 },
  //         { change: 100, probability: 0.2 }
  //       ];

  //       const random = Math.random();
  //       let cumulativeProbability = 0;
  //       let selectedChange = 0;

  //       for (const type of changeTypes) {
  //         cumulativeProbability += type.probability;
  //         if (random <= cumulativeProbability) {
  //           selectedChange = type.change;
  //           break;
  //         }
  //       }

  //       setVisitorCount(prev => {
  //         const newCount = prev + selectedChange;
  //         // Update total visitors only for increases
  //         if (selectedChange > 0) {
  //           setTotalVisitors(total => total + selectedChange);
  //         }
  //         return newCount;
  //       });
  //     };

  //     // Update every 3 seconds with random changes
  //     const interval = setInterval(updateVisitors, 3000);
  //     return () => clearInterval(interval);
  //   }, [lastHourChecked]);

  //   return (
  //     <div className="fixed top-[4rem] sm:top-20 right-2 sm:right-4 z-50">
  //       <div className="bg-black/80 text-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm hover:bg-black/90 transition-all">
  //         <div className="flex flex-col gap-0.5">
  //           {/* Live Counter */}
  //           <div className="flex items-center gap-1.5">
  //             <div className="relative">
  //               <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
  //               <div className="absolute inset-0 w-1 h-1 bg-green-500 rounded-full animate-ping opacity-75" />
  //             </div>
  //             <div className="flex items-center gap-1">
  //               <span className="text-[8px] text-green-400 uppercase tracking-wide">Live</span>
  //               <svg 
  //                 viewBox="0 0 24 24" 
  //                 fill="currentColor" 
  //                 className="w-2.5 h-2.5 text-green-400"
  //               >
  //                 <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  //               </svg>
  //               <span className="text-[10px] font-bold min-w-[40px] text-right">
  //                 {visitorCount.toLocaleString()}
  //               </span>
  //             </div>
  //           </div>
  //           
  //           {/* Total Visitors */}
  //           <div className="flex items-center justify-end gap-1 border-t border-white/10 pt-0.5">
  //             <span className="text-[7px] text-gray-400 whitespace-nowrap">Total (3d):</span>
  //             <span className="text-[8px] font-bold text-blue-400 min-w-[45px] text-right">
  //               {totalVisitors.toLocaleString()}
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // Add share functionality
  const handleShare = async () => {
    try {
      const shareData = {
        title: 'Somaliland Presidential Elections 2024 - Live Results',
        text: `🗳️ Live Election Results:\n` +
              `Cirro: ${cirroPercentage.toFixed(1)}% (${cirroVotes.toLocaleString()} votes)\n` +
              `Biixi: ${biixiPercentage.toFixed(1)}% (${biixiVotes.toLocaleString()} votes)\n` +
              `100% of votes processed`,
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-2 sm:py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center">
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
                <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900">
                  President of the Republic of Somaliland
                </h3>
                <span className="block text-[10px] sm:text-sm md:text-base italic text-gray-500">
                  Madaxweynaha Soomaaliland
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-1 sm:py-6 px-4 sm:px-6 lg:px-8">
          {/* Enhanced Watermark with Confirmation Status */}
          <div className="text-center mt-16 sm:mt-8 mb-1 sm:mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
                          bg-gradient-to-r from-green-50 to-green-100 
                          border border-green-200 shadow-sm hover:shadow-md 
                          transition-all duration-300">
              {/* Confirmation Indicator */}
              <div className="relative flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
                <span className="text-[10px] sm:text-xs text-green-600 font-semibold uppercase">Results Confirmed</span>
                <span className="text-[10px] sm:text-xs text-green-600">Natiijada rasmiga ah</span>
              </div>
              
              {/* Divider */}
              <div className="h-3 w-px bg-green-200"></div>
              
              {/* Website URL */}
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

          {/* Move results section up */}
          <div className="max-w-3xl mx-auto mb-4 sm:mb-8">
            {/* Add election title with Somali translation */}
            <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              13.11.2024 PRESIDENTIAL ELECTIONS
              <span className="block text-sm sm:text-base text-gray-600 mt-0.5">
                DOORASHADA MADAXWEYNAHA 13.11.2024
              </span>
            </h1>

            {/* Vote Count Complete Text - with smaller text */}
            <p className="text-center text-sm sm:text-base font-bold text-gray-900 mb-4 sm:mb-6">
              Vote Count Complete: 100%
              <span className="block text-[11px] sm:text-sm text-gray-600 mt-0.5">
                Tirinta Codadka: 100% codadka la tiriyey
              </span>
            </p>

            <div className="flex justify-center space-x-16 sm:space-x-32 mb-4 sm:mb-6">
              {/* CIRRO - Slightly larger */}
              <div className="text-center scale-110">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#fb9304] mx-auto mb-1 sm:mb-2">
                  <Image
                    src="/images/abdirahman.jpg"
                    alt="Cirro"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Name, Percentage and Verification */}
                <div className="flex items-center justify-center gap-2 mb-0.5">
                  <span className="text-xl sm:text-2xl font-bold text-[#fb9304]">
                    CIRRO {cirroPercentage.toFixed(1)}%
                  </span>
                  <svg 
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M16 3L4 9C4 17 4 22.5 16 29C28 22.5 28 17 28 9L16 3Z"
                      fill="#059669"
                      stroke="#047857"
                      strokeWidth="1"
                    />
                    <path
                      d="M16 4L5 9.5C5 16.5 5 21.5 16 27.5C27 21.5 27 16.5 27 9.5L16 4Z"
                      fill="#059669"
                    />
                    <path
                      d="M11 16L14.5 19.5L21 13"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#fb9304]">
                  ({cirroVotes.toLocaleString()} votes)
                </p>
              </div>
              {/* BIIXI - Slightly smaller */}
              <div className="text-center scale-95">
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
            
            {/* Progress bar container with labels */}
            <div className="relative mb-6">
              {/* Main progress bar */}
              <div className="relative h-10 sm:h-12 bg-gray-200 rounded-xl overflow-hidden shadow-inner">
                <div className="flex h-full">
                  {/* Cirro's section */}
                  <div 
                    className="bg-[#fb9304] h-full transform transition-all duration-500 ease-out relative flex items-center justify-end px-3"
                    style={{ width: `${cirroPercentage.toFixed(1)}%` }}
                  >
                    <span className="text-white text-xs sm:text-sm font-medium tracking-wider hidden sm:block">
                      CIRRO {cirroPercentage.toFixed(1)}%
                    </span>
                  </div>
                  
                  {/* Biixi's section */}
                  <div 
                    className="bg-[#0c6b04] h-full transform transition-all duration-500 ease-out relative flex items-center justify-end px-3"
                    style={{ width: `${biixiPercentage.toFixed(1)}%` }}
                  >
                    <span className="text-white text-xs sm:text-sm font-medium tracking-wider hidden sm:block">
                      BIIXI {biixiPercentage.toFixed(1)}%
                    </span>
                  </div>

                  {/* Faisal's section - removed label but kept grey area */}
                  <div 
                    className="bg-gray-400 h-full transform transition-all duration-500 ease-out"
                    style={{ width: `${faisalPercentage.toFixed(1)}%` }}
                  />
                </div>
              </div>

              {/* Legend below progress bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
                {/* Cirro legend */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#fb9304]" />
                  <span className="text-xs text-gray-700 font-medium">
                    CIRRO ({cirroPercentage.toFixed(1)}%) - {cirroVotes.toLocaleString()} votes
                  </span>
                </div>
                
                {/* Biixi legend */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0c6b04]" />
                  <span className="text-xs text-gray-700 font-medium">
                    BIIXI ({biixiPercentage.toFixed(1)}%) - {biixiVotes.toLocaleString()} votes
                  </span>
                </div>

                {/* Faisal legend */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                  <span className="text-xs text-gray-700 font-medium">
                    FAISAL ({faisalPercentage.toFixed(1)}%) - {faisalVotes.toLocaleString()} votes
                  </span>
                </div>
              </div>

              {/* Vote count summary - with Somali */}
              <div className="text-center mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Total Votes / Wadarta Codadka: {totalVotes.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Notes - removed Somali translation */}
            <p className="text-gray-500 text-sm mt-4 text-center">
              Notes: Live election results as of November 13, 2024. Results are updated in real-time.
            </p>
          </div>

          {/* Political Party Results Chart - Enhanced mobile UI */}
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 text-center">
              Political Party Results
              <span className="block text-xs sm:text-sm text-green-600 font-normal mt-0.5 sm:mt-1">
                Final Results - Vote Count Complete
              </span>
              <div className="flex items-center justify-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-600" />
                <span className="text-[10px] sm:text-xs text-green-600 font-medium">
                  100% Counted
                </span>
              </div>
            </h2>
            <div className="h-[340px] sm:h-80 w-full"> {/* Taller on mobile for better spacing */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={partyData} 
                  layout="vertical"
                  margin={{ 
                    top: 5,
                    right: width < 640 ? 100 : 200,
                    left: width < 640 ? 40 : 80,
                    bottom: 5 
                  }}
                  barSize={width < 640 ? 20 : 30}   // Thinner bars on mobile
                >
                  <XAxis 
                    type="number" 
                    domain={[0, width < 640 ? 45 : 45]} // Changed from 100 to 45 on mobile
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
                      let voteCount = 0;
                      
                      // Map party names to vote counts
                      switch(party?.name) {
                        case 'WADDANI': voteCount = 242029; break;
                        case 'KAAH': voteCount = 135474; break;
                        case 'KULMIYE': voteCount = 108280; break;
                        case 'HORSEED': voteCount = 78774; break;
                        case 'HILAAC': voteCount = 59254; break;
                        case 'BARWAAQO': voteCount = 17031; break;
                        case 'UCID': voteCount = 10191; break;
                        case 'TALO-WADAAG': voteCount = 6569; break;
                        case 'RAJO': voteCount = 2108; break;
                        case 'SHACABKA': voteCount = 2040; break;
                      }

                      return (
                        <g>
                          {/* Percentage */}
                          <text 
                            x={x + width + (width < 640 ? 8 : 15)}
                            y={y + (width < 640 ? 14 : 18)}
                            fill="#000000" 
                            fontSize={width < 640 ? 12 : 16}
                            fontWeight="700"
                            textAnchor="start"
                            style={{ userSelect: 'none' }}
                          >
                            {value.toFixed(1)}%
                          </text>
                          {/* Vote Count */}
                          <text 
                            x={x + width + (width < 640 ? 45 : 65)}
                            y={y + (width < 640 ? 14 : 18)}
                            fill="#666666" 
                            fontSize={width < 640 ? 11 : 14}
                            fontWeight="600"
                            textAnchor="start"
                            style={{ userSelect: 'none' }}
                          >
                            ({voteCount.toLocaleString()})
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
              <p className="mt-2 sm:mt-3 text-lg sm:text-xl lg:text-2xl font-extrabold text-green-600 flex items-center justify-center gap-2">
                President-elect
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 inline-block"
                  stroke="currentColor" 
                >
                  <path 
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm sm:text-base font-normal text-gray-500">
                  (Confirmed)
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
      </main>

      {/* Email */}
      <div className="text-center py-4">
        <p className="text-gray-600">
          Email: <a href="mailto:info@somaliland.so" className="text-blue-600 hover:text-blue-800 underline">info@somaliland.so</a>
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Somaliland Elections. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Share Button */}
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
    </div>
  )
}
