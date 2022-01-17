import { Button, Input } from '@arco-design/web-react'

export const ItemMap = {
    "input": Input,
    "button": Button,
} 

export interface ItemTypes {
    itemType: "input" | "button"
    itemMove: (dragIndex: number, hoverIndex: number) => void
    index: number
    id: any
}