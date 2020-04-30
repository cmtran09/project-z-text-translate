import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

import "./styles/styles.scss"

import "@babel/polyfill"

const App = () => {

  const [data, setData] = useState({
    message: "",
    language: "",
    number: "",
    test: "beans"
  })
  const [languages, setLanguages] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    const key = 'trnsl.1.1.20191202T095947Z.54175132da211fc1.7560318e65d14be6fcc297876ea8f7cb07e89154'
    axios.get(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${key}`)
      .then(resp => setLanguages(resp.data.dirs))
  }, [])

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post("/api/text", data)
      .then(res => console.log(res))
      .catch(err => {
        setError(err)
        console.log("eror")
      })
  }


  const languagesList = languages.filter(language => language.startsWith('uk'))

  return (
    <div className="">
      <h1>Hello mate</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="message">message</label>
        <input name="message" onChange={e => handleChange(e)} type="text" />
        <label htmlFor="number">number</label>
        <input name="number" onChange={e => handleChange(e)} type="text" />
        <select name='language' onChange={e => handleChange(e)}>
          <option>Select language</option>
          {languagesList.map((elem, id) => {
            return (
              <option key={id} value={elem.slice(-2)} >
                {elem.slice(-2)}
              </option>
            )
          })}
        </select>
        <button>submit</button>
      </form>
      <button onClick={e => console.log(data)}>log</button>
      <button onClick={e => console.log(languages)}>languages</button>
      <button onClick={e => console.log(languagesList)}>languages</button>
      <button onClick={e => console.log(error)}>er</button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)