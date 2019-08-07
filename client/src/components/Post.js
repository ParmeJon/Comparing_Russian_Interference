import React from 'react';

const Post = ({info, addToWatchList, remove, removeFromWatchList}) => {

    function addToWatch() {
        addToWatchList(info)
    }

    function removeFromWatch() {
        removeFromWatchList(info.id)
    }

    return (
      <div className="posts">
        <i className={remove ? "fas fa-minus" : "fas fa-plus add-btn"} onClick={remove ? removeFromWatch: addToWatch}></i>
        <div>{info.id}</div>
        <div>{info.impressions}</div>
        <div>{info.clicks} </div>
        <div className="textcontent">{info.text}</div>
        <div>{new Date(info.created).toDateString()}</div>
      </div>
    );
}

export default Post