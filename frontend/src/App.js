import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

import { Button, Checkbox, Form, Dropdown, Radio } from 'semantic-ui-react'

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
    console.log("name", e.target.name)
    console.log("val", e.target.value)
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

  const options = []

  // parse for option list
  languagesList.map((elem, i) => {
    options.push({
      key: i,
      text: elem.slice(-2).toUpperCase(),
      value: elem.slice(-2),
      name: 'language'
    })
  })

  if (options[3]) {
    options[3].disabled = true
  }

  console.log(options)

  const [value, setValue] = useState({
    radioGroup: "null",
    test: 123
  })


  function handle(e, data) {
    // setData({ ...data, [e.target.name]: e.target.value })
    setValue({ ...value, [data.name]: data.value })
    // console.log("name", data.name)
    // console.log("val", data.value)
    console.log(value)
    // setValue(value)
    console.log(value)
  }

  return (
    <div className="main-app">
      <button onClick={e => console.log(value)}>check</button>

      <Form>
        <Form.Input
          placeholder='Enter Phone Number Including +44'
          name='number'
          onChange={handle}
          label="Phone Number"
        />
        <Form.Input
          placeholder='Enter Your Message'
          name='message'
          onChange={handle}
          label="Message"
        />
        <Dropdown onChange={handle} name='language' placeholder='select language' options={options} selection />
      </Form>

      <p className="cmtran09head">
        Project Z - Text Translate
      </p>
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

        <Dropdown onChange={handle} name='language' placeholder='select language' options={options} selection />

        <button>submit</button>
      </form>
      <button onClick={e => console.log(data)}>log</button>
      <button onClick={e => console.log(languages)}>languages</button>
      <button onClick={e => console.log(languagesList)}>languages</button>
      <button onClick={e => console.log(error)}>er</button>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)