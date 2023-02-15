import { ReactElement, FC, useState, useEffect } from 'react';
import StateContext from './contexts';
import { TreeType, ITreeState } from './treeModel';
import TreeList from './TreeList';

interface ITree {
    checked_items: string[];
    fetchItems(id?: string): Promise<TreeType[]>;
}

const Tree:FC<ITree> = ({ checked_items, fetchItems }):ReactElement => {
    const [state, setState] = useState<ITreeState>({
        items: [],
        item_children: {},
        checked_items,
        fetchChildren: () => {},
        onToggleChecked: () => {},
        onOpen: () => {},
        onCollapse: () => {}
    });

    const fetchRoots = async () => {
        const data = await fetchItems();
        
        const itemChildren:{[key: string]: TreeType}  = {};
        data.forEach(s => itemChildren[s.id] = s);

        setState({
            ...state,
            items: data,
            item_children: itemChildren
        });
    }

    const fetchChildren = async (item: TreeType) => {
        const data = await fetchItems(item.id);
        const citem = state.item_children[item.id];
        if (citem !== undefined) {
            const itemChildren:{[key: string]: TreeType}  = {};
            data.forEach(s => itemChildren[s.id] = s);

            setState({
                ...state,
                item_children: {
                    ...state.item_children,
                    ...itemChildren,
                    [item.id]: {
                        ...citem,
                        children: data,
                        is_open: true
                    }
                }
            });
        }
    }

    const onToggleChecked = (item: TreeType, checked: boolean) => {
        if (checked) {
            setState({
                ...state,
                checked_items: state.checked_items.concat([item.id])
            });
        } else {
            setState({
                ...state,
                checked_items: state.checked_items.filter(s => s !== item.id)
            });
        }
    }

    const onOpen = (value: string) => {
        const item = state.item_children[value];
        if (item !== undefined) {
            setState({
                ...state,
                item_children: {
                    ...state.item_children,
                    [value]: {
                        ...item,
                        is_open: true
                    }
                }
            });
        }

        
    }

    const onCollapse = (value: string) => {
        const item = state.item_children[value];
        if (item !== undefined) {
            setState({
                ...state,
                item_children: {
                    ...state.item_children,
                    [value]: {
                        ...item,
                        is_open: false
                    }
                }
            });
        }
    }

    useEffect(() => {
        fetchRoots();
    }, [])

    return (
        <StateContext.Provider value={{
            ...state,
            fetchChildren,
            onToggleChecked,
            onOpen,
            onCollapse
        }}>
            <TreeList items={state.items} />
        </StateContext.Provider>
    );
        
}

export default Tree;