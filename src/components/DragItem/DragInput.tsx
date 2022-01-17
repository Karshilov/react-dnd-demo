import { useRef } from "react";
import { useDrag } from "react-dnd";
import { SourceItemProps } from "../SourceItem";
import { ItemTypes } from "./constants";
import { DeepPartial } from "../Container"

const DragInput = (props: { text: string; IconPrefix: any; sourceProps: DeepPartial<SourceItemProps> }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.INPUT,
      options: {
        dropEffect: "copy",
      },
      item: () => {
        console.log(props)
        return { type: ItemTypes.INPUT, sourceProps: props.sourceProps };
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    []
  );
  const { text, IconPrefix } = props;
  drag(ref);
  return (
    <div
      ref={ref}
      style={{ marginRight: "1rem", opacity }}
    >
      <IconPrefix style={{ marginLeft: "4px", marginRight: "4px" }} />
      <span>{text}</span>
    </div>
  );
};

export default DragInput;
