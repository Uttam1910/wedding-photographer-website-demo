import { useState } from 'react'
import About from '../components/About'
import Contact from '../components/Contact'
import EnquiryForm from '../components/EnquiryForm'
import FeaturedWedding from '../components/FeaturedWedding'
import Films from '../components/Films'
import Hero from '../components/Hero'
import Instagram from '../components/Instagram'
import Packages from '../components/Packages'
import Portfolio, { type Filter } from '../components/Portfolio'
import PortfolioIntro from '../components/PortfolioIntro'
import Testimonials from '../components/Testimonials'
import { scrollToId } from '../lib/scroll'

export default function Home() {
  const [filter, setFilter] = useState<Filter>('all')

  const selectCategory = (f: Filter) => {
    setFilter(f)
    scrollToId('gallery')
  }

  return (
    <>
      <Hero />
      <PortfolioIntro onSelect={selectCategory} />
      <Portfolio filter={filter} onFilterChange={setFilter} />
      <FeaturedWedding />

      <div className="mx-auto grid grid-cols-1 max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] xl:gap-12">
        <About />
        <div className="border-t border-line/70 xl:border-0">
          <Packages />
        </div>
      </div>

      <div className="mx-auto grid grid-cols-1 max-w-[1440px] xl:grid-cols-[minmax(0,1fr)_400px] 2xl:grid-cols-[minmax(0,1fr)_430px]">
        <div className="xl:col-start-1 xl:row-start-1">
          <Films />
        </div>
        <div className="px-5 sm:px-8 lg:px-12 xl:col-start-1 xl:row-start-2">
          <Testimonials />
        </div>
        <aside id="enquire" aria-labelledby="enquire-title" className="px-5 pb-12 sm:px-8 lg:px-12 xl:col-start-2 xl:row-span-3 xl:row-start-1 xl:py-8 xl:pr-12 xl:pl-6">
          <div className="xl:sticky xl:top-24">
            <EnquiryForm />
          </div>
        </aside>
        <div className="border-t border-line/70 px-5 sm:px-8 lg:px-12 xl:col-start-1 xl:row-start-3">
          <Instagram />
        </div>
      </div>

      <Contact />
    </>
  )
}
