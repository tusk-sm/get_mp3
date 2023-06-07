"use client"
import { useState, useEffect } from "react"

export default ()=>{
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const search = (e)=>{
        setTimeout(()=>{
            setQuery(e.target.value)
        }, 500)        
    }

    useEffect(()=>{
        if(query){
            fetch(`/api/search?q=${query}`)
                .then(response=>{
                    return response.json()
                })
                .then(data=>{
                    setResults(data)
                })
        }
    }, [query])
    
    return (
        <div className="relative w-72 sm:w-96 mb-5 sm:mb-10">
            <input 
                onChange={search} 
                type="text"  
                placeholder="Search music"
                className="form-input px-4 py-2 rounded-full border-2 border-indigo-500 w-full"
                />
            <div className="absolute bg-white w-full top-full left-0 rounded overflow-hidden shadow-2xl">
            {results.map(({track})=>{
                console.log(track)
                return(
                <a className="flex p-2 border-b" key={track.key} href={track.key} >
                    <img
                        src={track.images.coverart}
                        alt={track.title}
                        width={60}
                        height={60}
                        className="mr-3 rounded"
                    />
                    <div>
                        <h3 className="font-medium">{track.title}</h3>
                        <>{track.subtitle}</>
                    </div>
                </a>
                )
            })}
            </div>
        </div>
    )    
}