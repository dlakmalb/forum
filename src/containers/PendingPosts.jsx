import React, { Component } from 'react';

import constant from '../config/constants.json';
import http from '../config/httpService';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';

const APPROVED = 'APPROVED';
const REJECTED = 'REJECTED';

class PendingPosts extends Component {
    state = { posts: [] };

    async componentDidMount() {
        const userId = parseInt(localStorage.getItem('userId'));
        const isAdmin = localStorage.getItem('isAdmin');
        const url =
            `${constant.serverSideUrl}${constant.pendingPosts}?userId=${userId}&` +
            `isAdmin=${isAdmin}`;

        const { data } = await http.get(url);

        this.setState({ posts: data.posts });
    }

    clickApprove = async (postId) => {
        const url =
            `${constant.serverSideUrl}/update-post?postId=${postId}&` +
            `status=${APPROVED}`;

        const { data } = await http.get(url);

        if (data.result === 'success') {
            const posts = this.state.posts.filter((post) => post.id !== postId);

            this.setState({ posts });
        }
    };

    clickReject = async (postId) => {
        const url =
            `${constant.serverSideUrl}/update-post?postId=${postId}&` +
            `status=${REJECTED}`;

        const { data } = await http.get(url);

        if (data.result === 'success') {
            const posts = this.state.posts.filter((post) => post.id !== postId);

            this.setState({ posts });
        }
    };

    render() {
        const { posts } = this.state;

        const showApproveButton = localStorage.getItem('isAdmin') === 'true';
        const showRejectButton = localStorage.getItem('isAdmin') === 'true';

        return (
            <>
                <NavBar
                    showLogout
                    brandName="XYZ Forum"
                    brandLink={constant.approvedPosts}
                    navItems={constant.navItems}
                />
                <div className="p-3 posts">
                    {Object.keys(posts).length ? (
                        posts.map((post) => {
                            return (
                                <PostCard
                                    showApproveButton={showApproveButton}
                                    showRejectButton={showRejectButton}
                                    key={post.id}
                                    post={post}
                                    clickApprove={this.clickApprove}
                                    clickReject={this.clickReject}
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

export default PendingPosts;
