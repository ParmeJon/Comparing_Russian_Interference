import React from 'react';

const Post = ({info}) => {
    return (
        <div>
            <h3>{info.id}</h3>
            <div>{info.text}</div>
            <div>{info.url}</div>
        </div>
    )
}

export default Post