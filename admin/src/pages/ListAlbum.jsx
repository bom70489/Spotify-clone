import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {url} from '../App'
import { toast } from 'react-toastify'
const ListAlbum = () => {

  const [data , setData] = useState([])

  const fetchAlbum = async () => {
    try {
      
      const response = await axios.get(`${url}/api/album/list`);
      
      if(response.data.success) {
        setData(response.data.album)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error("Error :" , error)
    }
  }

  const removeAlbum = async (id) => {
    try {
      
      const response = await axios.post(`${url}/api/album/remove` , {id});
      
      if(response.data.success) {
        toast.success(response.data.message)
        await fetchAlbum()
      }

    } catch (error) {
      toast.error("Error" , error)
    }
  }

  useEffect(() => {
    fetchAlbum()
  } , [])

  return (
    <div>
      <p>All album List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Album Color</b>
            <b>Action</b>
        </div>
        {data.map((item , index) => {
          return (
            <div className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5' key={index}>
              <img src={item.image} className='w-12' alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColor} />
              <p onClick={() => removeAlbum(item._id)} className='cursor-pointer'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListAlbum
