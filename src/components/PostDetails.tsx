import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchComments, deleteComment, setFormOpen } from '../app/Comments';

interface Props {
  chosedPost: Post;
}

export const PostDetails: React.FC<Props> = ({ chosedPost }) => {
  const dispatch = useAppDispatch();

  const {
    items: allComments,
    loaded,
    hasError,
    isFormOpen,
  } = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchComments(chosedPost.id));
  }, [dispatch, chosedPost.id]);

  const howmany = allComments.length > 0;

  const handleDelete = (id: number) => {
    dispatch(deleteComment(id));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 className="title is-3" data-cy="PostTitle">
          #{chosedPost.id}: {chosedPost.title}
        </h2>

        <p data-cy="PostBody">{chosedPost.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && !howmany && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && howmany && (
          <>
            <p className="title is-4">Comments:</p>

            {allComments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDelete(comment.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !isFormOpen && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(setFormOpen(true))}
          >
            Write a comment
          </button>
        )}
      </div>

      {loaded && !hasError && isFormOpen && (
        <NewCommentForm postId={chosedPost.id} />
      )}
    </div>
  );
};
