import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Play from './components/Play'
import Display from './components/Display'
import { PlayerContext } from './context/PlayContext'

const App = () => {

  const {audioRef , track , songsData} = useContext(PlayerContext)

  return (
    <div className='h-screen bg-black'>
      {songsData.length !== 0  
      ? <>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
        </div>
        <Play />
      </>  : null
      }
      <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>
    </div>
  )
}

export default App
