import * as React from 'react';
import Image from 'next/image';

import logo from '@/assets/app/logoWithName.svg'

export interface IIcLogoProps {
}

export default function IcLogo (props: IIcLogoProps) {
  return (
    <div className="!w-[240px] object-cover" >
      <Image className='!w-[240px] object-cover' src={logo} alt='' />
    </div>
  );
}
