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
  const [languages, setLanguages] = useState()
  const [error, setError] = useState()

  const options = []

  useEffect(() => {
    const key = 'trnsl.1.1.20200430T193714Z.38528beeb497af85.ccc8582dffab7fb59f5232f80c022fe83f128e44'
    axios.get(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=${key}`)
      .then(resp => setLanguages(resp.data))
  }, [])

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(value)
    axios.post("/api/text", value)
      .then(res => console.log(res))
      .catch(err => {
        setError(err)
        console.log("eror")
      })
  }

  if (languages) {
    console.log(languages)
    console.log("dirs", languages.dirs[0])
    const languagesList = languages.dirs.filter(language => language.startsWith('en'))
    console.log("languagesList", languagesList)

    // parse for option list
    languagesList.map((elem, i) => {
      const abrev = elem => elem.slice(-2)
      options.push({
        key: i,
        // matches language abrev to full name :)
        text: `${abrev(elem).toUpperCase()} - ${languages.langs[abrev(elem)]}`,
        value: elem.slice(-2),
        name: 'language'
      })
    })
    // const languagesList = languages.filter(language => language.startsWith('en'))
  }


  // const languagesList = languages.filter(language => language.startsWith('en'))

  // const options = []

  // // parse for option list
  // languagesList.map((elem, i) => {
  //   options.push({
  //     key: i,
  //     text: elem.slice(-2).toUpperCase(),
  //     value: elem.slice(-2),
  //     name: 'language'
  //   })
  // })

  // if (options[3]) {
  //   options[3].disabled = true
  // }

  // console.log(options)

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

      <Form onSubmit={e => handleSubmit(e)} >
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
        <Button type='submit'>Submit</Button>
      </Form>

      <p className="cmtran09head">
        Project Z - Text Translate
      </p>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="message">message</label>
        <input name="message" onChange={e => handleChange(e)} type="text" />
        <label htmlFor="number">number</label>
        <input name="number" onChange={e => handleChange(e)} type="text" />

        {/* <select name='language' onChange={e => handleChange(e)}>
          <option>Select language</option>
          {languagesList.map((elem, id) => {
            return (
              <option key={id} value={elem.slice(-2)} >
                {elem.slice(-2)}
              </option>
            )
          })}
        </select> */}

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