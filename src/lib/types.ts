import { FileWithPath, useDropzone } from "react-dropzone";

export type UploadFile = {
  file: FileWithPath;
  convertedBin?: string | null;
  status: string;
  format?: string;
  quality: number;
};

export enum Mode {
  Converter = "converter",
  Compressor = "compressor",
}
