import React, { Component } from 'react';
import NavBar from '../components/NavBar';

import constant from '../config/constants.json';
import http from '../config/httpService';
import CommentCard from '../components/CommentCard';
import PostCard from '../components/PostCard';

class Comments extends Component {
    state = { comments: [], post: {} };

    async componentDidMount() {
        const postId = this.props.match.params.id;
        const url = `${constant.serverSideUrl}/comments?postId=${postId}`;

        const { data } = await http.get(url);

        this.setState({ comments: data.comments, post: data.post });
    }

    render() {
        const { comments, post } = this.state;

        return (
            <>
                <NavBar brandLink="/posts" brandName="Go to posts" />
                {Object.keys(post).length && (
                    <div className="px-3">
                        <PostCard post={post} />
                    </div>
                )}
                <div className="p-3 comments">
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
            </>
        );
    }
}

export default Comments;
