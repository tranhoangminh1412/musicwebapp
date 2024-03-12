import * as React from 'react';

import logo from '../../../public/logo.svg'

export interface IIcLogoProps {
}

export default function IcLogo (props: IIcLogoProps) {
  return (
    <div className="size-16" style={{width: '68px', height:'68px'}}>
      <img className="bg-cover " src={logo} />
    </div>
  );
}
