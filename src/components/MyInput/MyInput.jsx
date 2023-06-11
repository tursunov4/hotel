import React from 'react'
import './MyInput.scss'
function MyInput({...props}) {
  return (
    <input className='my-input' {...props} />
  )
}

export default MyInput