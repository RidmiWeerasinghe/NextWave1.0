import React, { useEffect } from 'react'
import ArtistCard from './ArtistCard'
import { useStateValue } from '../StateProvider'
function SearchResultsArtists() {
    const [{ searchedArtists, hidePlayer }, dispatch] = useStateValue()

    console.log("searchedArtists")
    console.log(searchedArtists)

    return (
        <div className="overflow-auto py-6  px-9 max-md:px-1 h-full overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue" style={{ height: `${hidePlayer ? "88vh" : "76vh"}` }}>
            <h3 className="font-medium text-neutral-300 text-xl ml-9  max-md:ml-5 mb-5">
                search results.....
            </h3>
            <div className="flex flex-wrap justify-between max-md:justify-center max-md:gap-x-2 max-md:px-3 gap-6 px-8">
                {searchedArtists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
            {
                searchedArtists.length == 0 &&
                <section className="flex w-full my-6 items-center justify-center">
                    <h1 className="text-lg text-lightTextColor">
                        No artist found for the given name 🤧
                    </h1>
                </section >
            }
        </div>
    )
}

export default SearchResultsArtists