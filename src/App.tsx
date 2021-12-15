import React from 'react'
import BiasedDiamondRing from './components/BiasedDiamondRing'
import './scss/App.scss'
import GitHub from './components/GitHub'
import ReturnToHome from './components/ReturnToHome'

const App = () => (
  <div className="App">
    <ReturnToHome theme="light" />
    <GitHub theme="light" url="https://github.com/ts5h/biased_diamond_ring" />
    <BiasedDiamondRing />
  </div>
)

export default App
