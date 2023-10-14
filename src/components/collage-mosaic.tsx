import React, { useContext } from "react";
import { Mosaic, MosaicWindow } from "react-mosaic-component";

import { CollageContext, useUpload } from "@/lib/collage-context";
export type ViewId = "a" | "b" | "c" | "new" | "d";

const TITLE_MAP: Record<ViewId, string> = {
  a: "Left Window",
  b: "Top Right Window",
  c: "Bottom Right Window",
  d: "meo meow",
  new: "New Window",
};

type Props = {};

function CollageMosaic({}: Props) {
  const { images, updateImages } = useUpload();
  return (
    <div>
      {images}
      <Mosaic<ViewId>
        renderTile={(id, path) => (
          <MosaicWindow<ViewId>
            path={path}
            createNode={() => "new"}
            title={"TITLE_MAP[id]"}
          >
            <h1>{TITLE_MAP[id]}</h1>
          </MosaicWindow>
        )}
        initialValue={{
          direction: "row",
          first: "a",

          second: {
            direction: "column",
            first: "b",
            second: {
              direction: "column",
              first: "d",
              second: "c",
            },
          },
        }}
      />
    </div>
  );
}

export default CollageMosaic;
