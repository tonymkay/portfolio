import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import PageWrapper from './components/layout/PageWrapper/PageWrapper'
import WorkLayout from './components/layout/WorkLayout/WorkLayout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Projects from './pages/Projects/Projects'
import Process from './pages/Process/Process'
import Contact from './pages/Contact/Contact'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'
import NotFound from './pages/NotFound/NotFound'
import UxProjects from './pages/UxProjects/UxProjects'
import Posters from './pages/Posters/Posters'
import Work from './pages/Work/Work'
import UxProjectDetail from './pages/UxProjectDetail/UxProjectDetail'
import PosterDetail from './pages/PosterDetail/PosterDetail'
import Intro from './pages/Intro/Intro'

// Wrapper that forces a full remount whenever the slug changes.
// This resets all useScrollReveal / animation state so reveal
// animations play fresh on every project page visit.
function KeyedProjectDetail() {
  const { slug } = useParams()
  return <ProjectDetail key={slug} />
}

function KeyedUxProjectDetail() {
  const { slug } = useParams()
  return <UxProjectDetail key={slug} />
}

function KeyedPosterDetail() {
  const { slug } = useParams()
  return <PosterDetail key={slug} />
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Intro />
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/"              element={<Home />} />
          <Route path="/about"         element={<About />} />
          <Route path="/process"       element={<Process />} />
          <Route path="/contact"       element={<Contact />} />
          <Route path="/work"          element={<Work />} />
          <Route path="/projects/:slug" element={<KeyedProjectDetail />} />
          <Route path="/posters/:slug"  element={<KeyedPosterDetail />} />
          {/* Both listings share the tab switch and swipe between each other */}
          <Route element={<WorkLayout />}>
            <Route path="/projects"    element={<Projects />} />
            {/* The project opens as a sheet over the listing, so it's a child
                route: the listing stays mounted (and blurred) behind it. */}
            <Route path="/ui-ux"       element={<UxProjects />}>
              <Route path=":slug"      element={<KeyedUxProjectDetail />} />
            </Route>
            <Route path="/posters"     element={<Posters />} />
          </Route>
          <Route path="*"              element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
