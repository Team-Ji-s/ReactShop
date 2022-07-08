import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

export default function StarRating(props) {
  const ratingFull = parseInt(props.rate)
  const ratingHalf = parseFloat(props.rate - ratingFull).toFixed(1) >= 0.5 ? 0.5 : 0
  const ratingEmpty = ratingHalf === 0.5 ? 4 - ratingFull : 5 - ratingFull

  const starArray = []

  for (let i = 0; i < ratingFull; i++) {
    starArray.push({ name: "orange", image: faStar, id: (i + 1) * 10 + (i + 1) })
  }

  if (ratingHalf === 0.5) {
    starArray.push({ name: "orange", image: faStarHalfStroke, id: "999" })
  }

  for (let i = 0; i < ratingEmpty; i++) {
    starArray.push({ name: "grey", image: faStar, id: (i + 1) * 100 + (i + 1) })
  }

  const stars = starArray.map((star) => <StarIcon key={star.id} color={star.name} icon={star.image}></StarIcon>)

  return <StarRatingWrapper>{stars}</StarRatingWrapper>
}

const StarRatingWrapper = styled.div`
  max-width: 15rem;
  max-height: 3rem;
  display: inline-block;
`

const StarIcon = styled(FontAwesomeIcon)`
  min-width: 2rem;
  min-height: 2rem;
  color: ${(props) => props.color};
`
