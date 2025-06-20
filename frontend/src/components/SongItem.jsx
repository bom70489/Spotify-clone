import React, { useCallback, useContext } from 'react'
import { PlayerContext } from '../context/PlayContext'

const SongItem = ({name , image , id , desc}) => {

  const {playWithId} = useContext(PlayerContext)

  return (
    <div onClick={() => playWithId(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img src={image} className='rounded' alt="" />
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default SongItem
