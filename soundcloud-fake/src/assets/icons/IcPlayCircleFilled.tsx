import * as React from 'react';

import Image from 'next/image';

import playCircleFilled from '@/assets/app/playCircleFilled.svg'

export interface IIcPlayCircleFilledProps {
    classes?: string;
}

export default function IcPlayCircleFilled (props: IIcPlayCircleFilledProps) {
    const {classes} = props
  return (
    <div>
      <Image style={{objectFit: 'cover'}} className={classes} src={playCircleFilled} alt='' />
    </div>
  );
}
