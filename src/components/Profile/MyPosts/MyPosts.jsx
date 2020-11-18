import React from 'react';
//import { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import d from './MyPosts.module.css';
//import click from './MyPosts.module.css';
import Post from './Post/Post';

const maxLength30 = maxLengthCreator(30);

let AddNewPostForm = (props) => {
  return <form onSubmit={props.handleSubmit} >
    {/*//textarea when u r changed, pls call onPostChange*/}
    <div>
      <Field name="newPostText" component={Textarea}
        placeholder={"Post message"}
        validate={[required, maxLength30]} />
    </div>
    <div>
      {/*//button when u r clicked, pls call addPost*/}
      <button>Add post</button>
    </div>
  </form>
};
let AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm);

const MyPosts = React.memo(props => {
  let postsElements =
    [...props.postsData]
      .reverse()
      .map(NameLikes => <Post message={NameLikes.message} likesCount={NameLikes.likesCount} />);
  //oldArray postsData of newArray postsElements is in Profile.jsx
  //let newPostElement = React.createRef();
  //callback
  let onAddPost = (values) => {
    props.addPost(values.newPostText);
    //no rights: newPostElement.current.value = ''; //line serves to clean textarea after input
    //no right: state BLL must clean. props.updateNewPostText(' '); //therefore it's used this line to clean textarea in BLL level
  }

  return <div className={d.postsBlock}>
    <h4>My posts</h4>
    <AddNewPostFormRedux onSubmit={onAddPost} />
    <div className={d.posts}>
      {postsElements}
    </div>
  </div>
})

export default MyPosts;

/*
class MyPosts extends PureComponent {

  //no need shouldComponentUpdate which is in PureComponent
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;


  render() {
    console.log("Yo")
    console.log(this.props)

    let postsElements = this.props.postsData.map(NameLikes => <Post message={NameLikes.message} likesCount={NameLikes.likesCount} />);
    let onAddPost = (values) => {
      this.props.addPost(values.newPostText);
    }

    return <div className={d.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={d.posts}>
        {postsElements}
      </div>
    </div>
  }
}
*/