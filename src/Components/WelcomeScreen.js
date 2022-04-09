import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

function WelcomeScreen() {
  const questionIndex = useSelector((state) => state.index)

  const dispatch = useDispatch()

  const setLoading = (value) => {
    dispatch({
      type: 'CHANGE_LOADING',
      loading: value,
    })
  }

  const setQuestions = (value) => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: value,
    })
  }

  const handleQuery = async () => {
    let apiUrl = `https://opentdb.com/api.php?amount=100`

    setLoading(true)

    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setQuestions(response.results)
        setLoading(false)
      })

    if (questionIndex > 0) {
      dispatch({
        type: 'SET_INDEX',
        index: 0,
      })

      dispatch({
        type: 'SET_SCORE',
        score: 0,
      })
    }
  }

  return (
  <div>
    <h1>Welcome to Quiz App</h1>
    <button onClick={handleQuery}>Start</button>
  </div>
  )
}
export default WelcomeScreen
