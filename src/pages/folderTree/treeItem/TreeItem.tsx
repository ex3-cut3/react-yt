import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { CopyAll, Edit } from '@mui/icons-material';

const TreeItem = ({itemTree}: { itemTree: ITreeItem }) => {
    const [ isFolderOpen, setIsFolderOpen ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ childFolders, setChildFolders ] = useState<ITreeItem[]>(itemTree.childFolders || []);
    const [ shownItemName, setShownItemName ] = useState(itemTree.name);
    const [ contextMenuPos, setContextMenuPos ] = useState<{ x: number, y: number } | null>(null);
    const isFolder = !!itemTree.childFolders?.length;


    function toggle() {
        setIsFolderOpen(prevState => !prevState);
    }

    function changeType() {
        if (!isFolder) {
            itemTree.childFolders = []
            setIsFolderOpen(true);
        }
    }

    function handleEdit(e: any) {
        e.preventDefault();
        handleContextMenuClose()
        setIsEditing((prevState) => !prevState)
    }

    function handleNameBlur() {
        setIsEditing(false)
    }

    function handleKeyDown(e: any) {
        if (e.key === 'Enter') {
            setIsEditing(false);
            setShownItemName(e.target.value)
        } else if (e.key === 'Escape') {
            setIsEditing(false)
        }
    }

    const handleContextMenuClose = () => {
        setContextMenuPos(null);
    };

    function handleAddChild() {
        setChildFolders((prevChilds) => [ ...prevChilds, {name: 'new stuff ' + Math.random().toFixed(3)} ]);
    }

    async function handleCopy() {
        handleContextMenuClose()
        try {
            await navigator.clipboard.writeText(shownItemName)
            alert('Async: Copying to clipboard was successful: ' + shownItemName);
        } catch (e) {
            alert(e);
        }
    }

    function handleContextMenu(e: any) {
        e.preventDefault();
        setContextMenuPos(
            contextMenuPos === null
                ? {
                    x: e.clientX + 2,
                    y: e.clientY - 6,
                }
                : null,
        );
    }

    return (
        <li>
            {isEditing ?
                <>
                    <input style = {{backgroundColor: 'transparent', width: '10%', color: 'whitesmoke'}} autoFocus
                           type = 'text' defaultValue = {shownItemName} onKeyDown = {handleKeyDown}
                           onBlur = {handleNameBlur}/>
                </>
                :
                <>
                    <div
                        style = {{
                            fontWeight: 'bold',
                            color: `${isFolder ? 'var(--base-color)' : '#FFF'}`,
                            cursor: 'pointer',
                            lineHeight: 1.5,
                        }}
                        onClick = {toggle}
                        onContextMenu = {handleContextMenu}
                        onDoubleClick = {changeType}>
                        {shownItemName}

                        {isFolder && <span>[{isFolderOpen ? '-' : '+'}]</span>}
                    </div>
                    <Menu
                        open = {contextMenuPos !== null}
                        onClose = {handleContextMenuClose}
                        anchorReference = "anchorPosition"
                        anchorPosition = {contextMenuPos !== null ? {
                            top: contextMenuPos.y,
                            left: contextMenuPos.x
                        } : undefined}
                    >
                        <MenuItem onClick = {handleCopy}>
                            <ListItemIcon>
                                <CopyAll fontSize = "small"/>
                            </ListItemIcon>
                            Copy
                        </MenuItem>
                        <MenuItem onClick = {handleEdit}>
                            <ListItemIcon>
                                <Edit fontSize = "small"/>
                            </ListItemIcon>
                            Edit
                            ♠</MenuItem>
                    </Menu>
                </>
            }

            {isFolder && isFolderOpen &&
                <ul>
                    {childFolders.map((childFolder) =>
                        <TreeItem key = {childFolder.name}
                                  itemTree = {childFolder}/>
                    )}
                    <li style = {{color: 'white', cursor: 'pointer'}} onClick = {handleAddChild}>Add Item</li>
                </ul>}
        </li>
    );
};

export default TreeItem;

export interface ITreeItem {
    name: string,
    childFolders?: ITreeItem[]
}
