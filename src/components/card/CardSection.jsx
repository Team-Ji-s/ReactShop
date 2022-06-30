import React from "react"
import styled from "styled-components"
import CardList from "./CardList"

export default function CardSection({ title, data }) {
  return (
    <CategorySection>
      <SectionTitle>{title}</SectionTitle>
      <CardList data={data} />
    </CategorySection>
  )
}

const CategorySection = styled.div`
  margin: 0 auto 3rem;
  padding-top: 3rem;
`

const SectionTitle = styled.h1`
  margin: 0;
  text-align: center;
  display: block;
  margin-bottom: 3rem;
  font-weight: 600;
  font-size: 2rem;
`
