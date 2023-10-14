import { ReactNode, createContext, useState, useContext } from "react";
import { MosaicParent } from "react-mosaic-component";

export type ViewId = "a" | "b" | "c" | "new" | "d";


export const CollageContext = createContext(null);

interface UploadContextType {
  images: string[];
  updateImages: (images: string[]) => void;
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
  const [images, setImages] = useState<string[]>([]);
  const updateImages = (newImages: string[]) => {
    setImages(newImages);
  };
  return (
    <UploadContext.Provider value={{ images, updateImages }}>
      {children}
    </UploadContext.Provider>
  );
};
