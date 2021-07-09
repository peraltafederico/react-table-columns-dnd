import React, { useEffect, useMemo, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import ItemTypes from "./ItemTypes";

const DraggableHeader = ({ column, index, reoder }) => {
  const ref = useRef();
  const { id, Header } = column;

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    drop: (item) => {
      reoder(item, index);
    }
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.COLUMN,
    item: () => {
      return {
        id,
        index,
        header: Header
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  const memoizedColumn = useMemo(() => column.render("Header"), [column]);
  const opacity = isDragging ? 0 : 1;

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <th
      ref={ref}
      {...column.getHeaderProps()}
      style={{ cursor: "move", opacity, background: isDragging ? "red" : "" }}
    >
      {memoizedColumn}
    </th>
  );
};

export default DraggableHeader;
