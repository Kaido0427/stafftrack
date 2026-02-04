import React from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs'

function Header() {
  return (
    <div className='header'>
      <div className="menu-icone">
        <BsJustify className='icone' />
      </div>
      <div className="header-left">
        <BsSearch className='icone' />
      </div>
      <div className="header-right">
        <BsFillBellFill className='icone' />
        <BsFillEnvelopeFill className='icone' />
        <BsPersonCircle className='icone' />
      </div>

    </div>
  )
}

export default Header