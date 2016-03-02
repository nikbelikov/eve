import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Modal from 'react-bootstrap/lib/Modal'
import Input from 'react-bootstrap/lib/Input'
import Task from './Task'
import { getTotalTime } from '../../functions'

class ButtonArrowTop extends Component {
    render() {
        return(
            <Button bsSize="xsmall" onClick={this.props.onPageToTop.bind(this)}><Glyphicon glyph="triangle-top" /></Button>
        )
    }
}

class ButtonArrowBottom extends Component {
    render() {
        return(
            <Button bsSize="xsmall" onClick={this.props.onPageToBottom.bind(this)}><Glyphicon glyph="triangle-bottom" /></Button>
        )
    }
}

export default class Page extends Component {
    constructor() {
        super();

        this.state = {
            showAddTaskModal: false,
            taskModalName: 'Добавить задачу',
            taskModalTitle: '',
            taskModalDescription: '',
            editTaskId: null,
            editTaskPageId: null
        }
    }

    getResultTime() {
        let sum = 0;

        this.props.tasks.map((task) => {
            sum += task.taskTime;
        });

        return getTotalTime(sum);
    }

    handleTimeChange(value, taskId) {
        let pageId = this.props.id;
        this.props.onTimeChange(value, pageId, taskId);
    }

    openAddTaskDialog() {
        this.setState({
            showAddTaskModal: true
        });
    }

    closeAddTaskDialog() {
        this.setState({
            showAddTaskModal: false
        })
    }

    resetAddTaskDialog() {
        this.setState({
            taskModalTitle: '',
            taskModalDescription: '',
            editTaskId: null,
            editTaskPageId: null,
            taskModalName: 'Добавить задачу'
        })
    }

    addTask() {
        let title = this.refs.title.getValue();
        let description = this.refs.description.getValue();
        let pageId = this.props.id;

        if (title) {
            this.props.onAddTask(title, description, pageId);
        }

        this.setState({
            showAddTaskModal: false
        })
    }

    handleDeleteTask(pageId, id) {
        this.props.onDeleteTask(pageId, id);
    }

    handleEditTask(pageId, id) {
        this.setState({
            showAddTaskModal: true,
            editTaskId: id,
            editTaskPageId: pageId,
            taskModalName: 'Редактировать задачу',
            taskModalTitle: this.props.getModalEditTaskTitle(pageId, id),
            taskModalDescription: this.props.getModalEditTaskDescription(pageId, id)
        })
    }

    deletePage(id) {
        this.props.onDeletePage(id);
    }

    editPageName(id) {
        this.props.onEditPageName(id);
    }

    handlePageToTop() {
        this.props.onPagePotisition(this.props.id, 'top');
    }

    handlePageToBottom() {
        this.props.onPagePotisition(this.props.id, 'bottom');
    }

    handleTaskPosition(id, pageId, direction) {
        this.props.onTaskPosition(id, pageId, direction);
    }

    handleChangeModalTitle(e) {
        let value = e.target.value;

        this.setState({
            taskModalTitle: value
        });
    }

    handleChangeModalDescription(e) {
        let value = e.target.value;

        this.setState({
            taskModalDescription: value
        });
    }

    handleSaveTask() {
        this.props.onSaveTask(this.state.taskModalTitle, this.state.taskModalDescription, this.state.editTaskId, this.state.editTaskPageId);

        this.setState({
            showAddTaskModal: false
        })
    }

    render() {
        return(
            <div className="container">
                <h3 className="text-center">
                    {this.props.id === 0 ? null : <ButtonArrowTop onPageToTop={this.handlePageToTop.bind(this)} />}
                    {this.props.pagesLength === this.props.id + 1 ? null : <ButtonArrowBottom onPageToBottom={this.handlePageToBottom.bind(this)} />}
                    {this.props.pageName}
                    <Button bsSize="xsmall" onClick={this.deletePage.bind(this, this.props.id)}><Glyphicon glyph="minus" /></Button>
                    <Button bsSize="xsmall" onClick={this.editPageName.bind(this, this.props.id)}><Glyphicon glyph="edit" /></Button>
                </h3>
                <table className="table table-striped table-hover">
                    <tbody>
                    <tr>
                        <th width="8%"></th>
                        <th width="5%">#</th>
                        <th width="25%">Задача</th>
                        <th>Описание</th>
                        <th width="12%">Время (ч.)</th>
                        <th width="8%"></th>
                    </tr>
                    {this.props.tasks.map((task, index) =>
                        <Task
                            id={index}
                            pageId={this.props.id}
                            key={index}
                            taskName={task.taskName}
                            taskDesc={task.taskDesc}
                            taskTime={task.taskTime}
                            tasksLength={this.props.tasks.length}
                            onTimeChange={this.handleTimeChange.bind(this)}
                            onDeleteTask={this.handleDeleteTask.bind(this)}
                            onEditTask={this.handleEditTask.bind(this)}
                            onTaskPosition={this.handleTaskPosition.bind(this)} />
                    )}
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <Button bsStyle="link" onClick={this.openAddTaskDialog.bind(this)}>Добавить задачу</Button>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>

                <p className="pull-right"><strong>Итого ({this.props.pageName}): {this.getResultTime()}</strong></p>

                <Modal show={this.state.showAddTaskModal} onHide={this.closeAddTaskDialog.bind(this)} onExited={this.resetAddTaskDialog.bind(this)}>
                    <Modal.Header>
                        <Modal.Title>{this.state.taskModalName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            type="text"
                            ref="title"
                            placeholder="Название"
                            value={this.state.taskModalTitle}
                            onChange={this.handleChangeModalTitle.bind(this)} />
                        <Input
                            type="textarea"
                            ref="description"
                            placeholder="Описание"
                            value={this.state.taskModalDescription}
                            onChange={this.handleChangeModalDescription.bind(this)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="link" onClick={this.closeAddTaskDialog.bind(this)}>Отмена</Button>
                        {this.state.editTaskId !== null ?
                            <Button bsStyle="primary" onClick={this.handleSaveTask.bind(this)}>Сохранить</Button> :
                            <Button bsStyle="primary" onClick={this.addTask.bind(this)}>Добавить</Button>}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
