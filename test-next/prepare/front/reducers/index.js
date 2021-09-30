import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// (이전상태, 액션) => 다음상태
// user리듀서, post 리듀서 두개 합쳐주는것, SSR을 하기위해 HYDRATE라는것을 넣어주기위해 index라는걸 넣고 리듀서를 추가
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log(`@@@HYDRATE: ${HYDRATE}, action: ${action}`);
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
