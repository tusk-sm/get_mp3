export default async (req, res)=>{
    const shazamSearchURL = `https://www.shazam.com/services/search/v4/en-US/US/web/search?term=${req.query.q}%20&numResults=3&offset=0&types=songs&limit=7`

    const response = await fetch (shazamSearchURL);
    const data = await response.json()
    if (data){
        res.status(200).json(data.tracks.hits)
    }
}