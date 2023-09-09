import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className="bg-slate-800 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            dotMD
          </Link>
          <Link to="create" className="text-md text-white">
            Create
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar;