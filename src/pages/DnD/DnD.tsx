import React, { useState } from 'react';
import styles from './dnd.module.css'

interface ICard {
    id: number,
    title: string,
}

interface IBoard extends ICard {
    items: ICard[];
}

const DnD = () => {
    const [ currentDragCard, setCurrentDragCard ] = useState<ICard>({id: 0, title: ''});
    const [ currentBoard, setCurrentBoard ] = useState<IBoard>({id: 0, items: [], title: ''});

    const [ boards, setBoards ] = useState<IBoard[]>([
        {id: 1, title: 'To-Do', items: [ {id: 1, title: 'Homework'}, {id: 2, title: 'Running'} ]},
        {id: 2, title: 'Current', items: [ {id: 3, title: 'Helping'}, {id: 4, title: 'Learning'} ]},
        {id: 3, title: 'Done', items: [ {id: 5, title: 'Watering'} ]},
    ]);

    function handleDragStart(e: React.DragEvent, cardStartOfDragging: ICard, board: IBoard) {
        setCurrentDragCard(cardStartOfDragging);
        setCurrentBoard(board)
        console.log(cardStartOfDragging)
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
        // @ts-ignore
        e.target.style.boxShadow = '-8px 8px 5px 0' +
            ' var(--base-color)'
    }

    function handleDragLeave(e: any) {
        e.target.style.boxShadow = 'none';
    }

    function handleDragEnd() {
    }

    function handleDrop(e: React.DragEvent, cardOnDropped: ICard, boardOnDropped: IBoard) {
        e.preventDefault()
        e.stopPropagation()
        // @ts-ignore
        e.target.style.boxShadow = 'none';
        const currentCardIdx = currentBoard.items.findIndex(item => item.id === currentDragCard.id);
        currentBoard.items.splice((currentCardIdx), 1);

        const droppedOnCardIdx = boardOnDropped.items.findIndex(item => item.id === cardOnDropped.id);
        const idxToInsert = droppedOnCardIdx + (droppedOnCardIdx >= currentCardIdx ? 1 : 0);
        boardOnDropped.items.splice(idxToInsert, 0, currentDragCard);

        updateBoards(boardOnDropped);
    }

    function handleDropOnEmptyBoard(e: React.DragEvent<HTMLDivElement>, boardOnDropped: IBoard) {
        // @ts-ignore
        e.target.style.boxShadow = 'none';

        boardOnDropped.items.push(currentDragCard)
        const currentCardIdx = currentBoard.items.findIndex(item => item.id === currentDragCard.id);
        currentBoard.items.splice((currentCardIdx), 1);
        updateBoards(boardOnDropped);
    }

    function updateBoards(boardOnDropped: IBoard) {
        setBoards((boards) => boards.map(board => {
            if (board.id === currentBoard.id) return currentBoard;
            else if (board.id === boardOnDropped.id) return boardOnDropped;
            return board;
        }));
    }

    return (
        <div className = {styles['flex-center']}>
            {boards.map(board =>
                <div key = {board.title} className = {styles.board}
                     onDragOver = {(e) => handleDragOver(e)}
                     onDragLeave = {handleDragLeave}
                     onDrop = {(e) => handleDropOnEmptyBoard(e, board)}>

                    <div className = {styles.board__title}>
                        {board.title}
                    </div>

                    {board.items.map(item =>
                        <div key = {item.title} draggable className = {styles.item}
                             onDragStart = {(e) => handleDragStart(e, item, board)}
                             onDragEnd = {handleDragEnd}
                             onDragLeave = {handleDragLeave}
                             onDragOver = {(e) => handleDragOver(e)}     // @ts-ignore
                             onDrop = {(e) => handleDrop(e, item, board)}
                        >{item.title}</div>
                    )}

                </div>
            )}
        </div>
    );
};
// <div className = {styles.cards}>
//             {cardList.map(card =>
//                 <div draggable className = {styles.card} key = {card.id}     // @ts-ignore
//                      onDragStart = {(e) => handleDragStart(e, card)}
//                      onDragEnd = {handleDragEnd}
//                      onDragLeave = {handleDragLeave}
//                      onDragOver = {handleDragOver}     // @ts-ignore
//                      onDrop = {(e) => handleDrop(e, card)}
//                 >
//                     {card.name}
//                 </div>
//             )}
//         </div>

export default DnD;
