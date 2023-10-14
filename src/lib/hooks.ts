import { useState, useEffect } from "react";
import { UploadFile } from "@/lib/types";
type ImageFormats = {
  [key: string]: string;
};

export function useFormat() {
  const [formats, setFormats] = useState<ImageFormats>();
  useEffect(() => {
    const endpoint = `${process.env.BACKEND_API}/extensions`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setFormats(data.extensions));
  }, []);
  return { formats };
}

export function useFileUpload() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  /**
   * removeFile from the list using index
   * @param index
   */
  const removeFile = (index: number) => {
    setFiles(files.filter((file, i) => i !== index));
  };

  /**
   * addFile to the list of files
   * @param file
   */
  const addFile = (file: UploadFile) => {
    let newFiles = files;
    newFiles.push(file);
    setFiles(newFiles);
  };

  /**
   * updateFileStatus
   */
  const updateFileStatus = (index: number, status: string) => {
    setFiles(
      files.map((file, i) => {
        if (i === index) {
          file.status = status;
        }
        return file;
      }),
    );
  };

  /**
   *  Upload file convert extension
   * @param index
   * @param format
   */
  const updateFileFormat = (index: number, format: string) => {
    setFiles(
      files.map((file, i) => {
        if (i === index) {
          file.format = format;
        }
        return file;
      }),
    );
  };

  const updateConvertedBin = (index: number, binary: string) => {
    setFiles(
      files.map((file, i) => {
        if (i === index) {
          file.convertedBin = binary;
        }
        return file;
      }),
    );
  };

  const updateFileQuality = (index: number, quality: number) => {
    setFiles(
      files.map((file, i) => {
        if (i === index) {
          file.quality = quality;
        }
        return file;
      }),
    );
  };

  const resetFiles = () => {
    setFiles([]);
  };

  const getUpdateProps = () => {
    return {
      addFile,
      removeFile,
      updateFileStatus,
      updateFileFormat,
      updateConvertedBin,
      updateFileQuality,
    };
  };

  const getFileUploadProps = () => {
    return { removeFile, updateFileFormat, updateFileQuality };
  };

  return {
    files,
    getFileUploadProps,
    updateFileQuality,
    resetFiles,
    updateConvertedBin,
    addFile,
    removeFile,
    updateFileStatus,
    updateFileFormat,
  };
}
