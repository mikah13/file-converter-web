import { ConvertFile } from '@/lib/types';
import React from 'react';
import {
  FileImage,
  Trash,
  Download,
  DownloadSimple,
} from '@phosphor-icons/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { formatBytes, formatFileName, getFileExtension } from '@/lib/utils';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { downloadFromBin } from '../lib/utils';

type ImageFormats = {
  [key: string]: string;
};

type Props = {
  fileUpload: ConvertFile;
  removeFile: Function;
  index: Number;
  updateFileFormat: Function;
};

function FileType({
  extension,
  index,
  updateFileFormat,
}: {
  extension: string;
  index: Number;
  updateFileFormat: Function;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(extension || '');
  const [options, setOptions] = React.useState<ImageFormats>();
  const formats = options
    ? Object.keys(options).map((e) => {
        return { value: options[e], label: e };
      })
    : null;

  useEffect(() => {
    const endpoint = `${
      process.env.BACKEND_API || 'http://127.0.0.1:8000'
    }/extensions`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setOptions(data.extensions));
  }, []);

  return (
    <div className='flex flex-row items-center space-x-2'>
      <span>To:</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[100px] justify-between'
          >
            {value
              ? formats &&
                formats.find((option) => option.label === value)?.label
              : 'Convert to'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[180px] p-0' side='left' align='start'>
          <Command>
            <CommandInput placeholder='Search formats...' />
            <CommandEmpty>No formats found.</CommandEmpty>
            <CommandGroup>
              {formats &&
                formats.map((option) => (
                  <CommandItem
                    key={option.label}
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setOpen(false);
                      updateFileFormat(index, currentValue);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === option.label ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const FileUploadCard = ({
  fileUpload,
  removeFile,
  updateFileFormat,
  index,
}: Props) => {
  const { file, status, format, convertedBin } = fileUpload;

  const getStatusStyle = () => {
    switch (status) {
      case 'Converted':
        return 'bg-green-200 text-green-800';
      case 'Converting':
        return 'bg-yellow-200 text-yellow-800';
      case 'Uploaded':
        return 'bg-blue-200 text-blue-800';
      case 'Error':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Card className='flex flex-col xl:flex-row py-3 px-3 cursp xl:items-center xl:justify-between'>
      <div className='flex flex-col xl:flex-row xl:space-x-2'>
        <span className='flex flex-row xl:space-x-3'>
          <span>
            <FileImage size={24} />
          </span>
          <span> {formatFileName(file.name || '')}</span>
        </span>

        <span>{formatBytes(file.size)}</span>
        <span>
          {' '}
          <Badge variant='outline' className={getStatusStyle()}>
            {status === 'Converting' && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            {status}
          </Badge>
        </span>
      </div>

      <div className='flex items-center space-x-2 justify-end'>
        <FileType
          index={index}
          updateFileFormat={updateFileFormat}
          extension={format || ' '}
        />
        <Button
          disabled={status !== 'Converted'}
          onClick={() => downloadFromBin(convertedBin, file.name, format)}
          className='border-2'
          variant='outline'
          size='icon'
        >
          <DownloadSimple className='h-4 w-4' />
        </Button>

        <Button
          className=' border-2'
          variant='outline'
          size='icon'
          onClick={() => removeFile(index)}
        >
          <Trash className='h-4 w-4 ' />
        </Button>
      </div>
    </Card>
  );
};

export default FileUploadCard;
