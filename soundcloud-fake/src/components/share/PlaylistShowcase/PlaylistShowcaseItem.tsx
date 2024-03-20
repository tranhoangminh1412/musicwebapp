import * as React from 'react';

import { songs } from '@/constants/songs.constant';

import IcPlay from '@/assets/icons/IcPlay';

export interface IPlaylistShowcaseItemProps {
    songId: number;
}

export default function PlaylistShowcaseItem (props: IPlaylistShowcaseItemProps) {
    const {songId} = props

  return (
    <div className='flex text-center text-sm leading-[21px] z-20 text-white p-3 hover:bg-white hover:bg-opacity-20'>
      {songs[songId].name} - {songs[songId].artist}
      <div className='relative ml-auto flex flex-nowrap gap-1 min-w-[72px]'><IcPlay classes='absolute right-10 size-[16px] object-cover ' color='white' />
      <div className='absolute right-0'>
        {songs[songId].plays}
      </div>
      </div>
    </div>
  );
}
