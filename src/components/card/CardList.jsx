import React from "react"
import styled from "styled-components"
import CardItem from "./CardItem"

export default function CardList({ data }) {
  return (
    <CardContainer>
      {data?.map(({ id, category, image, title, price }) => {
        return <CardItem key={`${category}_${id}`} id={id} src={image} alt={category} title={title} price={price} />
      })}
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
`
