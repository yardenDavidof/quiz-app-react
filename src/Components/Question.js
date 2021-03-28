import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const decodeHTML = function (html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

function Question() {
  const [answerSelected, setAnswerSelected] = useState(false)
  const [answerCorrect, setAnswerCorrect] = useState(null)

  const score = useSelector(state => state.score)

  const questions = useSelector(state => state.questions)
  const questionIndex = useSelector(state => state.index)

  const dispatch = useDispatch()

  const question = questions[questionIndex]
  const answer = question.correct_answer

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let options = [...question.incorrect_answers];
  options.splice(getRandomInt(options.length), 0, question.correct_answer)

  const handleListItemClick = event => {
    setAnswerSelected(true)

    if (event.target.textContent === answer) {
      setAnswerCorrect(true)

      dispatch({
        type: 'SET_SCORE',
        score: score + 1
      })
    } else {
      setAnswerCorrect(false)
    }

    setTimeout(() => {
      dispatch({
        type: 'SET_INDEX',
        index: questionIndex + 1
      })

      setAnswerSelected(false)
      setAnswerCorrect(null)
    }, 1000)
  }

  /*
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "easy",
      "question": "Peter Molyneux was the founder of Bullfrog Productions.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    }
  */

  if (!answerSelected) {
    return (
      <div>
        <p>Question {questionIndex + 1}</p>
        <h3>{decodeHTML(question.question)}</h3>
        <ul>
          {options.map((option, i) => <li key={i} onClick={handleListItemClick}>{decodeHTML(option)}</li>)}
        </ul>
        <div>Score: {score} / {questionIndex}</div>
      </div>
    )
  } else if (answerCorrect) {
    return (
      <div>
        Correct
      </div>
    )
  } else if (!answerCorrect) {
    return (
      <div>
        Incorrect
      </div>
    )
  }
}
export default Question;