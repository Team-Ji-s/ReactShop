import React, { useEffect, useState } from "react"
import styled from "styled-components"
import BreadCrumbs from "../components/BreadCrumbs"
import Badge from "../components/Badge"
import StarRate from "../components/StarRate"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { add } from "../redux/cart"
import { getList } from "../redux/setProduct"

export default function ProductPage() {
  const { id } = useParams()
  const [modal, setModal] = useState(false)
  const [cartProduct, setCartProduct] = useState({})
  const dispatch = useDispatch()
  const { count } = useSelector(({ cart }) => cart)
  const list = useSelector((state) => state.setProduct.value)

  useEffect(() => {
    dispatch(getList())
    const item = list.filter((item) => item.id.toString() === id)
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
    setModal(true)
  }

  const Modal = () => {
    return (
      <ModalWrapper>
        <ModalContent>장바구니에 담겼습니다.</ModalContent>
        <Button
          color={"green"}
          size={"small"}
          onClick={() => {
            setModal(!modal)
          }}
        >
          확인
        </Button>
      </ModalWrapper>
    )
  }

  return (
    <ProductPageWrapper>
      <BreadCrumbs from={cartProduct.category} to={cartProduct.title} />
      <ProductWrapper className="card lg:card-side bg-base-100 shadow-xl">
        <ImageWrapper className="px-10 pt-10">
          <Image src={cartProduct.image} alt="상품이미지" className="rounded-xl" />
        </ImageWrapper>
        <Contents className="card-body">
          <ProductTitle>
            <Title className="card-title">{cartProduct.title}</Title>
            <Badge type={"best"} size={"large"} />
          </ProductTitle>
          <Description>{cartProduct.description}</Description>
          <RateDiv>
            <StarRate rate={cartProduct.rating?.rate} />
            <Rate>
              {cartProduct.rating?.rate} / {cartProduct.rating?.count} 참여
            </Rate>
          </RateDiv>
          <Price>${cartProduct.price}</Price>
          <ButtonDiv>
            <Button className="btn btn-primary" onClick={addToCart}>
              장바구니에 담기
            </Button>
            {modal === true ? <Modal /> : null}
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
  height: 50rem;
  display: flex;
  flex-direction: column;
`

const ProductWrapper = styled.div`
  height: 45rem;
`

const ImageWrapper = styled.figure`
  margin: 0;
  padding: 0;
`

const Image = styled.img`
  width: 40rem;
  height: 40rem;
  background-color: white;
  object-fit: scale-down;
  display: inline-block;
  padding: 3rem;
  border-radius: 3rem;
  box-shadow: 2px 2px 2px 2px #ddd;
  margin-left: 2rem;
`

const Contents = styled.div`
  height: 40rem;
  margin: auto;
  padding: 3rem;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.5rem;
`
const ProductTitle = styled.span`
  display: flex;
  // flex-direction: row;
  align-items: center;
  // row-gap: 1rem;
  gap: 0.5rem;
  margin: 1rem 0;
`
const Title = styled.h2`
  display: inline-block;
  font-size: 2.5rem;
  margin-right: 1rem;
  line-height: 3rem;
`

const Description = styled.div`
  width: 100%;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.black};
  margin-bottom: 1rem;
`

const RateDiv = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const Rate = styled.span`
  height: 3rem;
  font-size: ${({ theme }) => theme.font.size.large};
  color: ${({ theme }) => theme.color.black};
  margin-left: 1rem;
  text-align: center;
  padding-top: 0.5rem;
  font-weight: 700;
`
const Price = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.color.black};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  margin-bottom: 2rem;
`

const ButtonDiv = styled.div`
  display: grid;
  width: 25rem;
  height: 4rem;
  grid-auto-flow: column;
  column-gap: 0.5rem;
`

const Button = styled.button`
  width: 12rem;
  height: 4rem;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0;
  color: white;
`

const ModalWrapper = styled.div`
  width: 20rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid #000000;
  border-radius: 0.5rem;
  z-index: 10;
  position: absolute;
  top: 15rem;
  left: 45%;
  display: grid;
  place-items: center;
  grid-auto-flow: row;
  row-gap: 0.25rem;
`

const ModalContent = styled.p`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  margin-bottom: 0;
`
