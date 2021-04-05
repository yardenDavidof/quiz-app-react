import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FetchButton from './FetchButton';


function FinalScreen() {
  const score = useSelector(state => state.score)

  const dispatch = useDispatch()

  const replay = () => {
    dispatch({
      type: 'SET_INDEX',
      index: 0
    })
  }

  const settings = () => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: []
    })
  }

  return (
    <div>
      <h3>Final Score: {score}</h3>
      <button onClick={replay}>Try again</button>
      <FetchButton text="Fetch new questions" />
      <button onClick={settings}>Back to settings</button>
    </div>
  );
}
export default FinalScreen;