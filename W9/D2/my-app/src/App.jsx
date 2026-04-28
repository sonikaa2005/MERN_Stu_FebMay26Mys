import { useState } from 'react'

import './App.css'
import { FunctionName } from './components/FunctionalCompOne.jsx'
import { FunctionalComponentsBasics } from './components/FunctionalComponentsBasics.jsx'
import { ClasscomponentsBasics } from './components/ClassComponentsBasics.jsx'
import {FunctionComp} from './components/FunctionalComponentsAdv.jsx'
function App() {

  return (
    //Fragment in react : </> (parent tag)
    <>
      {/* <FunctionName /> Component Name */}
      {/* <FunctionalComponentsBasics/> */}
      {/* <ClasscomponentsBasics/> */}
      <FunctionComp/>
    </>
  )
}

export default App
