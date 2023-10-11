'use client';
import { FileWithPath, useDropzone } from 'react-dropzone';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

import { Toaster, toast } from 'sonner';
import { ConvertFile } from '@/lib/types';
import FileUploadCard from './file-upload-card';
import { useFileUpload, useFormat } from '@/lib/hooks';
import { downloadFromBin, getFileExtension, isConverting } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClockClockwise } from '@phosphor-icons/react';

// Register the plugin with FilePond

const MAX_FILE_COUNT = 10;
const API_ENDPOINT = `${process.env.BACKEND_API || 'http://127.0.0.1:8000'}`;
function Dropzone({ mode = 'converter' }: { mode?: string }) {
  const { formats } = useFormat();
  const [converted, setConverted] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: MAX_FILE_COUNT, // Max number of files to be dropped
    // accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (converted) {
        toast.message('Please press start again for new conversion');
        return;
      }
      if (files.length >= MAX_FILE_COUNT) {
        toast.error('Maximum number of files reached');
        return;
      }
      acceptedFiles
        .filter((e) => e.type.indexOf('image') !== -1)
        .map((e: FileWithPath) => ({
          file: e,
          status: 'Uploaded',
          format: getFileExtension(e.name),
          convertedBin: null,
          quality: 95,
        }))
        .map((e) => {
          addFile(e);
        });
    },
  });
  const {
    files,
    updateConvertedBin,
    addFile,
    removeFile,
    updateFileStatus,
    updateFileFormat,
    resetFiles,
  } = useFileUpload();

  const reset = () => {
    resetFiles();
    setConverted(false);
  };

  /**
   * Convert batch of files , send fetch request to backend
   */
  const convertAll = async () => {
    if (files.length === 0) {
      toast.error('Please select files to convert');
      return;
    }

    const response = await Promise.all(
      files.map(async (upload, index) => {
        const { file, status, format, quality } = upload;
        if (status === 'Converted') {
          return;
        }
        updateFileStatus(index, 'Converting');

        const form = new FormData();
        form.set('file', file);
        const res = await fetch(
          `${API_ENDPOINT}/convert?format=${format}&quality=${quality}`,
          {
            method: 'POST',
            body: form,
          }
        );

        if (res.ok) {
          const blob = await res.blob();
          const blobUrl = URL.createObjectURL(blob);
          updateFileStatus(index, 'Converted');
          updateConvertedBin(index, blobUrl);
        } else {
          updateFileStatus(index, 'Error');
        }
      })
    );

    setConverted(true);
  };

  return (
    <div className='flex flex-col space-y-4'>
      <Button
        disabled={converted}
        variant='outline'
        {...getRootProps({
          className: `dropzone border-dashed border-4 w-full h-24 ${
            converted ? 'cursor-not-allowed' : 'cursor-pointer'
          }`,
        })}
      >
        <div>
          <input {...getInputProps()} type='file' accept='image/*' />
          <p>
            Drag and drop images here, or click to select files. Maximum of{' '}
            {MAX_FILE_COUNT} files
          </p>
        </div>
      </Button>

      <ScrollArea className='h-[500px] rounded-md border p-4'>
        {files.map((upload: ConvertFile, index: number) => (
          <FileUploadCard
            formats={formats}
            mode={mode}
            fileUpload={upload}
            removeFile={removeFile}
            updateFileFormat={updateFileFormat}
            key={index}
            index={index}
          />
        ))}
      </ScrollArea>

      <div className='flex flex-row justify-end space-x-2'>
        {!converted ? (
          <Button
            className='w-36'
            disabled={isConverting(files)}
            onClick={convertAll}
          >
            Convert all
          </Button>
        ) : (
          <Button className='w-36' onClick={reset}>
            <ClockClockwise size={24} className='mr-1' /> Start again
          </Button>
        )}
      </div>
    </div>
  );
}

export default Dropzone;
