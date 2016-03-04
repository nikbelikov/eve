// типы действий

export const ADD_PAGE = 'ADD_PAGE';
export const REMOVE_PAGE = 'REMOVE_PAGE';
export const EDIT_PAGE = 'EDIT_PAGE';
export const MOVE_PAGE = 'MOVE_PAGE';

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const MOVE_TASK = 'MOVE_TASK';
export const SET_TASK_TIME = 'SET_TASK_TIME';

export const SET_VIEW = 'SET_VIEW';


// другие константы

export const View = {
    EDIT: 'EDIT',
    TEXT: 'TEXT'
};


// генераторы действий

export function addPage(text) {
    return {
        type: ADD_PAGE,
        text
    }
}

export function removePage(pageId) {
    return {
        type: REMOVE_PAGE,
        pageId
    }
}

export function editPage(pageId, text) {
    return {
        type: EDIT_PAGE,
        pageId,
        text
    }
}

export function movePage(pageId, direction) {
    return {
        type: MOVE_PAGE,
        pageId,
        direction
    }
}

export function addTask(pageId, title, description) {
    return {
        type: ADD_TASK,
        pageId,
        title,
        description
    }
}

export function removeTask(pageId, taskId) {
    return {
        type: REMOVE_TASK,
        pageId,
        taskId
    }
}

export function editTask(pageId, taskId, title, description) {
    return {
        type: EDIT_TASK,
        pageId,
        taskId,
        title,
        description
    }
}

export function moveTask(pageId, taskId, direction) {
    return {
        type: MOVE_TASK,
        pageId,
        taskId,
        direction
    }
}

export function setTaskTime(pageId, taskId, value) {
    return {
        type: SET_TASK_TIME,
        pageId,
        taskId,
        value
    }
}

export function setView(view) {
    return {
        type: SET_VIEW,
        view
    }
}
