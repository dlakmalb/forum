import React, { Component } from 'react';

class AddPostForm extends Component {
    render() {
        const { title, content, hanldleChange, clickAddPost } = this.props;

        return (
            <div className="col-6 container">
                <h1 className="form-group">Add Post</h1>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <span className="required-field"> *</span>
                    <input
                        autoFocus
                        required
                        value={title}
                        id="title"
                        name="title"
                        className="form-control form-group"
                        placeholder="Enter post title"
                        onChange={(event) => hanldleChange(event)}
                    />
                    <label htmlFor="content">Content</label>
                    <textarea
                        rows="4"
                        value={content}
                        id="content"
                        name="content"
                        className="form-control text-area form-group"
                        placeholder="Enter post content"
                        onChange={(event) => hanldleChange(event)}
                    />
                    <button
                        className="btn btn-primary float-right"
                        onClick={clickAddPost}
                        disabled={title.trim() === ''}
                    >
                        Add Post
                    </button>
                </div>
            </div>
        );
    }
}

export default AddPostForm;
