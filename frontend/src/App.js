import React, { useState } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

import "./styles/styles.scss"

import "@babel/polyfill"

const App = () => {

  const [text, setText] = useState()
  const [error, setError] = useState()

  function handleChange(e) {
    setText(e.target.value)
    console.log(text)
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.get("http://localhost:5000/api/books")
      .then(res => console.log(res))
      .catch(err => setError(err))
  }

  return (
    <div className="">
      <h1>Hello mate</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input onChange={handleChange} type="text" />
        <button >submit</button>
      </form>
      <button onClick={e => console.log(text)}>log</button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)