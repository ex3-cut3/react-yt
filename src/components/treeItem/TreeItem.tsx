import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const TreeItem = ({itemTree}: { itemTree: ITreeItem }) => {
    const [ isFolderOpen, setIsFolderOpen ] = useState(false);
    const isFolder = itemTree.childFolders && itemTree.childFolders.length > 0;
    const [ isEditing, setIsEditing ] = useState(false);
    const [ shownItemName, setShownItemName ] = useState(itemTree.name);
    const [ contextMenuPos, setContextMenuPos ] = useState<{x: number, y: number} | null>(null);

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
        }
    }

    const handleContextMenuClose = () => {
        setContextMenuPos(null);
    };

    async function handleCopy() {
        handleContextMenuClose()
        try {
            await navigator.clipboard.writeText(shownItemName)
            alert('Async: Copying to clipboard was successful: '+shownItemName);
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
                <input style = {{backgroundColor: 'transparent', width: '10%', color: 'whitesmoke'}} autoFocus
                       type = 'text' defaultValue = {shownItemName} onKeyDown = {handleKeyDown}
                       onBlur = {handleNameBlur}/>
                :
                <>
                    <div
                        style = {{
                            fontWeight: 'bold', color: `${isFolder ? 'var(--base-color)' : '#FFF'}`, cursor: 'pointer',
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
                        anchorPosition = {contextMenuPos !== null
                            ? {top: contextMenuPos.y, left: contextMenuPos.x}
                            : undefined}
                    >
                        <MenuItem onClick = {handleCopy}>Copy</MenuItem>
                        <MenuItem onClick = {handleEdit}>Edit</MenuItem>
                    </Menu></>
            }

            {isFolder && isFolderOpen &&
                <ul>
                    {itemTree.childFolders?.map((childFolder) =>
                        <TreeItem key = {childFolder.name}
                                  itemTree = {childFolder}/>
                    )}
                </ul>}
        </li>
    );
};

export default TreeItem;

export interface ITreeItem {
    name: string,
    childFolders?: ITreeItem[]
}
