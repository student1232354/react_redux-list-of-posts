import classNames from 'classnames';
/*eslint-disable*/
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect } from 'react';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './app/Users';
import { fetchPostsByUser, togglePostId } from './app/Posts';

export const App = () => {
  const dispatch = useAppDispatch();

  const {
    items: allPost,
    loading: thisLoader,
    error: smthwrong,
    selectedUserId: ChosenId,
    selectedPostId: postId,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (ChosenId === 0) {
      return;
    }

    dispatch(fetchPostsByUser(ChosenId));
  }, [dispatch, ChosenId]);

  const chosedPost = allPost.find(post => post.id === postId);
  const SpostsExist = allPost.length > 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>
              <div className="block" data-cy="MainContent">
                {ChosenId === 0 && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {thisLoader && <Loader />}

                {smthwrong && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {ChosenId !== 0 &&
                  !thisLoader &&
                  !smthwrong &&
                  !SpostsExist && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {SpostsExist && (
                  <div className="block" data-cy="PostsList">
                    <p className="title is-4">Posts:</p>
                    <table className="table is-fullwidth is-striped is-hoverable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th className="has-text-right"> </th>
                        </tr>
                      </thead>

                      <tbody>
                        {allPost.map(post => (
                          <tr key={post.id} data-cy="Post">
                            <td
                              className="has-text-weight-bold"
                              data-cy="PostId"
                            >
                              {post.id}
                            </td>
                            <td>{post.title}</td>
                            <td className="has-text-right is-vcentered">
                              <button
                                type="button"
                                className={classNames(
                                  'button',
                                  'is-link',
                                  'is-small',
                                  { 'is-light': post.id !== postId },
                                )}
                                data-cy="PostButton"
                                onClick={() => dispatch(togglePostId(post.id))}
                              >
                                {post.id === postId ? 'Close' : 'Open'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': postId !== 0 },
            )}
          >
            <div className="tile is-child box is-success ">
              {chosedPost && <PostDetails chosedPost={chosedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
