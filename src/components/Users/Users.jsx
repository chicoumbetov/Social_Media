import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import styles from './Users.module.css';
import User from './User';

let Users = ({ requestedPage, totalItemsCount, pageSize, onPageChanged, usersData, ...props }) => {

    return <div>

        <Paginator requestedPage={requestedPage} onPageChanged={onPageChanged}
            totalItemsCount={totalItemsCount} pageSize={pageSize} />
        {/* totalItemsCount*/}

        <div className={styles.usersPageBlock}>
            {
                usersData.map(u => <User user={u}
                    followingInProgress={props.followingInProgress}
                    key={u.id}
                    follow={props.follow}
                    unfollow={props.unfollow} />
                )
            }
        </div>

    </div >;
}

export default Users;