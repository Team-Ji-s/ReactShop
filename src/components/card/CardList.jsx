import React from "react"
import styled from "styled-components"
import CardItem from "./CardItem"

export default function CardList({ data }) {
  return (
    <CardContainer className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-1.5">
      {data?.map(({ id, category, image, title, price }) => {
        return <CardItem key={`${category}_${id}`} id={id} src={image} alt={category} title={title} price={price} />
      })}
    </CardContainer>
  )
}

const CardContainer = styled.div``
