import React from "react";
import {FaPlay, FaAngleLeft, FaAngleRight, FaPause,} from 'react-icons/fa';



const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, songInfo}) => {
    //Ref instead of using JS element selector from the DOM
   
    //event Handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }        
    }

    //formating start time and End time
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time %60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime:e.target.value})


    }

    //State
   
    return(
        <div className="player">
         <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <input 
            min= {0} 
            max={songInfo.duration || 0} 
            value={songInfo.currentTime} 
            onChange = {dragHandler}
            type="range" />
            <p>{getTime(songInfo.duration)}</p>
         </div>
         <div className="play-control">
            <FaAngleLeft className='skip-back' fontSize="1.5rem"/>
            {isPlaying ? 
            (<FaPause onClick={playSongHandler} className='play' fontSize="1.5rem"/>) :
            (<FaPlay onClick={playSongHandler} className='play' fontSize="1.5rem"/>)
            }
            <FaAngleRight className='skip-forward' fontSize="1.5rem" />
         </div>
    
        </div>

    )
}

export default Player;