import styled from "styled-components"

export default function Badge({ type, size = "normal" }) {
  if (type === "new") {
    return (
      <StyledBadge type={type} size={size}>
        NEW
      </StyledBadge>
    )
  } else if (type === "best") {
    return (
      <StyledBadge type={type} size={size}>
        BEST
      </StyledBadge>
    )
  }
}

const StyledBadge = styled.span`
  width: ${({ theme }) => theme.width.small};
  height: ${({ theme, size }) => (size === "large" ? theme.height.medium : theme.height.small)};
  background-color: ${({ theme, type }) => (type === "new" ? theme.color.green : theme.color.red)};
  color: ${({ theme }) => theme.color.white};
  display: inline-block;
  font-size: ${({ theme, size }) => (size === "large" ? theme.font.size.large : theme.font.size.normal)};
  text-align: center;
  border: 0;
  border-radius: 1.5rem;
  font-weight: ${({ theme }) => theme.font.weight.normal};
`
