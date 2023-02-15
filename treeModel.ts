export type TreeType = {
    id: string;
    name: string;
    parent_id: string;
    has_children?: boolean;
    children?: TreeType[];
    is_open?: boolean;
}

export interface ITreeList {
    items: TreeType[];
}

export interface ITreeState {
    items: TreeType[];
    item_children: { [key: string]: TreeType };
    checked_items: string[];
    fetchChildren(item: TreeType): void;
    onToggleChecked(item: TreeType, checked: boolean): void;
    onOpen(value: string): void;
    onCollapse(value: string): void;
}
