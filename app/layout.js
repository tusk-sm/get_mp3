import './globals.css'
import Search from '../components/search.js'

export const metadata = {
  title: 'Download Free MP3',
  description: 'Search and download music tracks in high-quality MP3 format for free.',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body className="flex flex-col items-center bg-slate-50">
        <h1 className="text-3xl sm:text-[2.5rem] font-bold mt-14 sm:mt-20 mb-7">Download Free MP3</h1>
        <Search />

        {children}

        <div className="sm:my-20 my-5">
          <a className="text-indigo-500" href="https://github.com/tusk-sm/get_mp3" target="_blank">GitHub</a>
        </div>
        
        </body>
    </html>
  )
}
