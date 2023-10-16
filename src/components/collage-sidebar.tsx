import {
  FileWithPreview,
  UploadContext,
  useUpload,
} from "@/lib/collage-providers";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { FileWithPath, useDropzone } from "react-dropzone";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { DndProvider } from "@/lib/dnd-providers";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { handleCollage } from "@/lib/utils";

export function SortableItem({ image }: { image: FileWithPreview }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <AspectRatio
        key={image.preview}
        ratio={16 / 9}
        className=" cursor-pointer border-2 bg-muted"
      >
        <Image
          src={image.preview}
          alt={image.name}
          fill
          className="rounded-md border-2 border-gray-50 object-cover"
        />
      </AspectRatio>
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
      {/* {images} */}
      {images.map((image, index) => (
        <SortableItem key={image.preview} image={image} />
      ))}
    </DndProvider>
  );
};
const CollageSidebar = () => {
  // Inside your component
  const { images, updateImages } = useUpload();
  const [processing, setProceessing] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    // maxFiles: 1, // Max number of files to be dropped

    onDrop: (acceptedFiles) => {
      updateImages([
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uuidv4(),
          }),
        ),
      ]);
    },
  });

  const createCollage = async () => {
    if (images.length === 0) {
      toast.error("No file found. Please upload a file...");
      return;
    }
    setProceessing(true);

    let res = await handleCollage(images);
    console.log(res);
  };

  return (
    <div className="flex w-full flex-col space-y-4 border-r px-6 py-6">
      <Button
        variant="outline"
        {...getRootProps({
          className: `dropzone border-dashed border-4 w-full h-24`,
        })}
      >
        <input {...getInputProps()} type="file" accept="image/png" />
        <PlusCircle className="mr-2 h-4 w-4" /> Upload Image
      </Button>

      <div className="grid h-[400px] grid-cols-4 gap-6 overflow-x-scroll border p-4">
        <ImageDisplay />
      </div>

      <div className="flex justify-end">
        <Button className="w-36" onClick={createCollage}>
          Create collage
        </Button>
      </div>
    </div>
  );
};

export default CollageSidebar;
