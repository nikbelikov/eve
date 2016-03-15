import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class ButtonArrowTop extends Component {
    render() {
        return(
            <Button bsSize="xsmall" onClick={this.props.onTaskToTop.bind(this)}><Glyphicon glyph="triangle-top" /></Button>
        )
    }
}

class ButtonArrowBottom extends Component {
    render() {
        return(
            <Button bsSize="xsmall" onClick={this.props.onTaskToBottom.bind(this)}><Glyphicon glyph="triangle-bottom" /></Button>
        )
    }
}

export default class Task extends Component {
    hangleOnChange(e) {
        let value = e.target.value;

        if (value) {
            this.props.onTimeChange(value, this.props.id);
        }
    }

    deleteTask() {
        this.props.onDeleteTask(this.props.pageId, this.props.id);
    }

    editTask() {
        this.props.onEditTask(this.props.pageId, this.props.id);
    }

    handleTaskToTop() {
        this.props.onTaskPosition(this.props.id, this.props.pageId, 'top');
    }

    handleTaskToBottom() {
        this.props.onTaskPosition(this.props.id, this.props.pageId, 'bottom');
    }

    render() {
        return(
            <tr>
                <td>
                    <Button bsSize="xsmall" onClick={this.deleteTask.bind(this)}><Glyphicon glyph="trash" /></Button>
                    <Button bsSize="xsmall" onClick={this.editTask.bind(this)}><Glyphicon glyph="pencil" /></Button>
                </td>
                <td>{this.props.id + 1}</td>
                <td>{this.props.taskName}</td>
                <td>{this.props.taskDesc}</td>
                <td><input type="number" min="0" max="999" placeholder="ч." value={this.props.taskTime} onChange={this.hangleOnChange.bind(this)} /></td>
                <td>
                    {this.props.id === 0 ? null : <ButtonArrowTop onTaskToTop={this.handleTaskToTop.bind(this)} />}
                    {this.props.tasksLength === this.props.id + 1 ? null : <ButtonArrowBottom onTaskToBottom={this.handleTaskToBottom.bind(this)} />}
                </td>
            </tr>
        );
    }
}
