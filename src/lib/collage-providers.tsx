import { ReactNode, createContext, useState, useContext } from "react";
import { FileWithPath } from "react-dropzone";
import { MosaicParent } from "react-mosaic-component";
import { v4 as uuidv4 } from "uuid";
export type ViewId = "a" | "b" | "c" | "new" | "d";

export const CollageContext = createContext(null);
export type FileWithPreview = FileWithPath & {
  preview: string;
};
interface UploadContextType {
  images: FileWithPreview[];
  updateImages: (images: FileWithPreview[]) => void;
}

export const UploadContext = createContext<UploadContextType | undefined>(
  undefined,
);

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within a provider");
  }
  return context;
};

type UploadProviderProps = {
  children: ReactNode;
};

export const UploadContextProvider: React.FC<UploadProviderProps> = ({
  children,
}) => {
  const [images, setImages] = useState<FileWithPreview[]>([]);
  const updateImages = (newImages: FileWithPreview[]) => {
    setImages(newImages);
  };
  return (
    <UploadContext.Provider value={{ images, updateImages }}>
      {children}
    </UploadContext.Provider>
  );
};
