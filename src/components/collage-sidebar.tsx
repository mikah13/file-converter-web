import {
  FileWithPreview,
  UploadContext,
  useUpload,
} from "@/lib/collage-providers";
import React, { useContext, useEffect } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { FileWithPath, useDropzone } from "react-dropzone";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { DndProvider } from "@/lib/dnd-providers";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ index }: { index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {index}
    </div>
  );
}

const ImageDisplay = () => {
  const { images, updateImages } = useUpload();

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      images.forEach((image: FileWithPreview) =>
        URL.revokeObjectURL(image.preview),
      );
  }, []);

  return (
    <DndProvider>
      <ScrollArea className="flex h-full max-h-[calc(100vh-18rem)] w-full   flex-col space-y-2">
        {/* {images} */}
        {images.map((image, index) => (
          //   <AspectRatio
          //     key={image.preview}
          //     ratio={16 / 9}
          //     className="mb-2 cursor-pointer border-2 bg-muted"
          //   >
          //     <Image
          //       src={image.preview}
          //       alt="Photo by Drew Beamer"
          //       fill
          //       className="rounded-md object-cover"
          //     />
          //   </AspectRatio>
          <SortableItem key={image.preview} index={index} />
        ))}
      </ScrollArea>
    </DndProvider>
  );
};
const CollageSidebar = () => {
  // Inside your component
  const { images, updateImages } = useUpload();

  const { getRootProps, getInputProps } = useDropzone({
    // maxFiles: 1, // Max number of files to be dropped

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
  console.log(images);

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
