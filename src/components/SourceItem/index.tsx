import { useState, useRef, FC } from "react";
import { ItemMap, ItemTypes } from "./constants";
import {
  Form,
  FormItemProps,
  InputProps,
  ButtonProps,
} from "@arco-design/web-react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { XYCoord } from "dnd-core";

const { Item } = Form;

export type SourceItemProps = {
  itemProps: ItemTypes;
  formItemProps: FormItemProps;
  innerProps: InputProps & ButtonProps;
};

interface DragItem {
  index: number;
  id: any;
}

const SourceItem: FC<SourceItemProps> = ({
  itemProps,
  formItemProps,
  innerProps,
}) => {
  const { itemType, itemMove, index, id } = itemProps;
  const Content = ItemMap[itemType];
  const ref = useRef<HTMLElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // 判断盒子模型重叠
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // 垂直方向中线
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 鼠标位置
      const clientOffset = monitor.getClientOffset();

      // 距离当前所在Item的顶部距离
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      /**
       * 判断可以交换位置的两种情况
       * - 鼠标向下移动时处于当前Item的下半
       * - 鼠标向上移动时处于当前Item的上半
       */

      // 向下拖动
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 向上拖动
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // 交换
      itemMove(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  const commonStyle: React.CSSProperties = {
    cursor: "move",
    padding: "0.25rem",
    marginBottom: "0",
  };
  drag(drop(ref));
  return (
    <Item
      {...formItemProps}
      ref={ref}
      style={{ ...commonStyle, opacity }}
      data-handler-id={handlerId}
    >
      <Content {...innerProps} disabled={true} />
    </Item>
  );
};

export default SourceItem;
