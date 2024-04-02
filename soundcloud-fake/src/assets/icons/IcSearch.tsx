import * as React from 'react';

import Image from 'next/image';

import search from '../../../src/assets/app/search.svg'

export interface IIcSearchProps {
  classes?: string;
}

export default function IcSearch (props: IIcSearchProps) {
  const {classes} = props

  return (
      <Image className={classes} src={search} alt='' />
  );
}
