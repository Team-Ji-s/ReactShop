import { useRef, useCallback, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

export default function ProductModal({ showModal, setShowModal }) {
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
    [setShowModal, showModal]
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
      <input type="checkbox" id="my-modal" checked={isChecked(showModal)} className="modal-toggle" readOnly />
      <div className="modal" ref={modalRef} onClick={closeModal}>
        <ModalContent className="modal-box">
          <Content className="font-bold text-lg">상품이 담겼습니다.</Content>
          <div className="modal-action">
            <ConFirm htmlFor="my-modal" className="btn btn-primary" onClick={() => setShowModal((modal) => !modal)}>
              확인
            </ConFirm>
            <Link to={"/myCart"}>
              <Button className="btn btn-secondary">장바구니로 이동</Button>
            </Link>
          </div>
        </ModalContent>
      </div>
    </>
  )
}

const ModalContent = styled.div`
  height: 12rem;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Content = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin: 1rem 0;
`

const ConFirm = styled.label`
  color: white;
`

const Button = styled.button`
  color: white;
`
