import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Navigation from '../components/Navigation'
import { cn } from '../lib/utils'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatGPT Lingo Live',
  description: 'Learn languages with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'max-w-screen-md mx-auto')}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow pb-16">
            {children}
          </main>
          <Navigation />
        </div>
      </body>
    </html>
  )
}