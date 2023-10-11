import { useState, useEffect } from 'react';
import { ConvertFile } from '@/lib/types';

type Props = {
  currentFiles?: ConvertFile[] | null;
};
export function useFileUpload({ currentFiles }: Props) {
  const [files, setFiles] = useState<ConvertFile[]>(currentFiles || []);

  /**
   * removeFile from the list using index
   * @param index
   */
  const removeFile = (index: Number) => {
    setFiles(files.filter((file, i) => i !== index));
  };

  /**
   * addFile to the list of files
   * @param file
   */
  const addFile = (file: ConvertFile) => {
    let newFiles = files;
    newFiles.push(file);
    setFiles(newFiles);
  };

  /**
   * updateFileStatus
   */
  const updateFileStatus = (index: Number, status: string) => {
    setFiles(
      files.map((file, i) => {
        if (i === index) {
          file.status = status;
        }
        return file;
      })
    );
  };

  /**
   *  Upload file convert extension
   * @param index
   * @param format
   */
  const updateFileFormat = (index: Number, format: string) => {
    setFiles(
      files.map((file, i) => {
        if (i === index) {
          file.format = format;
        }
        return file;
      })
    );
  };

  const updateConvertedBin = (index: Number, binary: string) => {
    setFiles(
      files.map((file, i) => {
        if (i === index) {
          file.convertedBin = binary;
        }
        return file;
      })
    );
  };

  const resetFiles = () => {
    setFiles([]);
  };
  return {
    files,
    resetFiles,
    updateConvertedBin,
    addFile,
    removeFile,
    updateFileStatus,
    updateFileFormat,
  };
}
