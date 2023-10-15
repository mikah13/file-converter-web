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
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(active, over);
    if (over && active?.id !== over?.id) {
      // updateImages((items) => {
      //   const oldIndex = items.indexOf(active.id);
      //   const newIndex = items.indexOf(over.id);
      //   return arrayMove(items, oldIndex, newIndex);
      // });
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      console.log(oldIndex, newIndex);
      const [objectToMove] = images.splice(oldIndex, 1);
      let newImages = images.map(e=>e);
      newImages.splice(newIndex, 0, objectToMove);
      console.log(newImages);
      updateImages(newImages);
    }
  }
};
