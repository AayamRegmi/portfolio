import { lazy, Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Navbar = lazy(()=> import('./components/navbar'))
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))

function App() {

  return (
    <>
      <body>
      <Suspense> <Navbar/> </Suspense>
      <Suspense> <About/> </Suspense>
      <Suspense> <Skills/> </Suspense>
      </body>
    </>
  )
}

export default App;
