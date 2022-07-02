import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

export default function CardItem({ id, src, alt, title, price }) {
  return (
    <Link to={`/product/${id}`}>
      <ProductContainer className="card grow w-96 bg-base-100 shadow-xl">
        <ImageWrapper className="px-10 pt-10">
          <ProductImage src={src} alt={alt} className="rounded-xl" />
        </ImageWrapper>
        <ProductDescription className="card-body items-center text-center">
          <Title className="card-title">{title}</Title>
          <h2 className="card-title">${price}</h2>
        </ProductDescription>
      </ProductContainer>
    </Link>
  )
}

const ProductContainer = styled.div`
  margin: 0.5rem;
  height: 30rem;
`

const ImageWrapper = styled.figure`
  height: 65%;
  width: 100%;
`

const ProductImage = styled.img`
  height: 70%;
  width: 70%;
  object-fit: scale-down;
  &:hover {
    height: 90%;
    width: 90%;
  }
`

const ProductDescription = styled.div`
  height: 30%;
  width: 100%;
`

const Title = styled.h2`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
