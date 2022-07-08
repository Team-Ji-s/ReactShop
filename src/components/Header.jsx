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
      <Logo className="md:inline-block hidden w-52 p-4">
        <LogoLink mode={mode} to="/">
          React Shop
        </LogoLink>
      </Logo>
      <div className="navbar-center w-1/3">
        <div className="dropdown">
          <MenuButton color={mode} hoverColor="grey" className="btn btn-ghost text-xl text-white md:hidden">
            <FontAwesomeIcon className="h-9 w-9" icon={faBars} alt="menu" />
          </MenuButton>
          <Category tabindex="0" className="menu dropdown-content mt-3 p-2 shadow bg-slate-900 rounded-box w-52">
            {category}
          </Category>
        </div>
        <Category tabindex="0" className="menu menu-horizontal p-0  hidden md:flex navbar-center">
          {category}
        </Category>
      </div>
      <HeaderItem className="navbar-end w-1/2">
        <ModeButton size={"xSmall"} color={mode} hoverColor={"grey"} onClick={onClickMode}>
          {mode === "black" ? (
            <LightMode icon={faSun} alt="라이트 모드 선택" />
          ) : (
            <DarkMode icon={faMoon} alt="다크 모드 선택" />
          )}
        </ModeButton>
        <div className="dropdown dropdown-end">
          <SearchButton className="btn md:hidden text-white h-16" color={mode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-11 w-11"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </SearchButton>
          <div className="menu dropdown-content mt-1" tabindex="0">
            <Search mode={mode} />
          </div>
        </div>
        <div tabindex="0" className="menu menu-horizontal p-0  hidden md:flex navbar-center mt-4">
          <Search mode={mode} />
        </div>
        <Cart to="/myCart">
          <span>
            <CartImg mode={mode} icon={faCartShopping} alt="장바구니" />
            <CartNumber>{cart}</CartNumber>
          </span>
        </Cart>
      </HeaderItem>
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
  height: 5rem;
  text-align: center;
`

const LogoLink = styled(StyledLink)`
  font-size: 1.7rem;
  font-weight: 700;
`
const CategoryLink = styled(StyledLink)`
  font-size: 1.3rem;
  font-weight: 700;
  &:hover {
    background-color: #696969;
  }
`

const Category = styled.ul``

const HeaderItem = styled.div`
  width: 60%;
  height: 5rem;
  display: inline-block;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`

const SearchButton = styled.button`
  border: 0;
  background-color: ${({ color }) => (color === "black" ? "black" : "white")};
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
