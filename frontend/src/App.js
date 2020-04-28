import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import "./styles/styles.scss"

import "@babel/polyfill"

import Home from "./components/Home/Home"

const App = () => (
  <BrowserRouter>
    <Home exact path="/" />
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById("root")
)