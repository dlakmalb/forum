import { Component } from 'react';
import { Link } from 'react-router-dom';

import constant from '../config/constants.json';
import http from '../config/httpService';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';

class Dashboard extends Component {
    state = { posts: [], originalPosts: [], searchText: '' };

    async componentDidMount() {
        const { data } = await http.get(`${constant.serverSideUrl}/posts`);

        this.setState({ posts: data.posts, originalPosts: data.posts });
    }

    changeSearchText = (searchText) => {
        const posts = [...this.state.originalPosts];

        if (searchText.trim() === '') this.setState({ posts });

        this.setState({ searchText });
    };

    search = (event) => {
        const { name } = event.target;
        const { searchText } = this.state;

        let posts = [];

        if (name === 'title') {
            posts = this.state.originalPosts.filter((post) =>
                post.title.includes(searchText)
            );
        } else {
            posts = this.state.originalPosts.filter((post) =>
                post.createdBy.includes(searchText)
            );
        }

        this.setState({ posts });
    };

    renderSearch = () => {
        return (
            <div className="px-3">
                <form
                    className="form-inline"
                    onClick={(event) => event.preventDefault()}
                >
                    <input
                        className="form-control mr-2 col-4"
                        placeholder="Please enter search text"
                        value={this.state.searchText}
                        onChange={(event) =>
                            this.changeSearchText(event.target.value)
                        }
                    />
                    <button
                        type="submit"
                        name="title"
                        className="btn btn-success mr-2"
                        onClick={this.search}
                    >
                        Search by Title
                    </button>
                    <button
                        type="submit"
                        name="user"
                        className="btn btn-secondary mr-2"
                        onClick={this.search}
                    >
                        Search by User
                    </button>
                    <div className="password-text">
                        (Search text is case sensitive)
                    </div>
                </form>
            </div>
        );
    };

    render() {
        const { posts } = this.state;

        const currentUrl = this.props.match.path;

        return (
            <>
                <NavBar
                    showLogout
                    brandName="XYZ Forum"
                    brandLink={constant.approvedPosts}
                    navItems={constant.navItems}
                />
                {this.renderSearch()}
                <div className="p-3 posts">
                    {Object.keys(posts).length ? (
                        posts.map((post) => {
                            return (
                                <Link
                                    to={`${currentUrl}/comment/${post.id}`}
                                    key={post.id}
                                >
                                    <PostCard post={post} />
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

export default Dashboard;
