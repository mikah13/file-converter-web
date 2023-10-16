"use client";
import { FileWithPath, useDropzone } from "react-dropzone";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { toast } from "sonner";
import { UploadFile, Mode } from "@/lib/types";
import FileUploadCard from "./file-upload-card";
import { useFileUpload, useFormat } from "@/lib/hooks";
import { sendFileRequest, handleOnDrop, isProcessing } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClockClockwise } from "@phosphor-icons/react";
const MAX_FILE_COUNT = 10;
const API_ENDPOINT = `${process.env.BACKEND_API}`;
function Dropzone({ mode = Mode.Converter }: { mode?: string }) {
  const { formats } = useFormat();
  const [processed, setProcessed] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: MAX_FILE_COUNT, // Max number of files to be dropped
    onDrop: (acceptedFiles) => {
      if (processed) {
        toast.message("Please press start again for new conversion");
        return;
      }
      if (files.length >= MAX_FILE_COUNT) {
        toast.error("Maximum number of files reached");
        return;
      }
      handleOnDrop(acceptedFiles, addFile);
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
    getFileUploadProps,
  } = useFileUpload();

  const reset = () => {
    resetFiles();
    setProcessed(false);
  };

  /**
   * Convert batch of files , send fetch request to backend
   */
  const convertAll = async () => {
    if (files.length === 0) {
      toast.error("No file found. Please upload a file ...");
      return;
    }

    const response = await Promise.all(
      files.map(async (upload, index) => {
        const { file, status, format, quality } = upload;
        if (status === "Completed") {
          return;
        }
        updateFileStatus(index, "Processing");
        const res = await sendFileRequest(upload, mode);
        if (res?.ok) {
          const blob = await res.blob();

          const compressSize = await fetch("/api/files/compress", {
            method: "POST",
            body: JSON.stringify({ filesize: Math.abs(file.size - blob.size) }),
          });
          const blobUrl = URL.createObjectURL(blob);
          updateFileStatus(index, "Completed");
          updateConvertedBin(index, blobUrl);
          toast.success("File processed successfully");
        } else {
          updateFileStatus(index, "Error");
        }
      }),
    );

    setProcessed(true);
  };

  return (
    <div className="flex grow flex-col space-y-4 px-6 py-6">
      <Button
        disabled={processed || isProcessing(files)}
        variant="outline"
        {...getRootProps({
          className: `dropzone border-dashed border-4 w-full h-24 ${
            processed ? "cursor-not-allowed" : "cursor-pointer"
          }`,
        })}
      >
        <div>
          <input {...getInputProps()} type="file" accept="image/png" />
          <p>
            Drag and drop images here, or click to select files. Maximum of{" "}
            {MAX_FILE_COUNT} files
          </p>
        </div>
      </Button>

      <ScrollArea className="h-full max-h-[400px] rounded-md border p-4">
        {files.map((upload: UploadFile, index: number) => (
          <FileUploadCard
            formats={formats}
            mode={mode}
            fileUpload={upload}
            {...getFileUploadProps()}
            key={index}
            index={index}
          />
        ))}
      </ScrollArea>

      <div className="flex flex-row justify-end space-x-2">
        {!processed ? (
          <Button
            className="w-36"
            disabled={isProcessing(files)}
            onClick={convertAll}
          >
            {mode === "converter" && "Convert all"}
            {mode === "compressor" && "Compress all"}
          </Button>
        ) : (
          <Button className="w-36" onClick={reset}>
            <ClockClockwise size={24} className="mr-1" /> Start again
          </Button>
        )}
      </div>
    </div>
  );
}

export default Dropzone;
