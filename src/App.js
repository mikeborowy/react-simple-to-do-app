import React, { Component } from 'react';
import './App.css';

const initState = {
  comments: [{id: 0, comment: 'one comment'}, {id:1, comment:'second comments'}],
  selectedComment: { id: -1, comment: ''}
}

const Comment = (props) => {
  const {
    id, 
    comment,
    editMode, 
    onEditComment, 
    onDeleteComment,
    onSaveCommentChanges,
    onChange
  } = props;

  return (
      <li id={id}>
        {
          editMode 
          ? <React.Fragment>
              <input onChange = {onChange} value={comment}/>
              <button onClick={ () => onSaveCommentChanges(id)}>Save Changes</button>
            </React.Fragment>
          : <span>{comment}</span>
        }
        <button onClick={ () => onEditComment(id)}>Edit</button>
        <button onClick={ () => onDeleteComment(id)}>Delete</button>
      </li>
  );
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: initState.comments,
      selectedComment: initState.selectedComment
    };
  }

  setId = () => (new Date().getTime());

  onAddComment = (evt) => {
    evt.preventDefault();
    const newComment = {id:this.setId(), comment: this.commentITxt.value};
    const comments = [...this.state.comments, newComment];
    this.setState({comments});

    this.commentITxt.value = '';
  }

  onDeleteComment = (id) => {
    const comments = this.state.comments.filter( (comment) => (comment.id !== id ? comment : null) );
    this.setState({comments});
  }

  onEditComment = (id) => {
    const selectedComment = this.state.comments.find( (comment) => (comment.id === id) );
    this.setState({selectedComment});
  }

  onSaveCommentChanges = () => {
    const selectedComment = initState.selectedComment;
    this.setState({selectedComment});
  } 

  onChange = (evt) => {
    const selectedComment = Object.assign(this.state.selectedComment , {comment: evt.target.value});
    this.setState({selectedComment});
  }

  renderComments() {
    const comments = this.state.comments.map( (comment) => {
      comment.editMode = comment.id === this.state.selectedComment.id ? true : false;
      return <Comment 
                key={comment.id} 
                {...comment}
                onEditComment = {this.onEditComment}
                onDeleteComment = {this.onDeleteComment}
                onSaveCommentChanges = {this.onSaveCommentChanges}
                onChange = {this.onChange}
              />;
    });

    return comments;
  }

  render() {
    return (
      <div className="App">
        <form >
          <input ref={ input => {this.commentITxt = input} } placeholder="type comment"/>
          <button type='submit' onClick={this.onAddComment}>Add Comment</button>
        </form>
        <ul className='comments-list' onClick={this.onClickList}>
          {this.renderComments()}
        </ul>        
      </div>
    );
  }
}

export default App;
