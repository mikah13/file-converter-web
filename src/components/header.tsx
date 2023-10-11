import React from 'react';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
type Props = {};

function Header({}: Props) {
  return (
    <div>
      <Menubar className='rounded-none border-b border-none px-2 lg:px-4'>
        <MenubarMenu>
          <MenubarTrigger className='font-bold'>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => window.open('https://mike-hoang-dev.vercel.app/')}
            >
              About Us
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />

            <MenubarShortcut />
            <MenubarItem>
              Quit <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default Header;
