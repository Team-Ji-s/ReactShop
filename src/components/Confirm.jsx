import { useRef, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { remove } from "../redux/cart"
import styled from "styled-components"

export default function Confirm({ setState, state, title, itemId }) {
  const confirmRef = useRef()

  const dispatch = useDispatch()

  const closeConfirm = (e) => {
    if (confirmRef.current === e.target) {
      setState(false)
    }
  }

  const closeKey = useCallback(
    (e) => {
      if (e.key === "Escape" && state) {
        setState(false)
      }
    },
    [state]
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
      <input type="checkbox" id="my-modal" checked={isChecked(state)} className="modal-toggle" readOnly />
      <div className="modal" ref={confirmRef} onClick={closeConfirm}>
        <ConfirmContent className="modal-box">
          <Content className="font-bold text-lg">{title}을 삭제하시겠습니까?</Content>
          <div className="modal-action">
            <ConFirm
              htmlFor="my-modal"
              className="btn btn-primary"
              onClick={() => {
                setState((confirm) => !confirm)
              }}
            >
              취소
            </ConFirm>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setState((confirm) => !confirm)
                dispatch(remove({ id: itemId }))
              }}
            >
              확인
            </button>
          </div>
        </ConfirmContent>
      </div>
    </>
  )
}

const ConfirmContent = styled.div`
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
