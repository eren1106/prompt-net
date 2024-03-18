import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import StarParticles from './components/StarParticles'
import PromptCardList from '@/components/prompts/PromptCardList'
import { getAllPrompts } from '@/services/prompt.service'
import LinkButton from '@/components/custom/LinkButton'
import ThemeImage from '@/components/custom/ThemeImage'

const HomePage = async () => {
  const prompts = await getAllPrompts();

  return (
    <StarParticles>
      <div className=''>

        {/* FIRST SECTION */}
        <section className='landing-section min-h-[calc(100vh-4rem)] w-2/3 mx-auto text-center gap-12 pb-6'>
          {/* tell people what to do */}
          <h1 className='text-7xl font-bold'>
            Discover a Universe of <span className='bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent'>Prompt Templates!</span>
          </h1>
          {/* introduce the website */}
          <p className='text-2xl font-light text-gray-400'>
            A platform where users can create, browse and share prompt templates that can later be used to prompt large language models such as ChatGPT, Gemini, and others.
          </p>
          <LinkButton href="/prompts" size="lg" className='text-xl font-bold'>
            Get started
          </LinkButton>
        </section>

        {/* TRENDING PROMPTS SECTION */}
        <section className='landing-section gap-6'>
          <h2 className='text-4xl font-bold'>
            Trending Prompt Templates
          </h2>
          <p className='text-lg'>Discover the latest trending prompt crafted by amazing minds!</p>
          <PromptCardList list={prompts} max={4} />
          <LinkButton href="/prompts" size="lg" className='text-xl font-bold'>
            See more
          </LinkButton>
        </section>

        {/* WHY USE SECTION */}
        <section className='landing-section'>
          <div className='flex gap-6'>
            {/* left */}
            <div className='flex-1 flex flex-col gap-6'>
              <h2 className='text-4xl font-bold'>
                Struggling to get the best results from ChatGPT? The secret lies in the right prompt!
              </h2>
              <p className='text-lg'>
                At PromptNet, you can find prompts that tackle any daily task, from writing killer emails to crafting fiery social media posts.
              </p>
              <LinkButton href="/prompts" size="lg" className='text-xl font-bold w-min'>
                Explore now!
              </LinkButton>
            </div>

            {/* right */}
            <div className='flex-1 flex justify-center'>
              {/* <img
                className="hidden dark:block h-96"
                src="/images/prompt-illu-dark.png"
                alt="prompt"
              />
              <img
                className="block dark:hidden h-96"
                src="/images/prompt-illu-light.png"
                alt="prompt"
              /> */}
              <ThemeImage
                className="h-96"
                src="/images/prompt-illu-light.png"
                darkThemeSrc='/images/prompt-illu-dark.png'
                alt="prompt"
              />
            </div>
          </div>
        </section>

        {/* COLLECTIONS SECTION */}
        <section className='landing-section'>
          <div className='flex gap-6'>
            {/* left */}
            <div className='flex-1 flex justify-center'>
              <img
                className="hidden dark:block h-96"
                src="/images/list-dark.png"
                alt="list"
              />
              <img
                className="block dark:hidden h-96"
                src="/images/list-light.png"
                alt="list"
              />
            </div>

            {/* right */}
            <div className='flex-1 flex flex-col gap-6'>
              <h2 className='text-4xl font-bold'>
                Create Your Own List
              </h2>
              <p className='text-lg'>
                With PromptNet, you can create your own list of favorite prompt templates to boost productivity. Just select prompts from your list and paste them into ChatGPT, instead of writing the same prompt over and over again. Additionally, you can explore lists created by other users for new ideas.
              </p>
              <LinkButton href="/user" size="lg" className='text-xl font-bold w-min'>
                Create list
              </LinkButton>
            </div>
          </div>
        </section>

        {/* GET PROMPT TIPS SECTION */}
        {/* <section className='landing-section'>
          Prompt Engineering Tips
        </section> */}
      </div>
    </StarParticles>
  )
}

export default HomePage