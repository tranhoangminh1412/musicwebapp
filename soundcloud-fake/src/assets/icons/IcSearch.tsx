import * as React from 'react';

import Image from 'next/image';

import search from '../../../src/assets/app/search.svg'

export interface IIcSearchProps {
}

export default function IcSearch (props: IIcSearchProps) {
  return (
      <Image src={search} alt='' />
  );
}
