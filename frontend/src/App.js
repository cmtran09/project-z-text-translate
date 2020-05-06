import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { Button, Checkbox, Form, Dropdown, Radio, Grid, Segment } from 'semantic-ui-react'

import './styles/styles.scss'

const App = () => {

  const [requestData, setRequestData] = useState({})
  const [languages, setLanguages] = useState()
  const [error, setError] = useState()
  const [sentMessages, setSentMessages] = useState([])
  const options = []

  useEffect(() => {
    const key = 'trnsl.1.1.20200430T193714Z.38528beeb497af85.ccc8582dffab7fb59f5232f80c022fe83f128e44'
    axios.get(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=${key}`)
      .then(resp => setLanguages(resp.data))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/text', requestData)
      .then((response) => {
        setSentMessages(sentMessages => [...sentMessages, response.data])
        console.log(response.data)
      })
      .catch(err => {
        setError({ errors: err.response })
        console.log(error)
      })
  }

  function handleChange(e, data) {
    setRequestData({ ...requestData, [data.name]: data.value })
    setError()
  }

  if (languages) {
    const languagesList = languages.dirs.filter(language => language.startsWith('en'))

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
      <p className='cmtran09head'>
        Project Z - Text Translate
      </p>

      <div className='main-app'>
        <Grid columns={sentMessages.length < 1 ? 1 : 2} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>
                <Form onSubmit={e => handleSubmit(e)} >
                  <Form.Input
                    placeholder='Enter Phone Number'
                    name='number'
                    onChange={handleChange}
                    label='Phone Number'
                    error={error && { content: 'Please enter a valid UK phone number including +44', pointing: 'below' }}

                  />
                  <Form.Input
                    placeholder='Enter Your Message'
                    name='message'
                    onChange={handleChange}
                    label='Message'
                  />
                  <Dropdown onChange={handleChange} name='language' placeholder='Select Language' options={options} selection />
                  <Button type='submit'>Submit</Button>
                </Form>
              </Segment>
            </Grid.Column>
            {sentMessages.length > 0 &&
              <Grid.Column>
                {sentMessages.map((message, i) => {
                  return (
                    <Segment key={i}>
                      <p>Sent at: {message.time_sent}</p>
                      <p>Translated message sent: {message.sent_message.slice(38, message.sent_message.length)}</p>
                    </Segment>
                  )
                })}
              </Grid.Column>
            }
          </Grid.Row>
        </Grid>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)