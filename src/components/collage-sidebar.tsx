import {
  FileWithPreview,
  UploadContext,
  useUpload,
} from "@/lib/collage-context";
import React, { useContext, useEffect } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { FileWithPath, useDropzone } from "react-dropzone";
import Image from "next/image";

type Props = {};

const ImageDisplay = (props: Props) => {
  const { images, updateImages } = useUpload();

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      images.forEach((image: FileWithPreview) =>
        URL.revokeObjectURL(image.preview),
      );
  }, []);
  return (
    <ScrollArea className="h-full max-h-[calc(100vh-18rem)]  w-full">
      {/* {images} */}
      {images.map((image) => (
        <img src={image.preview} />
      ))}
    </ScrollArea>
  );
};
const CollageSidebar = (props: Props) => {
  // Inside your component
  const { images, updateImages } = useUpload();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1, // Max number of files to be dropped

    onDrop: (acceptedFiles) => {
      updateImages([
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      ]);
    },
  });

  return (
    <div className="flex w-72 flex-col space-y-3 border-r px-3 py-6">
      <Button
        variant="outline"
        {...getRootProps({
          className: `dropzone border-dashed h-20`,
        })}
      >
        <input {...getInputProps()} type="file" accept="image/png" />
        <PlusCircle className="mr-2 h-4 w-4" /> Upload Image
      </Button>

      <div className="flex h-full flex-col">
        <ImageDisplay />
      </div>
    </div>
  );
};

export default CollageSidebar;
