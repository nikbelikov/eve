import { combineReducers } from 'redux'
import { getPages } from './serverData'
import { generateId, chars, addProject } from './serverData'

import {
    ADD_PROJECT,
    SET_PROJECT_NAME,

    GET_PAGES,
    ADD_PAGE,
    REMOVE_PAGE,
    EDIT_PAGE,
    MOVE_PAGE,

    ADD_TASK,
    REMOVE_TASK,
    EDIT_TASK,
    MOVE_TASK,
    SET_TASK_TIME,

    SET_VIEW,

    View
} from './actions'

const initialState = {
    projects: [],
    projectPages: [],
    viewStyle: View.EDIT
};

function project(state, action) {
    switch (action.type) {
        case ADD_PROJECT:
            let projectId = generateId(chars, 20, false);

            addProject(projectId, action.title);

            return [...state, {
                projectId,
                name: action.title
            }];
        case SET_PROJECT_NAME:
            return action.title;
        default:
            return state
    }
}

function task(state, action) {
    switch (action.type) {
        case ADD_TASK:
            return {
                taskName: action.title,
                taskDesc: action.description,
                taskTime: 1
            };
        case REMOVE_TASK:
            return [
                ...state.slice(0, action.taskId),
                ...state.slice(action.taskId + 1)
            ];
        case EDIT_TASK:
            return [
                ...state.slice(0, action.taskId),
                {
                    taskName: action.title,
                    taskDesc: action.description,
                    taskTime: 1
                },
                ...state.slice(action.taskId + 1)
            ];
        case MOVE_TASK:
            let newTaskIndex = '';

            if (action.direction === 1) {
                newTaskIndex = action.taskId + 1;
            } else if (action.direction === -1) {
                newTaskIndex = action.taskId - 1;
            }

            let tasks = state[action.pageId].tasks.slice();
            let oldTask = tasks[action.taskId];

            tasks.splice(action.taskId, 1);
            tasks.splice(newTaskIndex, 0, oldTask);

            return [
                ...state.slice(0, action.pageId),
                {
                    pageName: state[action.pageId].pageName,
                    tasks: tasks
                },
                ...state.slice(action.pageId + 1)
            ];
        case SET_TASK_TIME:
            return [
                ...state.slice(0, action.taskId),
                {
                    taskName: state[action.taskId].taskName,
                    taskDesc: state[action.taskId].taskDesc,
                    taskTime: parseInt(action.value)
                },
                ...state.slice(action.taskId + 1)
            ];
        default:
            return state
    }
}

function pages(state, action) {
    switch (action.type) {
        case GET_PAGES:
            return getPages(action.projectId);
        case ADD_PAGE:
            return [...state, {
                pageName: action.text,
                tasks: []
            }];
        case REMOVE_PAGE:
            return [
                ...state.slice(0, action.pageId),
                ...state.slice(action.pageId + 1)
            ];
        case EDIT_PAGE:
            return [
                ...state.slice(0, action.pageId),
                {
                    pageName: action.text,
                    tasks: state[action.pageId].tasks
                },
                ...state.slice(action.pageId + 1)
            ];
        case MOVE_PAGE:
            let newPageIndex = '';
            let pageId = action.pageId;

            if (action.direction === 1) {
                newPageIndex = pageId + 1;
            } else if (action.direction === -1) {
                newPageIndex = pageId - 1;
            }

            let pages = state.slice(0);
            let oldPage = pages[pageId];

            pages.splice(pageId, 1);
            pages.splice(newPageIndex, 0, oldPage);

            return pages;
        case ADD_TASK:
            return [
                ...state.slice(0, action.pageId),
                {
                    pageName: state[action.pageId].pageName,
                    tasks: [
                        ...state[action.pageId].tasks,
                        task(undefined, action)
                    ]
                },
                ...state.slice(action.pageId + 1)
            ];
        case REMOVE_TASK:
            return [
                ...state.slice(0, action.pageId),
                {
                    pageName: state[action.pageId].pageName,
                    tasks: task(state[action.pageId].tasks, action)
                },
                ...state.slice(action.pageId + 1)
            ];
        case EDIT_TASK:
            return [
                ...state.slice(0, action.pageId),
                {
                    pageName: state[action.pageId].pageName,
                    tasks: task(state[action.pageId].tasks, action)
                },
                ...state.slice(action.pageId + 1)
            ];
        case MOVE_TASK:
            let newTaskIndex = '';

            if (action.direction === 1) {
                newTaskIndex = action.taskId + 1;
            } else if (action.direction === -1) {
                newTaskIndex = action.taskId - 1;
            }

            let tasks = state[action.pageId].tasks.slice();
            let oldTask = tasks[action.taskId];

            tasks.splice(action.taskId, 1);
            tasks.splice(newTaskIndex, 0, oldTask);

            return [
                ...state.slice(0, action.pageId),
                {
                    pageName: state[action.pageId].pageName,
                    tasks: tasks
                },
                ...state.slice(action.pageId + 1)
            ];
        case SET_TASK_TIME:
            return [
                ...state.slice(0, action.pageId),
                {
                    pageName: state[action.pageId].pageName,
                    tasks: task(state[action.pageId].tasks, action)
                },
                ...state.slice(action.pageId + 1)
            ];
        default:
            return state
    }
}

function view(state, action) {
    switch (action.type) {
        case SET_VIEW:
            return action.view;
        default:
            return state
    }
}

function appData(state = initialState, action) {
    return {
        projects: project(state.projects, action),
        projectPages: pages(state.projectPages, action),
        viewStyle: view(state.viewStyle, action)
    }
}

export default appData;
