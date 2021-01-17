//import React from 'react';
import classes from './Post.module.css';
import venice from '../../../../images/venice.JPG'

const Post = (props) => {
  return <div className={classes.item}>
    <div className={classes.allitem}>
      <div>
        <img src={venice} alt='venice' />
      </div>

      <div className={classes.postMessage}>
        {props.message}
      </div>

      <div>

        <button className={classes.likeButton}>
          {props.likesCount}
          <span> like</span>
        </button>
        <button className={classes.commentButton}>
          <span> Comment</span>
        </button>

      </div>
    </div>


  </div>;
}

export default Post;