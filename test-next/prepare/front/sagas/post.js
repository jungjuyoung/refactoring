import { all, fork, takeLatest, throttle, put, delay } from 'redux-saga/effects'
import axios from 'axios'
import shortid from 'shortid'

import {
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_POST_FAILURE,
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	generateDummyPost,
	LOAD_POSTS_FAILURE,
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	REMOVE_POST_FAILURE,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

function loadPostsAPI(data){
	return axios.get(`/api/posts`, data)
}
function* loadPosts(action){
	try {
		// const result = yield call(loadPostsAPI, action.data);
		yield delay(2000)
		yield put({
			type: LOAD_POSTS_SUCCESS,
			data: generateDummyPost(10),
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: LOAD_POSTS_FAILURE,
			data: err.response.data,
		})
	}
}

function addPostAPI(data){
	return axios.post('/api/post', data)
}
function* addPost(action){
	try {
		// const result = yield call(addPostAPI, action.data);
		yield delay(2000)
		const id = shortid.generate()
		yield put({
			type: ADD_POST_SUCCESS,
			data: {
				id,
				content: action.data,
			},
		})
		yield put({
			type: ADD_POST_TO_ME,
			data: id,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: ADD_POST_FAILURE,
			data: err.response.data,
		})
	}
}

function removePostAPI(data){
	return axios.delete('/api/post', data)
}
function* removePost(action){
	try {
		// const result = yield call(removePostAPI, action.data);
		yield delay(2000)
		//post reducer
		yield put({
			type: REMOVE_POST_SUCCESS,
			data: action.data,
		})
		//user reducer
		yield put({
			type: REMOVE_POST_OF_ME,
			data: action.data,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: REMOVE_POST_FAILURE,
			data: err.response.data,
		})
	}
}

function addCommentAPI(data){
	return axios.post(`/api/post/${data.postId}/comment`, data)
}
function* addComment(action){
	try {
		// const result = yield call(addCommentAPI, action.data);
		yield delay(2000)
		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: action.data,
		})
	} catch (err) {
		console.error(err)
		yield put({
			type: ADD_COMMENT_FAILURE,
			data: err.response.data,
		})
	}
}

function* watchLoadPosts(){
	yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts)
}
function* watchAddPost(){
	yield takeLatest(ADD_POST_REQUEST, addPost)
	// takeLates는 debouncing 과 비슷하다
	// ADD_POST_REQUEST 이라는 액션이 실행될때까지 기다린다. 실행되면 addPost 제네레이터 실행
}
function* watchRemovePost(){
	yield takeLatest(REMOVE_POST_REQUEST, removePost)
	// takeLates는 debouncing 과 비슷하다
	// REMOVE_POST_REQUEST 이라는 액션이 실행될때까지 기다린다. 실행되면 removePost 제네레이터 실행
}
function* watchAddComment(){
	yield takeLatest(ADD_COMMENT_REQUEST, addComment)
	// takeLates는 debouncing 과 비슷하다
	// ADD_POST_REQUEST 이라는 액션이 실행될때까지 기다린다. 실행되면 addPost 제네레이터 실행
}

export default function* postSaga(){
	yield all([
		fork(watchAddPost),
		fork(watchLoadPosts),
		fork(watchRemovePost),
		fork(watchAddComment),
	])
}
