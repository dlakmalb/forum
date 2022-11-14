import React, { Component } from 'react';

import constant from '../config/constants.json';
import http from '../config/httpService';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';

class DeletePosts extends Component {
    state = { posts: [] };

    async componentDidMount() {
        const userId = parseInt(localStorage.getItem('userId'));
        const isAdmin = localStorage.getItem('isAdmin');
        const url =
            `${constant.serverSideUrl}/posts-to-delete?userId=${userId}&` +
            `isAdmin=${isAdmin}`;

        const { data } = await http.get(url);

        this.setState({ posts: data.posts });
    }

    clickDelete = async (postId) => {
        const url = `${constant.serverSideUrl}/delete-post?postId=${postId}`;

        const { data } = await http.get(url);

        if (data.result === 'success') {
            const posts = this.state.posts.filter((post) => post.id !== postId);

            this.setState({ posts });
        }
    };

    render() {
        const { posts } = this.state;

        return (
            <>
                <NavBar
                    showLogout
                    brandName="XYZ Forum"
                    brandLink={constant.approvedPosts}
                    navItems={constant.navItems}
                />
                <div className="px-3">
                    <div className="alert alert-danger">
                        You can't undo after deleting a post. Are you sure you
                        want to delete the the post? If "Yes", please click
                        "Delete" button.
                    </div>
                </div>
                <div className="p-3 delete-posts">
                    {Object.keys(posts).length ? (
                        posts.map((post) => {
                            return (
                                <PostCard
                                    showDeleteButton
                                    key={post.id}
                                    post={post}
                                    clickDelete={this.clickDelete}
                                />
                            );
                        })
                    ) : (
                        <div className="d-flex justify-content-center">
                            Posts not available
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default DeletePosts;
