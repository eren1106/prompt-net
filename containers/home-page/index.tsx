import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import StarParticles from './components/StarParticles'

const HomePage = () => {
  return (
    <div>
      <StarParticles>
        <section className='my-24 w-2/3 mx-auto text-center flex flex-col gap-6'>
          {/* tell people what to do */}
          <h1 className='text-7xl font-bold'>
            Discover a Universe of <span className='text-primary bg-gradient-to-r bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent'>Prompt Templates!</span></h1>
          {/* introduce the website */}
          <p className='text-2xl font-light text-gray-400'>A platform where users can browse, create and share prompt templates.</p>
          <Link href="/prompts">
            <Button size="lg" className='text-xl font-bold'>
              Get started
            </Button>
          </Link>
        </section>
      </StarParticles>

      <section>
        Popular Prompts
      </section>

      <section>
        Popular Lists
      </section>

      <section>
        Prompt Engineering Tips
      </section>
    </div>
  )
}

export default HomePage