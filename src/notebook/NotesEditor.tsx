import React from 'react'

const NotesEditor = () => {
  return (
    <textarea className='w-full h-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Write your notes here...'></textarea>
  )
}

export default NotesEditor