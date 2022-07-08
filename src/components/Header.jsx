import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons"
import styled from "styled-components"
import { categoryData } from "../data/categoryData"
import Button from "../components/Button"
import { change } from "../redux/mode"
import Search from "./Search"
import { getList } from "../redux/setProduct"

export default function Header() {
  const cartStore = useSelector((state) => state.cart)
  const modeStore = useSelector((state) => state.mode.value)

  let mode = modeStore.color
  const cart = cartStore.count

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getList())
  }, [])

  const onClickMode = () => {
    mode = mode === "black" ? "white" : "black"
    dispatch(change({ color: mode }))
  }

  const category = categoryData.map((item, index) => (
    <li key={index}>
      <CategoryLink mode={mode} to={item.url}>
        {item.category}
      </CategoryLink>
    </li>
  ))

  return (
    <HeaderWrapper mode={mode} className="navbar bg-base-100 p-0">
      <Logo className="md:inline-block hidden ">
        <LogoLink mode={mode} to="/">
          React Shop
        </LogoLink>
      </Logo>
      <div className="navbar-start">
        <div className="dropdown">
          <MenuButton color={mode} hoverColor="grey" className="btn btn-ghost text-xl text-white md:hidden">
            <FontAwesomeIcon icon={faBars} alt="menu" />
          </MenuButton>
          <Category tabindex="0" className="menu dropdown-content mt-3 p-2 shadow bg-slate-900 rounded-box w-52">
            {category}
          </Category>
        </div>
        <Category tabindex="0" className="menu menu-horizontal p-0  hidden md:flex">
          {category}
        </Category>
      </div>
      <div className="navbar-end">
        <HeaderItem>
          <ModeButton margin={"0.5rem"} size={"xSmall"} color={mode} hoverColor={"grey"} onClick={onClickMode}>
            {mode === "black" ? (
              <LightMode icon={faSun} alt="라이트 모드 선택" />
            ) : (
              <DarkMode icon={faMoon} alt="다크 모드 선택" />
            )}
          </ModeButton>
          <Search mode={mode} />
          <Cart to="/myCart">
            <span>
              <CartImg mode={mode} icon={faCartShopping} alt="장바구니" />
              <CartNumber>{cart}</CartNumber>
            </span>
          </Cart>
        </HeaderItem>
      </div>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.mode};
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  box-shadow: 7px 7px 7px 0 #ddd;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.mode === "black" ? "white" : "black")};
`

const MenuButton = styled.button`
  &:hover {
    background-color: ${({ theme, hoverColor }) => theme.color[hoverColor]};
  }
`

const Logo = styled.div`
  width: 10rem;
  height: 5rem;
  text-align: center;
  margin-left: 1rem;
`

const LogoLink = styled(StyledLink)`
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 4.8rem;
`
const CategoryLink = styled(StyledLink)`
  &:hover {
    background-color: #696969;
  }
`

const Category = styled.ul``

const HeaderItem = styled.div`
  width: 23rem;
  height: 5rem;
  display: inline-block;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: row;
  padding-top: 0.5rem;
`

const ModeButton = styled(Button)`
  display: inline-block;
  background-color: ${({ color }) => (color === "black" ? "black" : "white")};
  transition: 0.3s;
  &:hover {
    background-color: #696969;
  }
`

const LightMode = styled(FontAwesomeIcon)`
  width: 2.5rem;
  height: 2.5rem;
  color: white;
`
const DarkMode = styled(FontAwesomeIcon)`
  width: 2.5rem;
  height: 2.5rem;
  color: black;
`
const Cart = styled(Link)`
  width: 4rem;
  height: 4rem;
  display: inline-block;
  cursor: pointer;
  position: relative;
  border-radius: 0.5rem;
  margin: 0rem 0 0 0.5rem;
  &:hover {
    background-color: #696969;
  }
`

const CartImg = styled(FontAwesomeIcon)`
  width: 2.5rem;
  height: 2.5rem;
  color: ${(props) => (props.mode === "black" ? "white" : "black")};
  margin: 0.8rem 0.5rem 0.5rem 0.5rem;
`
const CartNumber = styled.span`
  width: 2rem;
  height: 2rem;
  z-index: 11;
  background-color: red;
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
  border-radius: 100%;
  text-align: center;
  position: absolute;
  right: 0rem;
`
