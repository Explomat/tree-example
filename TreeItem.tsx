import { ReactElement, FC, useContext } from 'react';
import { Checkbox } from '@aavolobuev/vsk-components-library';
import TreeList from './TreeList';
import { TreeType } from './treeModel';
import StateContext from './contexts';
import { ReactComponent as ArrowDownIcon } from './assets/icons/arrowDown.svg';
import { ReactComponent as ArrowUpIcon } from './assets/icons/arrowUp.svg';
import cx from 'classnames';
import styles from './treeList.module.scss';

const TreeItem:FC<TreeType> = (item: TreeType): ReactElement => {
    const ctx = useContext(StateContext);

    const { checked_items, item_children } = ctx;
    const isChecked = checked_items.findIndex(ch => ch === item.id) !== -1;
    const classes = cx({
        [styles.item]: true,
        [styles.item__isOpen]: item.is_open
    });

    const citem = item_children[item.id];
    return (
        <li className={classes}>
            <div className={styles.item__wrapper}>
                <div className={styles.item__actions}>
                    {citem.has_children && !citem.is_open &&
                        <ArrowDownIcon
                            className={styles.item__arrow}
                            onClick={() => !citem.children ? ctx.fetchChildren(item) : ctx.onOpen(citem.id) } />
                    }
                    {citem.is_open && <ArrowUpIcon className={styles.item__arrow} onClick={() => ctx.onCollapse(citem.id)}/>}
                    <span className={styles.item__checkbox}>
                        <Checkbox checked={isChecked} onChange={(e) => ctx.onToggleChecked(citem, e.target.checked)} />
                    </span>
                </div>
                <span>{citem.name}</span>
            </div>
            {
                citem.is_open &&
                citem.has_children && 
                citem.children && 
                citem.children.length > 0 ?
                <TreeList items = {citem.children} /> : null
            }
        </li>
    )
}

export default TreeItem;