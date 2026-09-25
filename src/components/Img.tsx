import type { ImgHTMLAttributes } from 'react'
import { imgSrc, photos, type PhotoKey } from '../data/images'

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  photo: PhotoKey
  /** `sizes` hint for the browser; defaults to a mid-size tile. */
  sizes?: string
  alt?: string
  priority?: boolean
}

/** Responsive WebP image from the local photo registry. */
export default function Img({ photo, sizes = '(min-width: 1024px) 33vw, 50vw', alt, priority, className = '', ...rest }: ImgProps) {
  const meta = photos[photo]
  const lgWidth = photo.startsWith('hero-') ? 2000 : meta.orientation === 'landscape' ? 1600 : 1067
  const smWidth = meta.orientation === 'landscape' ? 720 : 560
  return (
    <img
      src={imgSrc(photo, 'lg')}
      srcSet={`${imgSrc(photo, 'sm')} ${smWidth}w, ${imgSrc(photo, 'lg')} ${lgWidth}w`}
      sizes={sizes}
      alt={alt ?? meta.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      draggable={false}
      className={`h-full w-full object-cover ${className}`}
      {...rest}
    />
  )
}
