import React from 'react';

const CommentCard = (props) => {
    const { comment, createdBy, createdAt } = props.comment;

    return (
        <div className="card comment border-primary mb-2 bg-light">
            <div className="card-body">
                <p className="comment-content">{comment}</p>
            </div>
            <div className="card-footer text-muted">
                <footer className="footer d-flex justify-content-between">
                    <cite>{createdBy}</cite>
                    <cite>{createdAt}</cite>
                </footer>
            </div>
        </div>
    );
};

export default CommentCard;
