import React from 'react'

const MovieCard = ({m:{trackId, trackName}}) => {
  return (
    <div>
        <li key={trackId} className="border rounded p-2">
    {trackName}
        </li>
  </div>
  )
}

export default MovieCard