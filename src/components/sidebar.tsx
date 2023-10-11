import React from 'react';
import { Button } from './ui/button';

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className=' w-[250px]'>
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
    </div>
  );
};

export default Sidebar;
