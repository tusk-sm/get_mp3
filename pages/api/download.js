import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'

export default async (req, res)=>{
    const shazamVideoURL = req.query.video
    const response = await fetch(shazamVideoURL)
    const data = await response.json()
    const action = data.actions.find(action=>action.name=='video:youtube')    

    const youtubedl = require('youtube-dl-exec')
    const uuid = uuidv4(); 
    const filePath = `${uuid}.mp3`

    const output = await youtubedl(action.uri, {        
        output: filePath,
        extractAudio: true,
        audioFormat: "mp3",
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        // ffmpegLocation: "Path to ffmpeg",
        addHeader: [
            'referer:youtube.com',
            'user-agent:googlebot'
        ]
    })
    if (output){       
        const stat = fs.statSync(filePath)
        const readStream = fs.createReadStream(filePath)
        res.writeHead(200,{
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        })
        readStream.pipe(res)      
        setTimeout(()=>{
            fs.unlinkSync(filePath)
        }, 5000) 

    }

}