import React from "react"
import styled from "styled-components"
import CardItem from "./CardItem"

export default function CardList({ data }) {
  return (
    <Wrapper>
      <CardContainer>
        {data?.map(({ id, category, image, title, price }) => {
          return <CardItem key={`${category}_${id}`} id={id} src={image} alt={category} title={title} price={price} />
        })}
      </CardContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CardContainer = styled.div`
  width: 94%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`
