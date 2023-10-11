'use client';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function PrivacyPolicy({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Privacy policy</DialogTitle>
          <DialogDescription>
            <p>
              <strong>Last updated: October 11, 2023</strong>
            </p>

            <h2 className='scroll-m-20 border-b text-black pb-2 mt-2 text-xl font-semibold tracking-tight'>
              Introduction
            </h2>
            <p>
              Welcome to IConvert. At IConvert, we are committed to protecting
              your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use, and
              safeguard your data.
            </p>

            <h2 className='scroll-m-20 border-b text-black pb-2 mt-2 text-xl font-semibold tracking-tight'>
              Data Collection
            </h2>
            <ul>
              <li>
                <strong>User-Uploaded Data</strong>: IConvert allows users to
                upload files for conversion. We do not store or retain any data
                uploaded by users. After the conversion process is complete, we
                do not keep or access the uploaded files.
              </li>
              <li>
                <strong>Log Data</strong> We do not use data cookies or any
                other tracking technologies to collect personally identifiable
                information.
              </li>
            </ul>

            <h2 className='scroll-m-20 border-b text-black pb-2 mt-2 text-xl font-semibold tracking-tight'>
              Use of Information
            </h2>
            <p>We only use the information collected as described above to:</p>
            <ul>
              <li>Ensure the proper functioning and security of IConvert.</li>
              <li>Monitor and analyze application usage and performance.</li>
              <li>Comply with legal requirements and protect our rights.</li>
            </ul>

            <h2 className='scroll-m-20 border-b text-black pb-2 mt-2 text-xl font-semibold tracking-tight'>
              Data Sharing
            </h2>
            <p>
              We do not share or disclose any data or personal information
              uploaded by users to third parties. Your uploaded files are not
              accessible to anyone except you.
            </p>

            <h2 className='scroll-m-20 border-b text-black pb-2 mt-2 text-xl font-semibold tracking-tight'>
              Security
            </h2>
            <p>
              We take data security seriously and implement appropriate
              technical and organizational measures to protect your data from
              unauthorized access, alteration, disclosure, or destruction.
            </p>

            <p>
              By using IConvert you agree to the practices described in this
              Privacy Policy.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
type Props = {};

function Header({}: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <PrivacyPolicy open={open} setOpen={setOpen} />
      <Menubar className='rounded-none border-b border-none px-2 lg:px-4'>
        <MenubarMenu>
          <MenubarTrigger className='font-bold'>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>About Us</MenubarItem>
            <MenubarItem
              onClick={(_) => {
                setOpen(true);
              }}
            >
              Privacy
            </MenubarItem>
            {/* <MenubarSeparator />
            <MenubarItem>
              Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator /> */}
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Copy link</MenubarItem>
                <MenubarItem
                  onClick={() =>
                    window.open(
                      'https://twitter.com/intent/tweet?text=Check%20out%20IConvert%20-%20The%20Freedom%20to%20Convert%2C%20Without%20the%20Cost!&url=https%3A%2F%2Ficonvert.vercel.app%2F'
                    )
                  }
                >
                  Twitter
                </MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
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
