import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import constant from '../config/constants.json';
import http from '../config/httpService';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';

class Posts extends Component {
    state = { posts: [] };

    async componentDidMount() {
        const { data } = await http.get(`${constant.serverSideUrl}/posts`);

        this.setState({ posts: data.posts });
    }

    render() {
        const { posts } = this.state;

        return (
            <>
                <NavBar brandLink="./" brandName="Home" />
                <div className="p-3 posts">
                    {Object.keys(posts).length ? (
                        posts.map((post) => {
                            return (
                                <Link to={`/post/${post.id}`} key={post.id}>
                                    <PostCard
                                        post={post}
                                        clickDelete={this.clickDelete}
                                    />
                                </Link>
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

export default Posts;
