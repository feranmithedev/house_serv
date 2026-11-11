
import HeroSection from '../components/home/HeroSection'
import PropertyCategories from '../components/home/PropertyCategories'
import FeaturedProperties from '../components/home/FeaturedProperties'
import HomeServices from '../components/home/HomeServices'
import HowItWorks from '../components/home/HowItWorks'
import HomeCTA from '../components/home/HomeCTA'

function HomePage() {
  return (
    <main>
      <HeroSection />
      <PropertyCategories />
      <FeaturedProperties />
      <HomeServices />
      <HowItWorks />
      <HomeCTA />
    </main>
  )
}

export default HomePage