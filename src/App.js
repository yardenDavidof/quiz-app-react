import { useSelector } from 'react-redux'

import Question from './Components/Question'
import FinalScreen from './Components/FinalScreen'
import WelcomeScreen from "./Components/WelcomeScreen";
import './App.css'

function App() {
  const questions = useSelector((state) => state.questions)
  const questionIndex = useSelector((state) => state.index)
  const isDone = useSelector((state) => state.isDone)

  let component
  if (isDone){
    component = <FinalScreen />
  } else if (questions.length && questionIndex + 1 <= questions.length) {
    component = <Question />
  } else {
    component = <WelcomeScreen />
  }

  return (
    <div className="App">
      <div className="app-container">{component}</div>
    </div>
  )
}

export default App
