import { ColProps, RowProps, RulesProps } from "@arco-design/web-react";

export interface DefaultItemProps {
    field?: string;
    rules?: RulesProps<any>[];
    label?: string;
    initialValue?: any;
}