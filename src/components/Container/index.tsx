import { FC, useState, useCallback } from "react";
import SourceItem, { SourceItemProps } from "../SourceItem";
import update from "immutability-helper";
import { Form } from "@arco-design/web-react";
import DragTarget from "../DragTarget";

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  items: Item[];
}

export type DeepPartial<T> = {
  [P in keyof T]+?: {
    [K in keyof T[P]]+?: T[P][K];
  };
};

export const Container: FC = () => {
  const [items, setItems] = useState<Array<DeepPartial<SourceItemProps>>>([
    {
      itemProps: {
        id: Math.random(),
        itemType: "input",
      },
      innerProps: {
        placeholder: "this",
      },
      formItemProps: {
        field: "this",
        label: "this",
      },
    },
    {
      itemProps: {
        id: Math.random(),
        itemType: "input",
      },
      innerProps: {
        placeholder: "is",
      },
      formItemProps: {
        field: "is",
        label: "is",
      },
    },
    {
      itemProps: {
        id: Math.random(),
        itemType: "input",
      },
      innerProps: {
        placeholder: "a",
      },
      formItemProps: {
        field: "a",
        label: "a",
      },
    },
    {
      itemProps: {
        id: Math.random(),
        itemType: "input",
      },
      innerProps: {
        placeholder: "demo",
      },
      formItemProps: {
        field: "demo",
        label: "demo",
      },
    },
  ]);

  const itemMove: (dragIndex: number, hoverIndex: number) => void = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = items[dragIndex];
      setItems(
        update(items, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem],
          ],
        })
      );
    },
    [items]
  );

  const itemInsert = (position: number) => {
    return (props: DeepPartial<SourceItemProps>) => {
      setItems([...items.slice(0, position), props, ...items.slice(position)]);
    };
  };

  const renderItem = (item: DeepPartial<SourceItemProps>, index: number) => {
    if (item.itemProps?.itemType !== undefined) {
      return (
        <SourceItem
          {...{
            formItemProps: { ...item.formItemProps!},
            innerProps: item.innerProps!,
            itemProps: {
              ...item.itemProps,
              id: item.itemProps.id,
              itemType: item.itemProps
                .itemType as SourceItemProps["itemProps"]["itemType"],
              index: (index - 1) / 2,
              itemMove,
            },
          }}
          key={item.itemProps.id}
        />
      );
    } else {
      return (
        <DragTarget
          key={Math.random()}
          insertItem={itemInsert(Math.floor(index / 2))}
        />
      );
    }
  };
  return (
    <>
      <Form>
        {items
          .reduce(
            (a: DeepPartial<SourceItemProps>[], c) =>
              a.concat(c, {} as DeepPartial<SourceItemProps>),
            [{}]
          )
          .map((item, i) => renderItem(item, i))}
      </Form>
    </>
  );
};
