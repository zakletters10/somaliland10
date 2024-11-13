'use client'

import Image from 'next/image'

export default function LandingPage() {
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