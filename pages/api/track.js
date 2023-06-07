export default async (req, res)=>{
    const shazamTrackURL = `https://www.shazam.com/discovery/v5/en-US/US/web/-/track/${req.query.key}?shazamapiversion=v3&video=v3`
    const response = await fetch(shazamTrackURL)
    const data = await response.json()
    if (data){
        res.status(200).json(data)
    }
}