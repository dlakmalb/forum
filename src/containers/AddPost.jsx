import React, { Component } from 'react';

import constant from '../config/constants.json';
import http from '../config/httpService';
import AddPostForm from '../components/AddPostForm';
import NavBar from '../components/NavBar';

class AddPost extends Component {
    state = { title: '', content: '' };

    hanldleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    clickAddPost = async () => {
        const { title, content } = this.state;

        const url = `${constant.serverSideUrl}/add-post`;
        const userId = parseInt(localStorage.getItem('userId'));
        const isAdmin = localStorage.getItem('isAdmin');

        const { data } = await http.post(url, {
            userId,
            isAdmin: isAdmin === 'true',
            title: title.trim(),
            content: content.trim(),
        });

        if (data.result === 'success')
            isAdmin === 'true'
                ? this.props.history.replace(constant.approvedPosts)
                : this.props.history.replace(constant.pendingPosts);
    };

    render() {
        const { title, content } = this.state;

        return (
            <>
                <NavBar
                    showLogout
                    brandName="XYZ Forum"
                    brandLink={constant.approvedPosts}
                    navItems={constant.navItems}
                />
                <AddPostForm
                    title={title}
                    content={content}
                    hanldleChange={this.hanldleChange}
                    clickAddPost={this.clickAddPost}
                />
            </>
        );
    }
}

export default AddPost;
