import { useRef, useCallback, useEffect } from "react"
import styled from "styled-components"

export default function Alert({ setState, state, message }) {
  const modalRef = useRef()

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
          <PartialContent className="text-lg font-bold">{message}</PartialContent>
        </PartialWrapper>
      </div>
    </>
  )
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
