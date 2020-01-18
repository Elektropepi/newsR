import React from "react";
import {Link} from "react-router-dom";
import logo from "../logo.png";

export function Header(props: {
  name: string
  url?: string
  searchBar: {
    filter: (value: string) => void
  }
  buttons?: {
    name: string
    icon: string
    onPress: () => void
  }[]
}) {
  return (
    <div className="app-grid-header">
      <Logo/>
      <div>
        <Heading name={props.name} url={props.url}/>
        <input className="search" type="text" placeholder="Search..."
               onChange={(e) => props.searchBar.filter(e.target.value.toLowerCase())}/>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <div className="float">
      <Link className="no-link" to={'/'}>
        <img src={logo} alt="Logo"/>
      </Link>
    </div>
  )
}

function Heading(props: {
  url?: string
  name: string
}) {

    if (props.url) {
      return (
        <Link className="no-link" to={`${props.url}`}>
          <h2>{props.name}</h2>
        </Link>
      )
    }

  return (
    <h2>{props.name}</h2>
  )
}