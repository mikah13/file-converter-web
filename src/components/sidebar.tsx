import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className='w-[250px] relative flex flex-col justify-between'>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Home
          </h2>

          <div className='space-y-1'>
            <Button variant='secondary' className='w-full justify-start'>
              Image Converter
            </Button>
          </div>
        </div>
      </div>

      <div className='border-t text-sm px-1 py-2 text-center'>
        <span>
          from{' '}
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
