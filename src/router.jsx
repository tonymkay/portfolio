import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import PageWrapper from './components/layout/PageWrapper/PageWrapper'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Projects from './pages/Projects/Projects'
import Process from './pages/Process/Process'
import Contact from './pages/Contact/Contact'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'
import NotFound from './pages/NotFound/NotFound'
import UxProjects from './pages/UxProjects/UxProjects'
import UxProjectDetail from './pages/UxProjectDetail/UxProjectDetail'

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

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/"              element={<Home />} />
          <Route path="/about"         element={<About />} />
          <Route path="/projects"      element={<Projects />} />
          <Route path="/process"       element={<Process />} />
          <Route path="/contact"       element={<Contact />} />
          <Route path="/projects/:slug" element={<KeyedProjectDetail />} />
          <Route path="/ui-ux"         element={<UxProjects />} />
          <Route path="/ui-ux/:slug"    element={<KeyedUxProjectDetail />} />
          <Route path="*"              element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
