import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import Modal from "../components/CartModal"
import { Link } from "react-router-dom"
import { increase, decrease, removeAll } from "../redux/cart"
import Alert from "../components/Alert"
import Confirm from "../components/Confirm"

export default function Cart() {
  const [purchaseList, setPurchaseList] = useState({ itemList: [], totalPrice: 0 })
  const [cartProducts, setCartProducts] = useState([])
  const [modal, setModal] = useState(false)
  const [alert, setAlert] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [minAlert, setMinAlert] = useState(false)
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
      setPurchaseList(() => ({ itemList: [...item], totalPrice: totalPrice }))
      setModal((open) => !open)
    }

    if (target.id === "partialPurchase") {
      const partialChecks = [...productChecks].filter(({ checked }) => checked === true).map(({ value }) => value)
      if (!partialChecks.length) {
        setAlert((open) => !open)
        return
      }
      const partialPurchaseList = cartProducts.filter(({ id }) => partialChecks.includes(id.toString()))
      const totalPrice = partialPurchaseList.reduce((totalItem, curItem) => {
        return totalItem + curItem?.cartCount * curItem?.price
      }, 0)
      setPurchaseList(() => {
        return { itemList: [...partialPurchaseList], totalPrice: totalPrice }
      })
      setModal((open) => !open)
    }
  }

  return (
    <Wrapper>
      {modal === true ? (
        <Modal title="Receipt" purchaseList={purchaseList} showModal={modal} setShowModal={setModal} />
      ) : null}
      {alert === true ? <Alert setState={setAlert} state={alert} message="선택한 상품이 없습니다." /> : null}
      {minAlert === true ? <Alert setState={setMinAlert} state={minAlert} message="최소 수량 1입니다." /> : null}
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
                  <div className="card sm:card-side my-4 bg-base-100 shadow-xl flex min-w-fit" key={category + idx}>
                    <div className="basis-1/12 flex sm:items-center sm:justify-center m-0.5">
                      <input
                        type="checkbox"
                        className="productChecks checkbox checkbox-lg checkbox-primary"
                        id={category + id}
                        value={id}
                        onChange={handleCheckBox}
                      />
                    </div>
                    <Link to={`/product/${id}`} className="flex basis-9/12">
                      <div className="flex w-full sm:flex-row flex-col items-center">
                        <div className="basis-2/5">
                          <img src={image} alt={category} className="w-full max-h-64 object-scale-down rounded-xl" />
                        </div>
                        <ProductDescription className="basis-3/5 card-body">
                          <ProductName className="card-title text-center sm:text-start">{title}</ProductName>
                          <ProductPrice className="text-center sm:text-start">${price}</ProductPrice>
                        </ProductDescription>
                      </div>
                    </Link>
                    {deleteAlert === true ? (
                      <Confirm setState={setDeleteAlert} state={deleteAlert} itemId={id} title={title} />
                    ) : null}
                    <div className="basis-2/12 w-full flex flex-col items-center justify-center">
                      <div className="flex flex-col w-96">
                        <button
                          data-id={id}
                          className="btn btn-primary mx-20 my-2"
                          id="immediatePurchase"
                          onClick={handlePurchase}
                        >
                          구매하기
                        </button>
                        <button
                          className="btn btn-primary mx-20 my-2"
                          onClick={() => {
                            setDeleteAlert((open) => !open)
                          }}
                        >
                          삭제하기
                        </button>
                      </div>
                      <ItemQuantityWrapper className="my-1">
                        <Button
                          className="btn btn-square"
                          onClick={() => {
                            if (cartCount === 1) {
                              setMinAlert((open) => !open)
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
                    </div>
                  </div>
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
