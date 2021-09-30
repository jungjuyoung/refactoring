import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from '../reducers/user';

function FollowButton({ post }) {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  console.log(
    `FollowButton me: ${JSON.stringify(me)}, post.User.id: ${JSON.stringify(
      post.User.id
    )} `
  );

  const onClickFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickFollow}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
}
FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
