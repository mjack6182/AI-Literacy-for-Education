import { useEffect, useRef } from 'react'

type ObserverOptions = { threshold?: number; rootMargin?: string }

export function useScrollReveal<T extends HTMLElement>(
  options: ObserverOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
) {
  const ref = useRef<T>(null)
  const threshold = options.threshold ?? 0.12
  const rootMargin = options.rootMargin ?? '0px 0px -40px 0px'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        el.querySelectorAll<HTMLElement>('.reveal').forEach(child => child.classList.add('visible'))
        obs.unobserve(el)
      }
    }, { threshold, rootMargin })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin])

  return ref
}
