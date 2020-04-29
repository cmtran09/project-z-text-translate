import React, { useState } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

import "./styles/styles.scss"

import "@babel/polyfill"

const App = () => {

  const [data, setData] = useState({
    message: "",
    test: "beans"
  })
  const [error, setError] = useState()

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post("/api/text", data)
      .then(res => console.log(res))
      .catch(err => setError(err))
  }

  return (
    <div className="">
      <h1>Hello mate</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input name="message" onChange={handleChange} type="text" />
        <button>submit</button>
      </form>
      <button onClick={e => console.log(data)}>log</button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)