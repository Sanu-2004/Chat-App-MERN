import React from 'react'
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <>
    <div className='flex gap-2'>
      <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-xs rounded-full" />
      <button className="btn btn-primary rounded-full"><IoSearch /></button>
    </div>
    
    </>
  )
}

export default Search
