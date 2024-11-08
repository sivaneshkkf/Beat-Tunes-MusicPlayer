import React from 'react'
import SongComp1 from '../components/SongComponents/SongComp1'
import SongComp2 from '../components/SongComponents/SongComp2'

const Home = () => {
  return (
    <div className='h-full'>
        <div className="pb-8 pt-5 sm:pt-0">
            <ul id="categoryEl"
              className="flex justify-center gap-5 sm:mt-10 px-1 text-txtcolor text-sm font-bold">
              <li className="active-li">Overview</li>
              <li>Album</li>
              <li>Songs</li>
              <li>Artist</li>
            </ul>
          </div>
          <SongComp1/>
          <SongComp2/>
    </div>
  )
}

export default Home