import { ISong } from '@/types/ISong';
import * as React from 'react';
import Image from 'next/image';
import check from '@/assets/app/Check.svg'

export interface IPlaylistSongShowcaseProps {
    song: ISong;
    setSelectedSong: React.Dispatch<React.SetStateAction<ISong | undefined>>;
}

export default function PlaylistSongShowcase (props: IPlaylistSongShowcaseProps) {
    const {song, setSelectedSong} = props
    const [selected,setSelected] = React.useState(false)

    const handleClick = () => {
        setSelectedSong(song)
        setSelected(!selected)
    }

  return (
    <div onClick={() => handleClick()} className={`relative flex gap-4 py-2 w-full hover:bg-[#F6F6F6] ${selected && 'bg-[#F6F6F6]'}`}>
        <Image style={{objectFit:'cover'}} className='w-[156px] h-[98px] ' src={song.image} alt=''/>
        <div className='flex flex-col gap-2'>
            <p className='text-lg leading-[27px] font-medium' >{song.name}</p>
            <p className='text-xs leading-[18px] text-[#979797]'>{song.plays} plays • {song.likes} likes</p>
            <p className='text-xs leading-[18px] text-[#979797]'>{song.artist}</p>
        </div>
        {selected && <Image className='absolute right-3 top-[44%]' src={check} alt=''/>}
    </div>
  );
}
