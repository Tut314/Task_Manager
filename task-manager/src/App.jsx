import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log(`Card ${title} has been ${hasLiked ? "liked" : "unliked"}`);
  }, [hasLiked]);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

  },[]);

  return (
    <div className = "card" onClick={()=>setCount((prevState)=>prevState+1)}>
      <h2>{title} <br/> {count}</h2>

      <button onClick={() => setHasLiked((prevState)=>(!prevState))}>
        {hasLiked ? "💗" : "🤍"}
        </button>
    </div>
  )
}


const App = () => {


  return (
  <div className = "card-container">
    
    <Card title = "star"/>
    <Card title = "ava"/>
    <Card title = "eef"/>


  </div>
  )
}




export default App
