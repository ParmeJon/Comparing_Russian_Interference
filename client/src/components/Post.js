import React from 'react';

const Post = ({info}) => {
    return (
        <div className="posts">
            <div>{info.id}</div>
            <div>{info.impressions}</div>
            <div>{info.clicks} </div>
            <div className="textcontent">{info.text}</div>
            <div>{new Date(info.created).toDateString()}</div>
        </div>
    )
}

export default Post