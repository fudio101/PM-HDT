import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import DnDSortablePhoto from "./DnD/DnDSortable";

import DnDLayout from "./DnD/DnDLayout";

import classes from "./style.module.css";

// const photos = [
//   "https://about.canva.com/wp-content/uploads/sites/8/2019/03/yellow.png",
//   "https://about.canva.com/wp-content/uploads/sites/8/2019/03/green.png",
//   "https://about.canva.com/wp-content/uploads/sites/8/2019/03/red.png",
//   "https://about.canva.com/wp-content/uploads/sites/8/2019/03/blue.png",
// ];

function DnDUpload(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [items, setItems] = useState(props.photos);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    setItems(props.photos);
    // props.setReturnPts(items);
  }, [props.photos]);

  useEffect(() => {
    props.setReturnPts(items);
  }, [items, props]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const onDeleteHandler = (x) => {
    setItems((items) => {
      let idx = items.indexOf(x);
      if (idx >= 0) {
        items.splice(idx, 1);
        return [...items];
      }
      return items;
    });
  };

  const addImgHandler = async (event) => {
    // console.log(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
    await items.push(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <div>
        <input type="file" name="myImage" onChange={addImgHandler} />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <DnDLayout>
            {items.map((url, index) => (
              <div className={classes.items} key={url}>
                <DnDSortablePhoto url={url} index={index} />
                <button
                  className={classes.del_btn}
                  onClick={() => onDeleteHandler(url)}
                >
                  ✖ Remove
                </button>
              </div>
            ))}
          </DnDLayout>
        </SortableContext>
      </DndContext>
    </>
  );
}

export default DnDUpload;
