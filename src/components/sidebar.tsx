'use client';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

import { usePathname, redirect, useRouter } from 'next/navigation';
type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const isPathname = (path: string) => {
    return pathname.includes(path);
  };

  const getButtonVariant = (path: string) => {
    return isPathname(path) ? 'secondary' : 'ghost';
  };
  return (
    <div className='hidden w-[250px]  relative lg:flex flex-col justify-between'>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='w-full mb-4 h-12 flex border-2 items-center justify-center'>
            <h2 className='text-lg font-semibold tracking-tight'>iConvert</h2>
          </div>
          <div className='space-y-1'>
            <Button
              variant={getButtonVariant('converter')}
              onClick={() => router.push('/converter')}
              className='w-full justify-start rounded-none'
            >
              Image Converter
            </Button>
          </div>
          <div className='space-y-1'>
            <Button
              variant={getButtonVariant('compressor')}
              onClick={() => router.push('/compressor')}
              className='w-full justify-start rounded-none'
            >
              Image Compressor
            </Button>
          </div>
        </div>
      </div>

      <div className='border-t h-10 text-sm px-1 py-2 text-center'>
        <span>
          From{' '}
          <Link
            className='color-blue-200 hover:color_blue-100 underline'
            href='http://mike-hoang-dev.vercel.app/'
          >
            mikah
          </Link>{' '}
          with ❤️
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
