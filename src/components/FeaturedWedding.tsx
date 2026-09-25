import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredWedding as story } from '../data/weddings'
import Img from './Img'
import Reveal from './Reveal'

export default function FeaturedWedding() {
  const storyUrl = `/stories/${story.slug}`
  return (
    <section aria-labelledby="featured-title" className="bg-night text-white">
      <div className="mx-auto grid grid-cols-1 max-w-[1440px] lg:min-h-[460px] lg:grid-cols-[42%_1fr_30%] xl:min-h-[500px]">
        <Link to={storyUrl} className="group relative hidden overflow-hidden lg:block" aria-label={`View the full story of ${story.couple}`} tabIndex={-1}>
          <Img photo={story.hero} sizes="42vw" className="zoom-img absolute inset-0 object-[center_28%]" />
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-night/80" />
        </Link>

        <Reveal className="flex flex-col justify-center px-5 py-12 sm:px-8 lg:px-10 lg:py-14 xl:px-14">
          <p className="eyebrow text-white/70">Featured Wedding</p>
          <h2 id="featured-title" className="mt-3 font-serif text-[40px] leading-none sm:text-[46px] xl:text-[54px]">
            {story.couple}
          </h2>
          <p className="eyebrow mt-4 text-gold">
            {story.location} <span className="mx-2 text-white/40">•</span> {story.date}
          </p>
          <p className="mt-5 max-w-[380px] text-[14px] leading-relaxed text-white/75">{story.intro}</p>
          <Link to={storyUrl} className="btn btn-outline-light mt-7 self-start">
            View Full Story <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-3 gap-2 px-5 pb-12 sm:px-8 lg:grid-cols-2 lg:grid-rows-2 lg:gap-2.5 lg:px-0 lg:py-8 lg:pr-12">
          {story.gallery.map((photo, i) => (
            <Link
              key={photo}
              to={`${storyUrl}#chapter-${i === 2 ? 'details' : i === 3 ? 'candid' : 'ceremony'}`}
              className={`group relative aspect-[3/4] overflow-hidden bg-white/5 lg:aspect-auto ${i === 3 ? 'hidden lg:block' : ''}`}
              aria-label={`Open ${story.couple} story`}
            >
              <Img photo={photo} sizes="(min-width: 1024px) 15vw, 33vw" className="zoom-img absolute inset-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
