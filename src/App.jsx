import { lazy, Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Navbar = lazy(()=> import('./components/navbar'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const BotNav = lazy(() => import('./components/BotNav'))

function App() {

  return (
    <>
      <body>
      <Suspense fallback={<div>Loading...</div>}> <Navbar/> </Suspense>
      <Suspense fallback={<div>Loading...</div>}> <About/> </Suspense>
      <Suspense fallback={<div>Loading...</div>}> <Projects/> </Suspense>
      <Suspense fallback={<div>Loading...</div>}> <Skills/> </Suspense>
      <Suspense fallback={<div>Loading...</div>}> <BotNav/> </Suspense>
      </body>
    </>
  )
}

export default App;
