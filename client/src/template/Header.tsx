import React from "react";
import {Link} from "react-router-dom";
import logo from "../logo.png";
import {IconButton} from "./IconButton";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type Button = {
  name: string
  icon: IconProp
  url: string
}

export function Header(props: {
  name: string
  url?: string
  searchBar?: {
    filter: (value: string) => void
  }
  buttons?: Button[]
}) {
  const {searchBar} = props;
  return (
    <div className="app-grid-header">
      <Logo/>
      <div className="float">
        <Heading name={props.name} url={props.url}/>
        {searchBar && searchBar.filter &&
        <input className="search" type="text" placeholder="Search..."
               onChange={(e) => searchBar.filter(e.target.value.toLowerCase())}/>
        }
      </div>
      {props.buttons && props.buttons.map((button, index) => <Button key={index} icon={button.icon} name={button.name} url={button.url}/>
      )}
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

function Button(props: {
  icon: IconProp,
  name: string,
  url: string
}) {
  const {icon, name, url} = props
  return (
    <Link to={url} className="no-link">
      <div className="icon">
        <IconButton icon={icon}>{name}</IconButton>
      </div>
    </Link>
  )
}
