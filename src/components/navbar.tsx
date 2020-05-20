import React from 'react'
import { Link } from 'gatsby'

const Navbar: React.FC = () => {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/education'>Education!</Link>
      <Link to='/experience'>Experience!</Link>
    </div>
  )
}

export default Navbar
