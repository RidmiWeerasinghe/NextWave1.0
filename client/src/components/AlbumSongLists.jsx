import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'
import { cTrack } from '../dummyData/dummy'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'

function AlbumSongLists(trackID) {

    const [{ accessToken }, dispatch] = useStateValue()
    const [track, setTrack] = useState(cTrack)

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)



    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    useEffect(() => {
        var authParameters = {
            method: 'GET',
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        fetch(`https://api.spotify.com/v1/tracks/${trackID.trackID}`, authParameters)
            .then(result => result.json())
            .then(data => setTrack(data)
            ).catch(console.error("err"))
    }, [])
    console.log(track)
    return (
        <div className="w-full overflow-hidden max-md:px-0 flex flex-col gap-2 text-white px-2.1">
            <div className='p-3 m-2 rounded-lg flex items-center justify-between' style={{ backgroundColor: 'rgba(169,169,169,0.05)' }}>
                <div className="flex items-center space-x-4">
                    <img src={track.album.images[0].url} alt="" className='w-14 h-14 rounded-sm' />
                    <div>
                        <h4 className="text-base font-semibold">{track.name}</h4>
                        <h6 className="text-sm text-gray-500">{track.album.artists[0].name}</h6>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <h4 className="text-base font-semibold">{millisToMinutesAndSeconds(track.duration_ms)}</h4>
                    <div className='text-xl'><PlayArrowRoundedIcon /></div>
                </div>
            </div>

        </div>
    )
}

export default AlbumSongLists