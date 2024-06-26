import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function ArtistCard(props) {
    //accessing image, name and id through props
    let imageUrl = "props.artist.images[0].url"
    try {
        imageUrl = props.artist.images[0].url
    } catch (error) {
        imageUrl = '/images/user.jpg'
    }
    const name = props.artist.name
    const id =  props.artist.id
    console.log("props")
    console.log(props.artist.name)

    
    return (
        <Link to={`/singleartist/${id}`} className="w-48 block group">
            <div className="relative w-48 h-48 border-1 border-opacity-5 border-slate-300 rounded-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 ease-linear duration-500"
                />
            </div>
            <h4
                className="w-full text-center text-darkSongname text-sm mt-3 px-1 "
                title={name}
            >

            </h4>
            <p className="text-center text-slate-400 text-xs tracking-wide mt-1">
                {name}
            </p>
        </Link>
    )
}

export default ArtistCard
