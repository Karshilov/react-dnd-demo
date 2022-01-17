import { CSSProperties, FC } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../DragItem/constants";
import cls from "classnames";
import styles from "./index.module.sass";
import { SourceItemProps } from "../SourceItem";
import { DeepPartial } from "../Container";

const style: CSSProperties = {
  height: "8px",
  width: "100%",
  marginTop: "0.25rem",
  marginBottom: "0.25rem",
};

const DragTarget = (props: {
  insertItem: (props: DeepPartial<SourceItemProps>) => void;
}) => {
  const [{ isActive }, drop] = useDrop(() => ({
    accept: Object.keys(ItemTypes).map((k) => (ItemTypes as any)[k]),
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
    drop: (
      item: {
        type: string;
        sourceProps: DeepPartial<SourceItemProps>;
      },
      monitor
    ) => {
      console.log(item);
      props.insertItem({
        ...item.sourceProps,
        itemProps: {
          ...item.sourceProps.itemProps,
          itemType: item.type.slice(5) as SourceItemProps["itemProps"]["itemType"],
          id: Math.random()
        }
      });
    },
  }));

  return (
    <div
      ref={drop}
      style={style}
      className={isActive ? cls(styles.hoverLine) : ""}
    ></div>
  );
};

export default DragTarget;
