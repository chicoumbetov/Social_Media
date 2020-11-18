import React from 'react';
import UserInfo from './UsersInfo/UserInfo';
import styles from './Users.module.css';
import * as Axios from 'axios';
import userPhoto from './images/user.png';

class Users extends React.Component {

    componentDidMount(){
        //if (this.props.usersData.length === 0) {}

        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage} &count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount (response.data.totalCount);
        });

    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber} &count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
        });
    }

    //getUsers = () => {};



    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
            
        }
        return <div>

            <div><UserInfo /></div>
            {/*div>button onClick={this.getUsers}>Get Users</button*/}
            {/*UserInfo*/}
            <div>
                {pages.map( p => {
                    return <span className = {this.props.currentPage === p && styles.selectedPage} 
                        onClick = {() => {this.onPageChanged(p); } } >{p}</span>
                })}
                
            </div>

            <div className={styles.usersPageBlock}>
                {
                    this.props.usersData.map(u => <div key={u.id} >

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
                                        ? <button onClick={() => { this.props.unfollow(u.id) }}>Unfollow</button>
                                        : <button onClick={() => { this.props.follow(u.id) }}>Follow</button>
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

        </div >;
    };

};

export default Users;