import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import axios from 'axios'
import { favoriteSongs, favoriteTracks } from '../dummyData/dummy'
import AlbumSongLists from './AlbumSongLists'
import toast, { Toaster } from 'react-hot-toast'


function Recent() {

    const [{ user, pageRefresh , hidePlayer}, dispatch] = useStateValue()
    const [recent, setRecent] = useState(favoriteSongs)
    const [recentTracks, setRecentTracks] = useState(favoriteTracks)

    useEffect(() => {
        const email = user.email
        console.log(email)
        if (user.email) {
            axios.get(`http://localhost:5555/history/recent/${email}`)
                .then(response => {
                    console.log("response")
                    console.log(response.data.data)
                    setRecent(response.data.data)
                    setRecentTracks(response.data.data.tracks.reverse())
                })
                .catch((errror) => {
                    console.log(errror)
                })
        }
    }, [pageRefresh])

    const clearHistory = () => {
        const email = user.email
        if (email) {
            console.log(email)
            axios.delete(`http://localhost:5555/history/clear/${email}`)
                .then(response => {
                    toast.success(response.data.message)
                    //refresh page
                    dispatch({
                        type: 'SET_PAGEREFRESH',
                        pageRefresh: !pageRefresh
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const notLoggedInMessage = (
        <div className="w-full flex justify-center items-center mt-10">
            <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                Access to your recent is only available to logged-in users. Please
                log in to view your recent songs or try again later.
            </p>
        </div>
    )
    const LoggedInMessage = (
        <div className='h-full overflow-y-scroll  scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue' style={{ height: `${hidePlayer ? "88vh" : "76vh"}` }}>
            <Toaster/>
            <section className=" px-14 max-md:px-2 overflow-auto pt-5">
                <section className="flex justify-between items-center pr-6">
                    <h3 className="text-neutral-50  text-2xl flex items-center max-md:text-sm px-4 mb-5">
                        My Recently played songs
                    </h3>
                    <p className='text-lightTextColor text-sm flex items-center max-md:text-sm px-4 mb-5'>
                        {recent.count} Songs
                    </p>
                    <p className='text-lightTextColor text-sm flex items-center max-md:text-sm px-4 mb-5 cursor-pointer' onClick={clearHistory}>
                        <u>clear all</u>
                    </p>
                </section>

                {recent.count > 0 && recentTracks.map((track) => (
                    <AlbumSongLists key={track.trackID} trackID={track.trackID} removeBtnVisible={false} />
                ))

                }

                {!recent.count && (
                    <div className="w-full flex justify-center items-center mt-10">
                        <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                            You haven't played any song yet.
                        </p>
                    </div>
                )}
            </section>
        </div>
    )

    return (
        <div className=' mb-20'>
            {user.username ? LoggedInMessage : notLoggedInMessage}
        </div>
    )
}

export default Recent
