import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
  const [ searchValue, setSearchValue ] = useState('')

  const onChangeValue = (e) => {
    const { value } = e.target
    setSearchValue(value)
  }

  const onClickSearch = (e) => {
    e.preventDefault()
    handleSearch(searchValue)
  }

  return (
    <form className="search">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onChangeValue(e)}
      />
      <button
        type="submit"
        onClick={(e) => onClickSearch(e)}
      >Search</button>
    </form>
  )
}

export default Search;