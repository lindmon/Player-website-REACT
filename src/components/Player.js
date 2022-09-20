import React from "react";
import {FaPlay, FaAngleLeft, FaAngleRight, FaPause,} from 'react-icons/fa';
import {  playAudio} from "../utile";



const Player = ({audioRef, currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs, setSongs, setCurrentSongs}) => {
    //Ref instead of using JS element selector from the DOM
    //UseEffect
   const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return{
                    ...song,
                    active:true,
                };
            }else{
                return{
                    ...song,
                    active:false,
                };
            }
        });
        setSongs(newSongs);
    
   }
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
    };
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id );
        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1)% songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1)% songs.length]);
        }
        if (direction === "skip-back") {
            if((currentIndex-1)%songs.length === -1){
                await setCurrentSong(songs[songs.length -1]);
                activeLibraryHandler(songs[songs.length -1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1)% songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1)% songs.length]);
        }
        playAudio(isPlaying, audioRef);

    };
    //Add the styles
    const trackAnim = {
        transform:`translateX(${songInfo.animationPercentage}%)`
    }
   
    return(
        <div className="player">
         <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <div style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                <input 
                min= {0} 
                max={songInfo.duration || 0} 
                value={songInfo.currentTime} 
                onChange = {dragHandler}
                type="range" 
                />
                <div style={trackAnim} className="animate-track"></div>
            </div>
            <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
         </div>
         <div className="play-control">
            <FaAngleLeft onClick={ () => skipTrackHandler("skip-back")} className='skip-back' fontSize="1.5rem"/>
            {isPlaying ? 
            (<FaPause onClick={playSongHandler} className='play' fontSize="1.5rem"/>) :
            (<FaPlay onClick={playSongHandler} className='play' fontSize="1.5rem"/>)
            }
            <FaAngleRight onClick={ () => skipTrackHandler("skip-forward")} className='skip-forward' fontSize="1.5rem" />
         </div>
    
        </div>

    )
}

export default Player;