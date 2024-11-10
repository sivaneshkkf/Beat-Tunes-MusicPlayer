import React from 'react'
import SongComp1 from '../components/SongComponents/SongComp1'
import SongComp2 from '../components/SongComponents/SongComp2'

const Home = () => {
  return (
    <div className='h-full mt-2'>
          <SongComp1/>
          <SongComp2/>
    </div>
  )
}

export default Home