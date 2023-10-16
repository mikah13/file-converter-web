import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DndContextProps,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useUpload } from "./collage-providers";

export const DndProvider: React.FC<DndContextProps> = ({ children }) => {
  const [items, setItems] = useState([1, 2, 3]);
  const { images, updateImages } = useUpload();
  console.log(images);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={images.map((e) => e.id)}
        strategy={rectSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active?.id !== over?.id) {

      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      const [objectToMove] = images.splice(oldIndex, 1);
      let newImages = images.map(e=>e);
      newImages.splice(newIndex, 0, objectToMove);
      updateImages(newImages);
    }
  }
};
