import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import StarParticles from './components/StarParticles'

const HomePage = () => {
  return (
    <div>
      <StarParticles>
        <section className='my-24 w-2/3 mx-auto text-center flex flex-col gap-6 items-center'>
          {/* tell people what to do */}
          <h1 className='text-7xl font-bold'>
            Discover a Universe of <span className='text-primary bg-gradient-to-r bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent'>Prompt Templates!</span></h1>
          {/* introduce the website */}
          <p className='text-2xl font-light text-gray-400'>
            A platform where users can create, browse and share prompt templates that can later be used to prompt large language models such as ChatGPT, Gemini, and others.
          </p>
          <Link href="/prompts" className='w-min'>
            <Button size="lg" className='text-xl font-bold'>
              Get started
            </Button>
          </Link>
        </section>
      </StarParticles>

      <section className='flex gap-6'>
        {/* LEFT */}
        <div className='flex-1 flex flex-col gap-3'>
          <h2 className='text-4xl font-bold'>
            Struggling to get the best results from ChatGPT? The secret lies in the right prompt!
          </h2>
          <p className='text-lg'>
            At PromptNet, you can find prompts that tackle any daily task, from writing killer emails to crafting fiery social media posts.
          </p>
        </div>

        {/* RIGHT */}
        <div className='flex-1 flex justify-center'>
          <img
            className="hidden dark:block"
            src="/images/prompt-illu-dark.png"
            alt="prompt"
          />
          <img
            className="block dark:hidden"
            src="/images/prompt-illu-light.png"
            alt="prompt"
          />
        </div>
      </section>

      <section>
        Popular Prompts (showing some popular prompt cards)
      </section>

      <section>
        Prompt Engineering Tips
      </section>
    </div>
  )
}

export default HomePage