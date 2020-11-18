import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
//console.log(classes)    this line to check that each key of classes has its unique name
//let classes {
//    'nav': 'its unique name',    
//    'item': 'its unique another name',
//    'active': 'new unique name'
//}

//let c1="item";
//let c2 = "active";
//   to have this "item active", we need to write next:
//let c = c1 + " " + c2
//let classesUsed = {`${classes.item} ${classes.active}`}
// {`${classes.item} ${classes.active}`} we put instead of classes.item if we want unique style for separate word

const Navbar = () => {
  return <nav className={classes.nav}>

    <div className={`${classes.item} ${classes.active}`}>
      <NavLink to="/profile" activeClassName={classes.activeLink}>Profile</NavLink>
    </div>

    <div className={`${classes.item} ${classes.active}`}>
      <NavLink to="/dialogs" activeClassName={classes.activeLink}>Messages</NavLink>
    </div>

    <div className={classes.item}>
      <NavLink to='/users' activeClassName={classes.activeLink}>Users</NavLink>
    </div>

    <div className={classes.item}>
      <NavLink to='/music' activeClassName={classes.activeLink}>Music</NavLink>
    </div>

    <div className={classes.item}>
      <NavLink to='/news' activeClassName={classes.activeLink}>News</NavLink>
    </div>

    <div className={classes.item}>
      <NavLink to='/settings' activeClassName={classes.activeLink}>Settings</NavLink>
    </div>

  </nav>
}

export default Navbar;