// @ts-ignore
import styles from './folderTree.module.scss';
import TreeItem from '../../components/treeItem/TreeItem';

const FolderTree = () => {
    const treeData = {
        name: 'My Tree',
        childFolders: [
            {name: 'hello'},
            {name: 'world'},
            {
                name: 'child folder',
                childFolders: [
                    {
                        name: 'child folder',
                        childFolders: [ {name: 'hello'}, {name: 'world'} ]
                    },
                    {name: 'hello'},
                    {name: 'world'},
                    {
                        name: 'child folder 2',
                        childFolders: [ {name: 'hello'}, {name: 'world'} ]
                    }
                ]
            }
        ]
    };

    return (
        <ul>
            <TreeItem itemTree = {treeData}></TreeItem>
        </ul>
    );
};

export default FolderTree;
