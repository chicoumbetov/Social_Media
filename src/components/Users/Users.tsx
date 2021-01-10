import React, {FC} from 'react';
import Paginator from '../common/Paginator/Paginator';
import styles from './Users.module.css';
import User from './User';
import { UserType } from '../../types/types';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    requestedPage: number
     onPageChanged: (pageNumber: number) => void
     portionSize?: number 
     usersData: Array<UserType>
     followingInProgress: Array<number>
     unfollow: (userId: number) => void
     follow: (userId: number) => void
}
let Users: FC<PropsType> = ({ requestedPage, totalUsersCount, pageSize, onPageChanged, usersData, ...props }) => {

    return <div>

        <Paginator requestedPage={requestedPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
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