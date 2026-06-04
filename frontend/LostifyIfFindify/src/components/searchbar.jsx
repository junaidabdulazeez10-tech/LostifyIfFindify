import { useState } from 'react'
import { Link } from 'react-router-dom'
import './searchbar.css'


function SearchBar({ mode }) {
  const [searchInput, setSearchInput] = useState('')
  return (
    <div className={`border-end border-start p-2 ${mode ? "border-light bg-dark text-light" : "border-dark light-background  text-dark"}`}>
      <div className="d-flex justify-content-center flex-wrap align-items-center gap-2">
        <input className={`form-control  ${mode ? "border-light text-light dark-input" : "border-dark text-dark light-input"}`} type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} style={{ maxWidth: '250px', background: "transparent" }} placeholder="Search" />
        <Link className='Link-green' to={`/category/${searchInput}`} style={{ textDecoration: "none", color: "green", fontSize: "17px", padding: "5px 10px", border: "solid, 1px, green", borderRadius: "5px" }}>Search</Link>
        <span className="fs-4 ms-2">Popular:</span>
        <Link className='Link' to="/category/Laptops" style={{ padding: "3px", border: "solid, 1px, grey", borderRadius: "5px", textDecoration: "none", color: "white" }}>Laptops</Link>
        <Link className='Link' to="/category/Wallets" style={{ padding: "3px", border: "solid, 1px, grey", borderRadius: "5px", textDecoration: "none", color: "white" }}>Wallets</Link>
        <Link className='Link' to="/category/IDs" style={{ padding: "3px", border: "solid, 1px, grey", borderRadius: "5px", textDecoration: "none", color: "white" }}>IDs</Link>
        <Link className='Link' to="/category/Passports" style={{ padding: "3px", border: "solid, 1px, grey", borderRadius: "5px", textDecoration: "none", color: "white" }}>Passports</Link>
        <Link className='Link' to="/category/Watches" style={{ padding: "3px", border: "solid, 1px, grey", borderRadius: "5px", textDecoration: "none", color: "white" }}>Watches</Link>
      </div>
    </div>
  )
}

export default SearchBar