import {
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
    projectName: 'Sample project',
    projectPages: [],
    viewStyle: View.EDIT
};

function appData(state = initialState, action) {
    switch (action.type) {
        case ADD_PAGE:
            return Object.assign({}, state, {
               projectPages: [...state.projectPages, {
                   pageName: action.text,
                   tasks: []
               }]
            });
        case REMOVE_PAGE:
            return Object.assign({}, state, {
                projectPages: [
                    ...state.projectPages.slice(0, action.pageId),
                    ...state.projectPages.slice(action.pageId + 1)
                ]
            });
        case EDIT_PAGE:
            return Object.assign({}, state, {
                projectPages: [
                    ...state.projectPages.slice(0, action.pageId),
                    {
                        pageName: action.text,
                        tasks: state.projectPages[action.pageId].tasks
                    },
                    ...state.projectPages.slice(action.pageId + 1)
                ]
            });
        case MOVE_PAGE:
            let newPageIndex = '';
            let pageId = action.pageId;

            if (action.direction === 1) {
                newPageIndex = pageId + 1;
            } else if (action.direction === -1) {
                newPageIndex = pageId - 1;
            }

            let pages = state.projectPages.slice(0);
            let oldPage = pages[pageId];

            pages.splice(pageId, 1);
            pages.splice(newPageIndex, 0, oldPage);

            return Object.assign({}, state, {
                projectPages: pages
            });
        case ADD_TASK:
            return Object.assign({}, state, {
                projectPages: [
                    ...state.projectPages.slice(0, action.pageId),
                    {
                        pageName: state.projectPages[action.pageId].pageName,
                        tasks: [
                            ...state.projectPages[action.pageId].tasks,
                            {
                                taskName: action.title,
                                taskDesc: action.description,
                                taskTime: 1
                            }
                        ]
                    },
                    ...state.projectPages.slice(action.pageId + 1)
                ]
            });
        case REMOVE_TASK:
            return Object.assign({}, state, {
                projectPages: [
                    ...state.projectPages.slice(0, action.pageId),
                    {
                        pageName: state.projectPages[action.pageId].pageName,
                        tasks: [
                            ...state.projectPages[action.pageId].tasks.slice(0, action.taskId),
                            ...state.projectPages[action.pageId].tasks.slice(action.taskId + 1)
                        ]
                    },
                    ...state.projectPages.slice(action.pageId + 1)
                ]
            });
        case EDIT_TASK:
            return Object.assign({}, state, {
                projectPages: [
                    ...state.projectPages.slice(0, action.pageId),
                    {
                        pageName: state.projectPages[action.pageId].pageName,
                        tasks: [
                            ...state.projectPages[action.pageId].tasks.slice(0, action.taskId),
                            {
                                taskName: action.title,
                                taskDesc: action.description,
                                taskTime: 1
                            },
                            ...state.projectPages[action.pageId].tasks.slice(action.taskId + 1)
                        ]
                    },
                    ...state.projectPages.slice(action.pageId + 1)
                ]
            });
        case MOVE_TASK:
            let newTaskIndex = '';

            if (action.direction === 1) {
                newTaskIndex = action.taskId + 1;
            } else if (action.direction === -1) {
                newTaskIndex = action.taskId - 1;
            }

            let tasks = state.projectPages[action.pageId].tasks.slice();
            let oldTask = tasks[action.taskId];

            tasks.splice(action.taskId, 1);
            tasks.splice(newTaskIndex, 0, oldTask);

            return Object.assign({}, state, {
                projectPages: [
                    ...state.projectPages.slice(0, action.pageId),
                    {
                        pageName: state.projectPages[action.pageId].pageName,
                        tasks: tasks
                    },
                    ...state.projectPages.slice(action.pageId + 1)
                ]
            });
        case SET_TASK_TIME:
            return Object.assign({}, state, {
                projectPages: [
                    ...state.projectPages.slice(0, action.pageId),
                    {
                        pageName: state.projectPages[action.pageId].pageName,
                        tasks: [
                            ...state.projectPages[action.pageId].tasks.slice(0, action.taskId),
                            {
                                taskName: state.projectPages[action.pageId].tasks[action.taskId].taskName,
                                taskDesc: state.projectPages[action.pageId].tasks[action.taskId].taskDesc,
                                taskTime: parseInt(action.value)
                            },
                            ...state.projectPages[action.pageId].tasks.slice(action.taskId + 1)
                        ]
                    },
                    ...state.projectPages.slice(action.pageId + 1)
                ]
            });
        case SET_VIEW:
            return Object.assign({}, state, {
                viewStyle: action.view
            });
        default:
            return state
    }
}

export default appData;
