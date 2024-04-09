import * as React from 'react';
import Image from 'next/image';

import { comments } from '@/constants/comments.constant';
import { users } from '@/constants/users.constant';

import { IComment } from '@/types/IComment';

import defaultAva from "@/assets/app/765-default-avatar.png"

export interface ICommentProps {
    contents: {
        authorId: number;
        content: string;
    };
}

export default function Comment (props: ICommentProps) {
    const {contents} = props;

  return (
    <div className='relative flex items-center w-full h-[46px] gap-[10px]'>
      <Image className='size-[46px] rounded-full' src={defaultAva} alt='' />
      <div className='flex-grow flex flex-col gap-1'>
        <p className='text-[14px] leading-[21px] text-[#979797]'>{users[contents.authorId].name}</p>
        <p className='text-[14px] leading-[21px] text-black'>{contents.content}</p>
      </div>
      <div className='absolute right-0 top-0 text-[14px] leading-[21px] text-[#979797] text-right'>
        When this comment was created
      </div>
    </div>
  );
}
