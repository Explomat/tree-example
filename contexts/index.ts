import { ITreeState } from '../treeModel';
import { createContext } from 'react';

const StateContext = createContext<ITreeState>({
    items: [],
    item_children: {},
    checked_items: [],
    fetchChildren: () => {},
    onToggleChecked: () => {},
    onOpen: () => {},
    onCollapse: () => {}
});

export default StateContext;