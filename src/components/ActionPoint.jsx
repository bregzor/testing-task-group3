import React, { useState, useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Modal from "react-bootstrap/Modal"
import { UserContext } from "./../contexts/UserContextProvider"

export default function ActionPoint(props) {
  const {
    id,
    page,
    title,
    description,
    top,
    left,
    iconKind,
    linkKind,
    linkDocument,
    linkExternal,
    linkInternal,
  } = props

  const { me } = useContext(UserContext)

  const ActionPointLinkKind = {
    INTERNAL_PAGE: 0,
    EXTERNAL_PAGE: 1,
    MODAL: 2,
    DOCUMENT: 3,
  }

  const ActionPointIconKind = {
    NONE: 0,
    IMAGE: 1,
    VIDEO: 2,
    PAGE: 3,
    FILE: 4,
  }


  function getIconCSSClass() {
    let contentKind = ""
    if (iconKind === ActionPointIconKind.IMAGE) {
      contentKind = "image"
    }
    if (iconKind === ActionPointIconKind.VIDEO) {
      contentKind = "video"
    }
    if (iconKind === ActionPointIconKind.PAGE) {
      contentKind = "link"
    }
    if (iconKind === ActionPointIconKind.FILE) {
      contentKind = "document"
    }
    return `links__icon--${contentKind}`
  }

  function renderExternalLink() {
    return (
      <a
        style={{ top: `${top}%`, left: `${left}%` }}
        className={`external-link the__dot ${getIconCSSClass()}`}
        title={title}
        href={linkExternal}
        target="_blank"
      >{title}</a>
    )
  }

  function renderInternalLink() {
    return (
      <Link to={`/${me.event}`} as={linkInternal.getFrontendUrl}>
        <span
          style={{ top: `${top}%`, left: `${left}%` }}
          className={`internal-link the__dot ${getIconCSSClass()}`}
          title={linkInternal.title}
        >{title} visited by {me.username}</span>
      </Link>
    )
  }

  function renderModalLink() {
    return (
      <>
        <a
          style={{ top: `${top}%`, left: `${left}%` }}
          className={`modal-link the__dot ${getIconCSSClass()}`}
          title={title}
        >{title}</a>
      </>
    )
  }

  function renderDocumentLink() {
    return (
      <>
        <a
          style={{ top: `${top}%`, left: `${left}%` }}
          className={`document-link the__dot ${getIconCSSClass()}`}
          title={title}
          download
          target="_blank"
          href={`${linkDocument}`}
        >{title}</a>
      </>
    )
  }

  function renderActionPoint() {
    if (linkKind === ActionPointLinkKind.INTERNAL_PAGE && linkInternal) {
      return renderInternalLink()
    }
    if (linkKind === ActionPointLinkKind.EXTERNAL_PAGE) {
      return renderExternalLink()
    }
    if (linkKind === ActionPointLinkKind.MODAL) {
      return renderModalLink()
    }
    if (linkKind === ActionPointLinkKind.DOCUMENT) {
      return renderDocumentLink()
    }
    return null
  }
  return renderActionPoint()
}
