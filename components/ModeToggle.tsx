"use client"

import { useState } from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  const handleToggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
    setIsDark(!isDark);
  }

  return (
    <Button variant="outline" size="icon" onClick={handleToggleTheme}>
      {
        isDark ?
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          : <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      }
    </Button>
  )
}
