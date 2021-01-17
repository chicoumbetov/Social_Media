import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from './images/user.jpg';
import styles from './Users.module.css';

let User = ({ user, followingInProgress, unfollow, follow }) => {
    return <div >

        <div className={styles.userBlock}>
            <span>
                <div className={styles.avatar}>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                            className={styles.item}
                            alt='userPhoto' /> {/* photoUrl */}
                        {/*<textarea className={styles.textareaSize}
                                        placeholder=' Write smth to user'
                />*/}
                    </NavLink>

                </div>
                <div className={styles.button}>
                    {user.followed

                        ? <button disabled={followingInProgress
                            .some(id => id === user.id)}
                            onClick={() => { unfollow(user.id) }}>
                            Unfollow</button>

                        : <button disabled={followingInProgress
                            .some(id => id === user.id)}
                            onClick={() => { follow(user.id); }}>
                            Follow</button>
                    }
                </div>
            </span>

            <span>

                <div className={styles.namestyle}>{user.name}</div> {/*userName*/}
                <div className={styles.namestyle}>{user.status}</div>


                {/*
                <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div>
                */}

            </span>
        </div>

    </div>
}

export default User;