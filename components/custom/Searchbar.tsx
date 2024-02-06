import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Input } from '@/components/ui/input'

const Searchbar = () => {
  return (
    <div className="flex items-center py-4">
      <div className="relative flex items-center w-80">
        <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder="Your search..."
          className=" pl-8"
        />
      </div>
    </div>
  )
}

export default Searchbar