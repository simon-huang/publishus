import axios from 'axios';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';

import * as doc from './docActions.jsx';
import * as loading from './loadingActions.jsx';


export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    payload: value
  }
}

export function showMergeMenu() {
  return {
    type: "SHOWMERGEMENU"
  }
}

// API request to server to create a document
export function mergeDocument() {
  return (dispatch, getState) => {
    var states = getState();
    var res;
    var mergeRequest = {
      username: states.user.username,
      docName: states.doc.docName,
      collaboratorMessage: states.merge.mergeTitle,
      commitID: states.doc.currentCommit
    }
    axios.post('/api/doc/requestMerge', mergeRequest)
    .then(function(response) {
      dispatch(showMergeMenu());
      dispatch(loading.toggleToast(true, 'Merge request submitted!'));
    });
  }
}


// to validate of Merge Menu should be shown (if the person has made changes)
export function validateMerge () {
  return (dispatch, getState) => {
    var states = getState();
    var validateMergeInfo = {
      commitID: states.doc.currentCommit
    }
    axios.post('/api/doc/validateMerge', validateMergeInfo)
    .then(function(response) {
      if (response.data === true) {
        dispatch(showMergeMenu());
      } else {
        dispatch(loading.toggleToast(true, response.data));
      }
    });
  }
}

export function displayMerge () {
  return {
    type: "TOGGLE_DISPLAYMERGEREQUEST"
  }
}

export function displayMergeFalse () {
  return {
    type: "TOGGLE_DISPLAYMERGEREQUEST_FALSE"
  }
}

export function reviewPullRequest (data) {
  return (dispatch, getState) => {
    dispatch(doc.handleChange('mergeCommitID', data));
    axios.post('/api/doc/reviewPullRequest', {commitID: data})
    .then(function(response) {
      response = response.data
      dispatch(doc.handleChange('originContent', response.originContent));
      dispatch(doc.handleChange('diffContent', response.diffContent));
      dispatch(editMergeDiff());
      dispatch(displayMerge());
    })
  }
}


export function editMergeDiff() {
  return (dispatch, getState) => {
    var states = getState();

    // Convert master HTML back into EditorState
    const blocksFromHTML = convertFromHTML(states.merge.diffHtml);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML);
    const editorState = EditorState.createWithContent(contentState);

    dispatch({
      type: "POPULATE_MERGE_EDITOR",
      payload: {
        editorState: editorState,
      }
    });
  }
}

export function editingDiff(value) {
  return {
    type: "EDIT_DIFF_CONTENT",
    payload: value
  }
}
