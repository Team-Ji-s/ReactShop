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
          <h2 className="card-title">{title}</h2>
          <h2 className="card-title">${price}</h2>
        </ProductDescription>
      </ProductContainer>
    </Link>

    // <Link to={`/product/${id}`}>
    //   <Container>
    //     <ImageWrapper>
    //       <ProductImage src={src} alt={alt} />
    //     </ImageWrapper>
    //     <ProductDescription>
    //       <ProductName>{title}</ProductName>
    //       <ProductPrice>${price}</ProductPrice>
    //     </ProductDescription>
    //   </Container>
    // </Link>
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

// const Container = styled.article`
//   margin: 1rem 1rem;
//   display: flex;
//   width: 30rem;
//   height: 30rem;
//   flex-direction: column;
//   align-items: center;
//   border: 1px solid #eee;
//   border-radius: 1.5rem;
// `
// const ImageWrapper = styled.figure`
//   display: flex;
//   height: 70%;
//   width: 100%;
//   justify-content: center;
//   align-items: center;
// `

// const ProductImage = styled.img`
//   height: 50%;
//   width: 50%;
//   &:hover {
//     height: 70%;
//     width: 70%;
//   }
// `
// const ProductDescription = styled.figure`
//   display: flex;
//   flex-direction: column;
//   height: 30%;
//   width: 100%;
//   justify-content: center;
//   align-items: flex-start;
// `
// const ProductName = styled.h3`
//   padding: 0 2rem;
// `
// const ProductPrice = styled.p`
//   padding: 0 2rem;
// `
