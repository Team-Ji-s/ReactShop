import React from "react"
import styled from "styled-components"

export default function Filter({ setFunction }) {
  const selectFilter = (filter) => {
    switch (filter) {
      case "default":
        return defaultFilter()
      case "highPrice":
        return highPriceFilter()
      case "lowPrice":
        return lowPriceFilter()
      case "highRate":
        return highRateFilter()
      case "lowRate":
        return lowRateFilter()
    }
  }

  const defaultFilter = () => {
    setFunction((item) => {
      const sorted = item.sort((a, b) => a.id - b.id)
      return [...sorted]
    })
  }

  const highRateFilter = () => {
    setFunction((item) => {
      const sorted = item.sort((a, b) => b.rating.rate - a.rating.rate)
      return [...sorted]
    })
  }

  const lowRateFilter = () => {
    setFunction((item) => {
      const sorted = item.sort((a, b) => a.rating.rate - b.rating.rate)
      return [...sorted]
    })
  }

  const lowPriceFilter = () => {
    setFunction((item) => {
      const sorted = item.sort((a, b) => a.price - b.price)
      return [...sorted]
    })
  }

  const highPriceFilter = () => {
    setFunction((item) => {
      const sorted = item.sort((a, b) => b.price - a.price)
      return [...sorted]
    })
  }

  const checkOne = (check) => {
    const checkBoxes = document.getElementsByName("filter")
    for (let i = 0; i < checkBoxes.length; i++) {
      if (checkBoxes[i] !== check) {
        checkBoxes[i].checked = false
      } else if (checkBoxes[i] === check) {
        if (checkBoxes[i].checked) {
          checkBoxes[i].onclick = selectFilter(checkBoxes[i].value)
        } else {
          checkBoxes[i].onclick = selectFilter("default")
        }
      }
    }
  }

  return (
    <FilterWrapper>
      <FilterList>
        <input
          type="checkbox"
          className="checkbox checkbox-md"
          id="highRate"
          name="filter"
          value="highRate"
          onChange={(e) => checkOne(e.target)}
        />
        <FilterText htmlFor="highRate">높은별점순</FilterText>
      </FilterList>
      <FilterList>
        <input
          type="checkbox"
          className="checkbox checkbox-md"
          id="lowRate"
          name="filter"
          value="lowRate"
          onChange={(e) => checkOne(e.target)}
        />
        <FilterText htmlFor="lowRate">낮은별점순</FilterText>
      </FilterList>
      <FilterList>
        <input
          type="checkbox"
          className="checkbox checkbox-md"
          id="highPrice"
          name="filter"
          value="highPrice"
          onChange={(e) => checkOne(e.target)}
        />
        <FilterText htmlFor="highPrice">높은가격순</FilterText>
      </FilterList>
      <FilterList>
        <FilterCheckbox
          type="checkbox"
          className="checkbox checkbox-md"
          id="lowPrice"
          name="filter"
          value="lowPrice"
          onChange={(e) => checkOne(e.target)}
        />
        <FilterText htmlFor="lowPrice">낮은가격순</FilterText>
      </FilterList>
    </FilterWrapper>
  )
}

const FilterWrapper = styled.div`
  width: 60rem;
  height: 2.5rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: row;
`

const FilterList = styled.div`
  width: 9rem;
  height: 2rem;
  display: inline-block;
  align-items: center;
`

const FilterText = styled.label`
  font-size: ${({ theme }) => theme.font.size.normal};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  margin-left: 0.5rem;
  position: relative;
  top: -1.5px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.grey};
  }
`
const FilterCheckbox = styled.input`
  position: relative;
  top: 1.5px;
`
