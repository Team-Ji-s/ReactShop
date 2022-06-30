import styled from "styled-components"

export default function Badge({ type }) {
  if (type === "new") {
    return <span className="badge badge-lg badge-success">NEW</span>
  } else if (type === "best") {
    return <span className="badge badge-lg badge-error">BEST</span>
  }
}

const StyledBadge = styled.span`
  width: ${({ theme }) => theme.width.small};
  height: ${({ theme }) => theme.height.small};
  background-color: ${({ theme, type }) => (type === "new" ? theme.color.green : theme.color.red)};
  color: ${({ theme }) => theme.color.white};
  display: inline-block;
  font-size: ${({ theme }) => theme.font.size.normal};
  text-align: center;
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.all};
  font-weight: ${({ theme }) => theme.font.weight.normal};
`

const BadgeWrapper = styled.h2`
  display: inline-block;
`
