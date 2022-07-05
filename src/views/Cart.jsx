import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
// import Button from "../components/Button"
import CartModal from "../components/CartModal"
import { Link } from "react-router-dom"
import { increase, decrease, remove, removeAll } from "../redux/cart"

export default function Cart() {
  const [purchaseList, setPurchaseList] = useState({ itemList: [], totalPrice: 0, modalVisible: false })
  const [cartProducts, setCartProducts] = useState([])
  const products = useSelector(({ cart }) => cart.products)
  const dispatch = useDispatch()
  useEffect(() => {
    setCartProducts(() => [...products])
  }, [products])

  const handleCheckBox = ({ target }) => {
    const allCheck = document.querySelector("#allCheck")
    const productChecks = document.querySelectorAll(".productChecks")

    if (target.id === "allCheck") {
      if (target.checked) {
        productChecks.forEach((checkbox) => (checkbox.checked = true))
      } else {
        productChecks.forEach((checkbox) => (checkbox.checked = false))
      }
    } else {
      if (allCheck.checked === true && target.checked === false) {
        allCheck.checked = false
      }
    }
  }

  const handlePurchase = ({ target }) => {
    const productChecks = document.querySelectorAll(".productChecks")

    if (target.id === "immediatePurchase") {
      const item = cartProducts.filter((productInfo) => productInfo.id.toString() === target.dataset.id)
      const totalPrice = item[0]?.cartCount * item[0]?.price
      setPurchaseList(() => ({ itemList: [...item], totalPrice: totalPrice, modalVisible: true }))
    }

    if (target.id === "partialPurchase") {
      const partialChecks = [...productChecks].filter(({ checked }) => checked === true).map(({ value }) => value)
      if (!partialChecks.length) {
        alert("선택한 상품이 없습니다")
        return
      }
      const partialPurchaseList = cartProducts.filter(({ id }) => partialChecks.includes(id.toString()))
      const totalPrice = partialPurchaseList.reduce((totalItem, curItem) => {
        return totalItem + curItem?.cartCount * curItem?.price
      }, 0)
      setPurchaseList(() => {
        return { itemList: [...partialPurchaseList], totalPrice: totalPrice, modalVisible: true }
      })
    }
  }

  return (
    <Wrapper>
      {cartProducts.length ? (
        <CartWrapper>
          <AllProductsCheck>
            <AllProductsCheckLabel htmlFor="allCheck">전체 상품 체크</AllProductsCheckLabel>
            <AllProductsCheckInput
              type="checkbox"
              id="allCheck"
              className="checkbox checkbox-primary"
              value="all"
              onChange={handleCheckBox}
            />
          </AllProductsCheck>
          <CartList>
            <ItemWrapper>
              {cartProducts?.map(({ category, id, image, title, price, cartCount }, idx) => {
                return (
                  <CartItemContainer className="card w-full bg-base-100 shadow-xl" key={category + idx}>
                    <ItemCheck>
                      <input
                        type="checkbox"
                        className="productChecks checkbox checkbox-lg checkbox-primary"
                        id={category + id}
                        value={id}
                        onChange={handleCheckBox}
                      />
                    </ItemCheck>
                    <Link to={`/product/${id}`}>
                      <ContentsContainer>
                        <ProductImageWrapper className="px-10">
                          <ProductImage src={image} alt={category} className="rounded-xl" />
                        </ProductImageWrapper>
                        <ProductDescription className="card-body">
                          <ProductName className="card-title">{title}</ProductName>
                          <ProductPrice>${price}</ProductPrice>
                        </ProductDescription>
                      </ContentsContainer>
                    </Link>
                    <ItemButtonWrapper>
                      <Button data-id={id} className="btn btn-primary" id="immediatePurchase" onClick={handlePurchase}>
                        구매하기
                      </Button>
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          if (confirm(`${title}을 삭제하시겠습니까?`)) {
                            dispatch(remove({ id }))
                          }
                          return
                        }}
                      >
                        삭제하기
                      </Button>
                      <ItemQuantityWrapper>
                        <Button
                          className="btn btn-square"
                          onClick={() => {
                            if (cartCount === 1) {
                              alert("최소 수량 1입니다.")
                              return
                            } else {
                              dispatch(decrease({ id }))
                            }
                          }}
                        >
                          -
                        </Button>
                        <ItemQuantity>{cartCount}</ItemQuantity>
                        <Button
                          className="btn btn-square"
                          onClick={() => {
                            dispatch(increase({ id }))
                          }}
                        >
                          +
                        </Button>
                      </ItemQuantityWrapper>
                    </ItemButtonWrapper>
                  </CartItemContainer>
                )
              })}
            </ItemWrapper>
          </CartList>
          <CartListButtonWrapper>
            <Button className="btn btn-lg btn-secondary" id="partialPurchase" onClick={handlePurchase}>
              선택 상품 구매하기
            </Button>
            <Button
              className="btn btn-lg btn-primary"
              id="allPurchase"
              onClick={() => {
                dispatch(removeAll())
              }}
            >
              전체 상품 삭제하기
            </Button>
          </CartListButtonWrapper>
          <CartModal title="Receipt" state={purchaseList} setState={setPurchaseList} />
        </CartWrapper>
      ) : (
        <NoProductsWrapper>
          <NoProductInfo>장바구니에 담긴 상품이 없습니다.</NoProductInfo>
          <Link to={"/"}>
            <Button>쇼핑하러가기</Button>
          </Link>
        </NoProductsWrapper>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 3rem;
  width: 90vw;
`
const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5rem;
`
const AllProductsCheck = styled.div`
  width: 13rem;
  height: 2rem;
`
const AllProductsCheckLabel = styled.label`
  font-size: ${({ theme }) => theme.font.size.normal};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  position: relative;
  top: -1.5px;
  padding-bottom: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.grey};
  }
`

const AllProductsCheckInput = styled.input`
  position: relative;
  top: 1.5px;
`

const CartList = styled.div`
  margin: 2rem 0;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CartItemContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const ContentsContainer = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  align-items: center;
`
const ProductImageWrapper = styled.div`
  display: flex;
  height: 20rem;
  width: 30rem;
  justify-content: center;
  align-items: center;
  margin-top: 0;
`
const ItemCheck = styled.div`
  width: 10rem;
  text-align: center;
`
const ProductImage = styled.img`
  object-fit: scale-down;
  height: 60%;
  width: 60%;
  &:hover {
    height: 80%;
    width: 80%;
  }
`
const ProductDescription = styled.div`
  width: 30rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ProductName = styled.h2`
  font-size: 1.7rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 2rem;
  line-height: 2.2rem;
`
const ProductPrice = styled.span`
  font-size: 1.7rem;
  font-weight: 700;
`
const ItemButtonWrapper = styled.div`
  height: 20rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`
const ItemQuantityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ItemQuantity = styled.span`
  width: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
`
const CartListButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
`

const NoProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 20rem;
`
const NoProductInfo = styled.span`
  margin: 2rem;
  font-size: 1.6rem;
`

const Button = styled.button`
  color: ${({ theme }) => theme.color.white};
  font-size: 1.1rem;
`
