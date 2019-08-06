import React from 'react';

const Post = ({info}) => {
    return (
        <div className="posts">
            <div>{info.id}</div>
            <div>IM{info.impressions}</div>
            <div>CL{info.clicks} </div>
            <div>{info.text}</div>
            <div>{new Date(info.created).toDateString()}</div>
        </div>
    )
}

export default Post