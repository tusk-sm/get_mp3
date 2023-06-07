"use client"
import { useState, useEffect } from "react"
export default({params})=>{

    const [track, setTrack] = useState()
    const [videoURL, setVideoURL] = useState()
    const [activeBtn, setActiveBtn] = useState(true)

    useEffect(()=>{

        fetch(`/api/track?key=${params.key}`)
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                setTrack(data)
            })
    },[])
    useEffect(()=>{
        if(track){
            const videoSection = track.sections.find(section=>section.type=="VIDEO")
            setVideoURL(videoSection.youtubeurl)
        }
    },[track])

    const download = async()=>{
        setActiveBtn(false)
        const response = await fetch(`/api/download?video=${videoURL}`)
        const blob = await response.blob()
        const blobURL = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = blobURL
        a.download = `${track.title}.mp3`
        document.body.appendChild(a)
        a.click()
        a.remove()
        if (blob){
            setActiveBtn(true)
        }
    }
    return (
        <>
        { track &&
            <>
            {track.images &&
                <img 
                    src={track.images.coverart}
                    className="rounded-lg"
                />
            }
            <h2 className="font-medium text-2xl mt-3 mb-2 text-center">{track.title}</h2>
            <p className="text-xl">{track.subtitle}</p>
            </>
        }
        { videoURL &&
            <button
                onClick={download}
                disabled={!activeBtn}
                className="inline-block my-3 rounded-full bg-indigo-600 px-10 py-3 text-xl font-semibold leading-5 text-white hover:bg-indigo-500 disabled:bg-indigo-300"
            >
                Download MP3
            </button>
        }
        </>
    )
}