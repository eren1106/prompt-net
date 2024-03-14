import { Button } from '@/components/ui/button'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <section className='my-24 w-2/3 mx-auto text-center space-y-6'>
        {/* tell people what to do */}
        <h1 className='text-7xl font-bold'>
          Discover a Universe of <span className='text-primary bg-gradient-to-r bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent'>Prompt Templates!</span></h1>
        {/* introduce the website */}
        <p className='text-2xl font-light text-gray-400'>A platform where users can browse, create and share prompt templates.</p>
        <Button size="lg" className='text-xl font-bold'>
          Get started
        </Button>
      </section>
    </div>
  )
}

export default HomePage