import { Outlet, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import MobileActionBar from './components/MobileActionBar'
import Navbar from './components/Navbar'
import ScrollManager from './components/ScrollManager'
import { EnquiryProvider } from './context/EnquiryContext'
import Credits from './pages/Credits'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Story from './pages/Story'
import Terms from './pages/Terms'

function Layout() {
  return (
    <EnquiryProvider>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
    </EnquiryProvider>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stories/aarav-meera" element={<Story />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="credits" element={<Credits />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
