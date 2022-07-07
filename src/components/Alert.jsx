import { useRef, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { remove } from "../redux/cart"
import styled from "styled-components"

export default function Alert({ type, setState, state, title, itemId }) {
  const modalRef = useRef()

  const dispatch = useDispatch()

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setState(false)
    }
  }

  const closeKey = useCallback(
    (e) => {
      if (e.key === "Escape" && state) {
        setState(false)
      }
    },
    [setState, state]
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

  if (type === "partialPurchase") {
    return (
      <>
        <input type="checkbox" id="my-modal-3" checked={isChecked(state)} className="modal-toggle" readOnly />
        <div className="modal" ref={modalRef} onClick={closeModal}>
          <PartialWrapper className="modal-box relative">
            <DeleteLabel
              htmlFor="my-modal-3"
              className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
              onClick={() => setState((modal) => !modal)}
            >
              ✕
            </DeleteLabel>
            <PartialContent className="text-lg font-bold">선택한 상품이 없습니다.</PartialContent>
          </PartialWrapper>
        </div>
      </>
    )
  } else if (type === "partialDelete") {
    return (
      <>
        <input type="checkbox" id="my-modal" checked={isChecked(state)} className="modal-toggle" readOnly />
        <div className="modal" ref={modalRef} onClick={closeModal}>
          <ModalContent className="modal-box">
            <Content className="font-bold text-lg">{title}을 삭제하시겠습니까?</Content>
            <div className="modal-action">
              <ConFirm
                htmlFor="my-modal"
                className="btn btn-primary"
                onClick={() => {
                  setState((modal) => !modal)
                }}
              >
                취소
              </ConFirm>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setState((modal) => !modal)
                  console.log(itemId)
                  dispatch(remove({ id: itemId }))
                }}
              >
                확인
              </button>
            </div>
          </ModalContent>
        </div>
      </>
    )
  } else if (type === "minAlert") {
    return (
      <>
        <input type="checkbox" id="my-modal-3" checked={isChecked(state)} className="modal-toggle" readOnly />
        <div className="modal" ref={modalRef} onClick={closeModal}>
          <PartialWrapper className="modal-box relative">
            <DeleteLabel
              htmlFor="my-modal-3"
              className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
              onClick={() => setState((modal) => !modal)}
            >
              ✕
            </DeleteLabel>
            <PartialContent className="text-lg font-bold">최소 수량 1입니다.</PartialContent>
          </PartialWrapper>
        </div>
      </>
    )
  }
}

const PartialWrapper = styled.div`
  min-height: 10rem;
  display: flex;
`

const DeleteLabel = styled.label`
  font-size: 1.2rem;
  flex-wrap: nowrap;
`

const PartialContent = styled.h3`
  font-size: 1.5rem;
  margin: auto;
`

const ModalContent = styled.div`
  height: 14rem;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Content = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin: 1rem 0;
`

const ConFirm = styled.label`
  color: white;
`
