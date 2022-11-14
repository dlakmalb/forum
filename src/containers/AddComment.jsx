import React, { Component } from 'react';
import NavBar from '../components/NavBar';

import constant from '../config/constants.json';
import http from '../config/httpService';
import CommentCard from '../components/CommentCard';
import PostCard from "../components/PostCard";

class AddComments extends Component {
    state = { comments: [], comment: '', post: {} };

    async componentDidMount() {
        const postId = parseInt(this.props.match.params.id);
        const url = `${constant.serverSideUrl}/comments?postId=${postId}`;

        const { data } = await http.get(url);

        this.setState({ postId, comments: data.comments, post: data.post });
    }

    clickAddComment = async () => {
        const { comment, postId } = this.state;

        const url = `${constant.serverSideUrl}/add-comment`;
        const userId = parseInt(localStorage.getItem('userId'));

        const { data } = await http.post(url, {
            postId,
            userId,
            comment: comment.trim(),
        });

        const comments = [data.newComment, ...this.state.comments];

        this.setState({ comments, comment: '' });
    };

    render() {
        const { comments, comment, post } = this.state;

        return (
            <>
                <NavBar
                    showLogout
                    brandName="Home"
                    brandLink={constant.approvedPosts}
                />
                {Object.keys(post).length && (
                    <div className="px-3">
                        <PostCard post={post} />
                    </div>
                )}
                <div className="p-3 add-comment">
                    {Object.keys(comments).length ? (
                        comments.map((comment) => {
                            return (
                                <CommentCard
                                    key={comment.id}
                                    comment={comment}
                                />
                            );
                        })
                    ) : (
                        <div className="d-flex justify-content-center">
                            Comments not available
                        </div>
                    )}
                </div>
                <div className="p-3">
                    <textarea
                        autoFocus
                        required
                        rows="4"
                        value={comment}
                        id="validationTextarea"
                        placeholder="Add your comment here"
                        className="form-control text-area comment-border-color form-group"
                        onChange={(event) =>
                            this.setState({ comment: event.target.value })
                        }
                    />
                    <button
                        disabled={comment.trim() === ''}
                        className="btn btn-primary float-right"
                        onClick={this.clickAddComment}
                    >
                        Add Comment
                    </button>
                </div>
            </>
        );
    }
}

export default AddComments;
