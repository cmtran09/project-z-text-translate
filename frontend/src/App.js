import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { Button, Checkbox, Form, Dropdown, Radio } from 'semantic-ui-react'

import './styles/styles.scss'

const App = () => {

  const [requestData, setRequestData] = useState({})
  const [languages, setLanguages] = useState()
  const [error, setError] = useState()
  const options = []

  useEffect(() => {
    const key = 'trnsl.1.1.20200430T193714Z.38528beeb497af85.ccc8582dffab7fb59f5232f80c022fe83f128e44'
    axios.get(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=${key}`)
      .then(resp => setLanguages(resp.data))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/text', requestData)
      .then(() => console.log('SMS successfully sent'))
      .catch(err => {
        setError({ errors: err.response })
        console.log(error)
      })
  }

  function handleChange(e, data) {
    setRequestData({ ...requestData, [data.name]: data.value })
    console.log(requestData)
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
  }

  return (
    <div>
      <Form onSubmit={e => handleSubmit(e)} >
        <Form.Input
          placeholder='Enter Phone Number Including +44'
          name='number'
          onChange={handleChange}
          label="Phone Number"
        />
        <Form.Input
          placeholder='Enter yYour Message'
          name='message'
          onChange={handleChange}
          label="Message"
        />
        <Dropdown onChange={handleChange} name='language' placeholder='select language' options={options} selection />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)