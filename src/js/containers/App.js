import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    addPage,
    removePage,
    editPage,
    movePage,
    addTask,
    removeTask,
    editTask,
    moveTask,
    setTaskTime,
    setView
} from '../actions'
import Project from '../containers/Project'
import Settings from '../components/Settings'
import Header from '../components/Header'

class App extends Component {
    render() {
        const { dispatch, project } = this.props;

        return(
            <section>
                <Header />

                <Project
                    projectName={project.appData.projectName}
                    projectPages={project.appData.projectPages}
                    viewStyle={project.appData.viewStyle}
                    onAddPage={text => dispatch(addPage(text))}
                    onRemovePage={pageId => dispatch(removePage(pageId))}
                    onEditPage={(pageId, text) => dispatch(editPage(pageId, text))}
                    onMovePage={(pageId, direction) => dispatch(movePage(pageId, direction))}
                    onAddTask={(pageId, title, description) => dispatch(addTask(pageId, title, description))}
                    onRemoveTask={(pageId, taskId) => dispatch(removeTask(pageId, taskId))}
                    onEditTask={(pageId, taskId, title, description) => dispatch(editTask(pageId, taskId, title, description))}
                    onMoveTask={(pageId, taskId, direction) => dispatch(moveTask(pageId, taskId, direction))}
                    onSetTaskTime={(pageId, taskId, value) => dispatch(setTaskTime(pageId, taskId, value))}
                    onSetView={view => dispatch(setView(view))} />

                <p className="text-center">2016 &copy; Eve (α)</p>
            </section>
        );
    }
}

function select(state) {
    return {
        project: state
    }
}

export default connect(select)(App)
