import React, { useEffect, useState } from "react"
import styled from "styled-components"
import BreadCrumbs from "../components/BreadCrumbs"
import Badge from "../components/Badge"
import StarRate from "../components/StarRate"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { add } from "../redux/cart"
import Modal from "../components/ProductModal"

export default function ProductPage() {
  const { id } = useParams()
  const [modal, setModal] = useState(false)
  const [cartProduct, setCartProduct] = useState({})
  const dispatch = useDispatch()
  const { count } = useSelector(({ cart }) => cart)
  const list = useSelector((state) => state.setProduct.products)

  useEffect(() => {
    const item = list?.filter((item) => item.id.toString() === id)
    setCartProduct(() => ({
      ...item[0],
      rating: { ...item[0].rating, rate: parseFloat(item[0].rating.rate).toFixed(1) }
    }))
  }, [id])

  const addToCart = () => {
    dispatch(
      add({
        products: { ...cartProduct, cartCount: 1 },
        count: count + 1
      })
    )
    setModal((open) => !open)
  }

  return (
    <ProductPageWrapper>
      <BreadCrumbs from={cartProduct.category} to={cartProduct.title} />
      {modal === true ? <Modal showModal={modal} setShowModal={setModal} /> : null}
      <ProductWrapper className="card w-10/12 sm:w-3/4 lg:card-side bg-base-100 shadow-xl">
        <Image src={cartProduct.image} alt="상품이미지" className="w-2/5 max-w-xl" />
        <Contents className="card-body lg:w-8/12">
          <ProductTitle>
            <Title className="card-title leading-7 lg:text-4xl md:text-3xl text-2xl">{cartProduct.title}</Title>
            <Badge type="best" />
          </ProductTitle>
          <Description className="lg:text-2xl md:text-xl text-lg">{cartProduct.description}</Description>
          <RateDiv>
            <StarRate rate={cartProduct.rating?.rate} />
            <Rate className="lg:text-2xl md:text-xl text-lg">
              {cartProduct.rating?.rate} / {cartProduct.rating?.count} 참여
            </Rate>
          </RateDiv>
          <Price className="lg:text-4xl md:text-3xl text-2xl">${cartProduct.price}</Price>
          <ButtonDiv className="flex justify-center lg:justify-start">
            <Button className="btn btn-primary mr-16" onClick={addToCart}>
              장바구니에 담기
            </Button>
            <Link to={"/myCart"}>
              <Button className="btn btn-secondary">장바구니로 이동</Button>
            </Link>
          </ButtonDiv>
        </Contents>
      </ProductWrapper>
    </ProductPageWrapper>
  )
}

const ProductPageWrapper = styled.div`
  display: flex;
  padding: 0 0 5rem;
  flex-direction: column;
  position: relative;
  min-width: 50rem;
`

const ProductWrapper = styled.div`
  margin: 5rem auto 0;
`

const Image = styled.img`
  max-width: 30rem;
  max-height: 30rem;
  object-fit: scale-down;
  display: inline-block;
  padding: 3rem;
  margin: auto;
`
const Contents = styled.div`
  margin: auto;
  padding: 3rem;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.5rem;
`
const ProductTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`
const Title = styled.h2`
  display: inline-block;
  margin-right: 1rem;
`

const Description = styled.div`
  color: ${({ theme }) => theme.color.black};
  margin-bottom: 1rem;
`

const RateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`

const Rate = styled.span`
  color: ${({ theme }) => theme.color.black};
  margin-left: 1rem;
  font-weight: 700;
`
const Price = styled.div`
  color: ${({ theme }) => theme.color.black};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  margin-bottom: 2rem;
`

const ButtonDiv = styled.div``

const Button = styled.button`
  width: 12rem;
  height: 4rem;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0;
  color: white;
`
