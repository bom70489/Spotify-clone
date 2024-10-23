import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
export const PlayerContext = createContext()

const PlayerContextProvider = ({children}) => {

    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()
    
    const URL = 'http://localhost:4000';

    const [songsData , setSongData] = useState([])
    const [albumsData , setAlbumData] = useState([])
    const [track , setTrack] = useState(songsData[0]);
    const [playStatus , setPlayStatus] = useState(false);
    const [volume, setVolume] = useState(1);
    const [time , setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        }
    })
    
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if(id === item._id) {
                setTrack(item);
            }
        })
        await audioRef.current.play()
        setPlayStatus(true)
    }

    const previous = async () => {
        songsData.map(async (item , index) => {
            if(track._id === item._id && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
    }

    const next = async () => {
        songsData.map(async (item , index) => {
            if(track._id === item._id && index < songsData.length) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)    
    }

    const getSongData = async () => {
        try {
            
            const response = await axios.get(`${URL}/api/song/list`);

            if(response.data.success) {
                setSongData(response.data.songs);
                setTrack(response.data.songs[0])
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getAlbumData = async () => {
        try {
            
            const response = await axios.get(`${URL}/api/album/list`)

            if(response.data.success) {
                setAlbumData(response.data.album)
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume; 
        }
    };

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration*100)) + "%" ;
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    }
                })
            }
        } , 1000)
    } , [audioRef])

    useEffect(() => {
        getSongData();
        getAlbumData();        
    } , [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume; // กำหนดระดับเสียงเริ่มต้น
        }
    }, [volume]);

    const contextValue = {
        audioRef , 
        seekBg , 
        seekBar , 
        track , setTrack ,
        playStatus , setPlayStatus ,
        time , setTime , 
        play , pause ,
        playWithId ,
        previous , next , seekSong ,
        songsData ,
        albumsData ,
        getSongData,
        getAlbumData,
        handleVolumeChange,
        volume ,
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider