import React from 'react'
import Link from 'next/link';

const ProjectCard = () => {
  return (
    <Link href='/prompts/123'>
      <div className='p-6 shadow-md rounded-lg cursor-pointer bg-blue-1 hover:transform hover:scale-105 transition-transform'>
        <p className='font-bold text-xl'>Title</p>
        <p>
          Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </Link>
  )
}

export default ProjectCard