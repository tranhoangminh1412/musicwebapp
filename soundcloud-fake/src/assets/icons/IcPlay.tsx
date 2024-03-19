import * as React from 'react';

import Image from 'next/image';

import play from '@/assets/app/play.svg'
import playblack from '@/assets/app/play-black.svg'

export interface IIcPlayProps {
    classes?: string;
    color?:string
}

export default function IcPlay (props: IIcPlayProps) {
    const {classes,color} = props
  return (
    <div>
      <Image style={{objectFit: 'cover'}} className={classes} src={color == 'black' ? playblack : play} alt='' />
    </div>
  );
}
