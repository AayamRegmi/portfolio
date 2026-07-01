import './App.css'
import { WindowProvider } from './components/WindowManager'
import Navbar from './components/navbar'
import Desktop from './components/Desktop'
import BotNav from './components/BotNav'

function App() {
  return (
    <WindowProvider>
      <Navbar />
      <Desktop />
      <BotNav />
    </WindowProvider>
  )
}

export default App
