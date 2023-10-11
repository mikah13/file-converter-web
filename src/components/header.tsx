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
            <h1>Privacy Policy for IConvert</h1>

            <p>
              <strong>Last updated: October 11, 2023</strong>
            </p>

            <h2>Introduction</h2>
            <p>
              Welcome to IConvert. At IConvert, we are committed to protecting
              your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use, and
              safeguard your data.
            </p>

            <h2>Data Collection</h2>
            <ul>
              <li>
                <strong>User-Uploaded Data</strong>: IConvert allows users to
                upload files for conversion. We do not store or retain any data
                uploaded by users. After the conversion process is complete, we
                do not keep or access the uploaded files.
              </li>
              <li>
                <strong>Log Data</strong>: Like most websites, we collect and
                store log data. This information may include details such as
                your IP address, browser type, operating system, and the date
                and time of your visit. However, we do not use cookies or any
                other tracking technologies to collect personally identifiable
                information.
              </li>
            </ul>

            <h2>Use of Information</h2>
            <p>We only use the information collected as described above to:</p>
            <ul>
              <li>Ensure the proper functioning and security of IConvert.</li>
              <li>Monitor and analyze application usage and performance.</li>
              <li>Comply with legal requirements and protect our rights.</li>
            </ul>

            <h2>Data Sharing</h2>
            <p>
              We do not share or disclose any data or personal information
              uploaded by users to third parties. Your uploaded files are not
              accessible to anyone except you.
            </p>

            <h2>Security</h2>
            <p>
              We take data security seriously and implement appropriate
              technical and organizational measures to protect your data from
              unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes
              will be posted on this page with the revised date.
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
