import styled from "styled-components"

export default function Badge({ message }) {
  let type = ""
  if (message === "NEW") type = "new"
  else type = "best"

  return <StyledBadge type={type}>{message}</StyledBadge>
}

const StyledBadge = styled.span`
  width: ${({ theme, type }) => theme.badge[type].width};
  height: ${({ theme, type }) => theme.badge[type].height};
  background-color: ${({ theme, type }) => theme.badge[type].backgroundColor};
  color: ${({ theme }) => theme.color.white};
  display: inline-block;
  font-size: ${({ theme, type }) => theme.badge[type].fontSize};
  text-align: center;
  border: 0;
  border-radius: 1.5rem;
  font-weight: ${({ theme }) => theme.font.weight.normal};
`
