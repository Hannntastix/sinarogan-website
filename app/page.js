"use client"

import React from 'react'
import Banner from './component/Banner'
import VillageDescription from './component/VillageDescription'
import VillageHistory from './component/VillageHistory'
import VisionMissionSection from './component/VisiMisi'
import GovernmentStructure from './component/GovernmentStructure'
import dynamic from 'next/dynamic'
import VillageLocationSection from './component/VillageLocation'
import UMKMIntroduction from './component/UmkmIntroduction'

export default function Home() {
  const Map = dynamic(() => import('./component/MyMap'), {
    ssr: false,
    loading: () => (
      <div className='h-[500px] w-[80%] mx-auto bg-gray-100 animate-pulse flex items-center justify-center'>
        Loading Map...
      </div>
    )
  });
  return (
    <div id='home'>
      <Banner imageUrl='assets/image/Banner.png' />
      <VillageDescription />
      <VillageHistory />
      <VisionMissionSection />
      <GovernmentStructure />
      <VillageLocationSection />
      <UMKMIntroduction />
    </div>
  )
}
