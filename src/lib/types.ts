import { FileWithPath, useDropzone } from 'react-dropzone';

export type ConvertFile = {
  file: FileWithPath;
  convertedBin?: string | null;
  status: string;
  format?: string;
  quality: number;
};
