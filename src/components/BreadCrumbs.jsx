import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

export default function BreadCrumbs({ from, to }) {
  let category = ""
  switch (from) {
    case "electronics":
      category = "디지털"
      break
    case "men's clothing":
    case "women's clothing":
      category = "패션"
      break
    case "jewelery":
      category = "악세서리"
      break
    default:
      category = "홈"
      break
  }
  return (
    <BreadCrumbsWrapper>
      {category}
      <Arrow icon={faAngleRight}></Arrow>
      {to}
    </BreadCrumbsWrapper>
  )
}

const BreadCrumbsWrapper = styled.span`
  font: "Roboto", sans-serif;
  height: ${({ theme }) => theme.height.small};
  font-size: ${({ theme }) => theme.font.size.large};
  color: ${({ theme }) => theme.color.black};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  display: inline-block;
  margin: 2rem;
`

const Arrow = styled(FontAwesomeIcon)`
  width: ${({ theme }) => theme.font.size.normal};
  height: ${({ theme }) => theme.font.size.normal};
  margin: 0 0.5rem 0 0.5rem;
`
