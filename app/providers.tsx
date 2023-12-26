// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    // btn: {
    //   50: "#fef7ed",
    //   100: "#fceed9",
    //   200: "#fadeb5",
    //   300: "#f6c57c",
    //   400: "#ef9d219",
    //   500: "#cc800f",
    //   600: "#a6680c",
    //   700: "#845309",
    //   800: "#694207",
    //   900: "#573706",
    //   950: "#311f04",
    // }
  }
});

export function Providers({ 
    children
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}