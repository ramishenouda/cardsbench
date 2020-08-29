import React from 'react'

import LoaderView from './../loader/loader-view'
import ErrorPage from '../error-page/error-page-view';

import './board-details-style.css';
import List from '../lists/lists-container';

function BoardDetails(props) {
    if (props.loadingBoard) {
        return (
            <div className="board-details">
                <div className="boards-loader">
                    <div className="loader-view pb-5 mb-5 d-flex justify-content-center">
                        <LoaderView width={100} height={100} />
                    </div>
                    <div className="loader-view loader-text mt-5 pt-5 d-flex justify-content-center">
                        <h5>Loading board...</h5>
                    </div>
                </div>
            </div>
        );
    }

    if(props.errorWhileLoadingBoard) {
        return <ErrorPage code={"500"} text={"Error while loading the board."} buttonHTML = {
            <button onClick={() => props.loadBoard()} className="error-page-button">TRY AGAIN</button>
        } />
    }

    return (
      <div className="board-details ml-1 mr-1">
          <span className="board-title"> {props.board.boardName} </span>
          <div className="board-wrapper">
            <div className="board-contents">
                <List lists={props.board.lists} />
            </div>
          </div>
      </div>
    );
}

export default BoardDetails;
