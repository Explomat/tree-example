import { ReactElement, FC } from 'react';
import TreeItem from './TreeItem';
import { ITreeList } from './treeModel';
import styles from './treeList.module.scss';

const TreeList:FC<ITreeList> = ({items = []}):ReactElement => {
    return (
        <ul className={styles.treeList}>
            {items.map(i => <TreeItem key={i.id} {...i} />)}
        </ul>
    );
}

export default TreeList;