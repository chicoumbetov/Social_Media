import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
  return <div className={classes.item}>

    <img src='./../../../images/venice.jpg' alt='venice' />
    {props.message}
    <div>

      <button>
        {props.likesCount}
        <span> like</span>
      </button>
      <button className={classes.commentButton}>
        <span> Comment</span>
      </button>
      
    </div>

  </div>;
}

export default Post;