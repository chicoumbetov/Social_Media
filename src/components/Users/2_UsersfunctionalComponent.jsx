import React from 'react';
import UserInfo from './UsersInfo/UserInfo';
import styles from './Users.module.css';
import * as Axios from 'axios';
import userPhoto from './images/user.png';

let users = (props) => {

    let getUsers = () => {
    if (props.usersData.length === 0) {

        Axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {

            props.setUsers(response.data.items);
        });
    }
}

    return (<div>
            <div><UserInfo /></div>
            <button onClick={getUsers}>Get Users</button>
            {/*UserInfo*/}

            <div className={styles.usersPageBlock}>
                {
                    props.usersData.map(u => <div key={u.id} >

                        <div className={styles.userBlock}>
                            <span>
                                <div className={styles.item}>
                                    <img src={u.photos.small != null ? u.photos.small : userPhoto} alt='userPhoto' /> {/* photoUrl */}
                                    <textarea className={styles.textareaSize}
                                        placeholder=' Write smth to user'
                                    />
                                </div>
                                <div className={styles.button}>
                                    {u.followed
                                        ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                        : <button onClick={() => { props.follow(u.id) }}>Follow</button>
                                    }
                                </div>
                            </span>

                            <span>

                                <div>{u.name}</div> {/*userName*/}
                                <div>{u.status}</div>


                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"}</div>

                            </span>
                        </div>

                    </div>)
                }
            </div>
    </div >);
    
}

export default users;