import { TopNav } from '../components/shared/TopNav'
import { Hero } from '../components/landing/Hero'
import { StatsStrip } from '../components/landing/StatsStrip'
import { WhatIsAI } from '../components/landing/WhatIsAI'
import { HowItWorks } from '../components/landing/HowItWorks'
import { PersonaPicker } from '../components/landing/PersonaPicker'
import { Footer } from '../components/landing/Footer'

export default function Landing() {
  return (
    <div>
      <TopNav current="home"/>
      <Hero/>
      <StatsStrip/>
      <HowItWorks/>
      <WhatIsAI/>
      <PersonaPicker/>
      <Footer/>
    </div>
  )
}
