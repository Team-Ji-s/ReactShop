import styled from "styled-components"

export default function Badge({ type }) {
  return <StyledBadge type={type}>{type.toUpperCase()}</StyledBadge>
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
