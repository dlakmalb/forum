import React from 'react';

const PostCard = (props) => {
    const { id, title, content, status, createdBy, createdAt } = props.post;

    const lowerCaseStatus = status.toLowerCase();
    const postStatus =
        lowerCaseStatus.charAt(0).toUpperCase() + lowerCaseStatus.slice(1);

    const showUpdateButtons =
        (props.hasOwnProperty('showApproveButton') &&
            props.showApproveButton) ||
        (props.hasOwnProperty('showRejectButton') && props.showRejectButton);

    return (
        <div className="card mb-2 bg-light">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <p className="post-title">{title}</p>
                    {props.hasOwnProperty('showDeleteButton') ? (
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => props.clickDelete(id)}
                        >
                            Delete
                        </button>
                    ) : null}
                    {showUpdateButtons ? (
                        <div>
                            {props.hasOwnProperty('showApproveButton') &&
                                props.showApproveButton && (
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm mr-2"
                                        onClick={() => props.clickApprove(id)}
                                    >
                                        Approve
                                    </button>
                                )}
                            {props.hasOwnProperty('showRejectButton') &&
                                props.showRejectButton && (
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => props.clickReject(id)}
                                    >
                                        Reject
                                    </button>
                                )}
                        </div>
                    ) : null}
                </div>
                <p className="post-content">{content}</p>
            </div>
            <div className="card-footer text-muted">
                <footer className="footer d-flex justify-content-between">
                    <div>
                        <cite>{createdBy}</cite>
                        <cite>
                            {props.hasOwnProperty('showDeleteButton')
                                ? ` | (${postStatus} post)`
                                : null}
                        </cite>
                    </div>
                    <cite>{createdAt}</cite>
                </footer>
            </div>
        </div>
    );
};

export default PostCard;
