import { useEffect, useState } from 'react'
import LandingZoom from './components/LandingZoom.jsx'
import IOSHome from './components/ios/IOSHome.jsx'

const MOBILE_QUERY = '(max-width: 820px)'

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile ? <IOSHome /> : <LandingZoom />
}
