import { useRef, useCallback, useEffect } from "react"
import styled from "styled-components"

export default function CartModal({ title, purchaseList, showModal, setShowModal }) {
  const modalRef = useRef()

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }

  const closeKey = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false)
      }
    },
    [showModal]
  )

  useEffect(() => {
    document.addEventListener("keydown", closeKey)
    return () => document.removeEventListener("keydown", closeKey)
  }, [closeKey])

  const isChecked = (checked) => {
    if (checked) {
      return "checked"
    } else {
      return null
    }
  }

  return (
    <>
      <input type="checkbox" id="my-modal-3" checked={isChecked(showModal)} className="modal-toggle" readOnly />
      <div className="modal" ref={modalRef} onClick={closeModal}>
        <ModalContent className="modal-box relative">
          <DeleteLabel
            htmlFor="my-modal-3"
            className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
            onClick={() => setShowModal((modal) => !modal)}
          >
            ✕
          </DeleteLabel>
          <Header>
            <Title>{title}</Title>
          </Header>
          <Body>
            <Heading>
              <ProductName>Product Name</ProductName>
              <Quantity>Quantuty</Quantity>
              <Price>Price</Price>
            </Heading>
            {purchaseList.itemList.map(({ title, price, cartCount }, idx) => {
              return (
                <BodyGrid key={"Reciept" + idx}>
                  <ProductName>{title}</ProductName>
                  <Quantity>{cartCount}</Quantity>
                  <Price>${price * cartCount}</Price>
                </BodyGrid>
              )
            })}
          </Body>
          <Footer>
            <TotalHeader>Total</TotalHeader>
            <TotalPrice>${purchaseList.totalPrice}</TotalPrice>
          </Footer>
        </ModalContent>
      </div>
    </>
  )
}

const ModalContent = styled.div`
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  max-width: 48rem;
`

const DeleteLabel = styled.label`
  font-size: 1.2rem;
  flex-wrap: nowrap;
`

const Header = styled.div`
  display: flex;
  height: 10%;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
`
const Body = styled.div`
  margin: 3.2rem 0;
  height: 30vh;
  background-color: rgba(247, 247, 247, 0.5);
`
const Heading = styled.div`
  margin-bottom: 1rem;
  height: 3rem;
  display: flex;
  text-align: center;
  font-weight: 700;
  font-size: 1.4rem;
`
const BodyGrid = styled.div`
  margin-bottom: 1rem;
  display: flex;
  text-align: center;
`
const ProductName = styled.div`
  width: 60%;
`
const Price = styled.div`
  width: 25%;
`

const Quantity = styled.div`
  width: 15%;
`
const Footer = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 2rem;
  justify-content: space-between;
  text-align: center;
`
const TotalHeader = styled.div`
  width: 25%;
`
const TotalPrice = styled.div`
  width: 25%;
`
