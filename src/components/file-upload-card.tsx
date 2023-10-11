import { ConvertFile } from '@/lib/types';
import React from 'react';
import { FileImage, Trash, DownloadSimple } from '@phosphor-icons/react';
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
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { downloadFromBin } from '../lib/utils';
import { Slider } from '@/components/ui/slider';

type ImageFormats = {
  [key: string]: string;
};

type Props = {
  fileUpload: ConvertFile;
  removeFile: Function;
  index: number;
  updateFileFormat: Function;
  mode: string;
  formats: ImageFormats | undefined;
  updateFileQuality: Function;
};

function FileType({
  extension,
  index,
  updateFileFormat,
  formats,
}: {
  extension: string;
  index: number;
  updateFileFormat: Function;
  formats: ImageFormats | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(extension || '');
  const options = formats
    ? Object.keys(formats).map((e) => {
        return { value: formats[e], label: e };
      })
    : null;

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
              ? options &&
                options.find((option) => option.label === value)?.label
              : 'Convert to'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[180px] p-0' side='left' align='start'>
          <Command>
            <CommandInput placeholder='Search formats...' />
            <CommandEmpty>No formats found.</CommandEmpty>
            <CommandGroup>
              {options &&
                options.map((option) => (
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
const FileQuality = ({
  quality,
  updateFileQuality,
  index,
}: {
  quality: number;
  index: number;
  updateFileQuality: Function;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          {' '}
          <Button onClick={() => setOpen(true)}>Quality: {quality}%</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Slider
            onValueChange={(e) => updateFileQuality(index, e)}
            defaultValue={[quality]}
            max={100}
            step={1}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

const FileUploadCard = ({
  fileUpload,
  removeFile,
  updateFileFormat,
  updateFileQuality,
  index,
  formats,
  mode,
}: Props) => {
  const { file, status, format, convertedBin, quality } = fileUpload;

  const getStatusStyle = () => {
    switch (status) {
      case 'Completed':
        return 'bg-green-200 text-green-800';
      case 'Processing':
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
            {status === 'Processing' && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            {status}
          </Badge>
        </span>
      </div>

      <div className='flex items-center w-72 space-x-2 justify-end'>
        {mode === 'converter' && (
          <FileType
            formats={formats}
            index={index}
            updateFileFormat={updateFileFormat}
            extension={format || ' '}
          />
        )}
        {mode === 'compressor' && (
          <FileQuality
            index={index}
            updateFileQuality={updateFileQuality}
            quality={quality}
          />
        )}
        <Button
          disabled={status !== 'Completed'}
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
