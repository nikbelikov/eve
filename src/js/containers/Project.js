import React, {Component} from 'react'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Modal from 'react-bootstrap/lib/Modal'
import Input from 'react-bootstrap/lib/Input'
import Page from '../components/Project/Page'
import Result from '../components/Project/Result'
import { getTotalTime } from '../../js/functions'

export default class Project extends Component {
    constructor() {
        super();

        this.state = {
            showAddPageModal: false,
            pageModalName: 'Добавить страницу',
            pageModalTitle: '',
            editPageId: null
        };
    }

    handleTimeChange(value, pageId, taskId) {
        this.props.onSetTaskTime(pageId, taskId, value);
    }

    handleAddTask(title, description, pageId) {
        if (title.trim()) {
            this.props.onAddTask(pageId, title, description);
        }
    }

    handleDeleteTask(pageId, id) {
        this.props.onRemoveTask(pageId, id);
    }

    openAddPageDialog() {
        this.setState({
            showAddPageModal: true,
            pageModalName: 'Добавить страницу',
            pageModalTitle: ''
        });
    }

    closeAddPageDialog() {
        this.setState({
            showAddPageModal: false
        })
    }

    resetAddPageDialog() {
        this.setState({
            editPageId: null
        })
    }

    handleAddPage() {
        let title = this.refs.title.getValue().trim();

        if (title) {
            this.props.onAddPage(title);
        }

        this.setState({
            showAddPageModal: false
        });
    }

    handleSavePage() {
        let title = this.refs.title.getValue().trim();

        if (title) {
            this.props.onEditPage(this.state.editPageId, title);
        }

        this.setState({
            showAddPageModal: false
        });
    }

    handleEditPageName(id) {
        let modalTitle = this.props.projectPages[id].pageName;

        this.setState({
            editPageId: id,
            showAddPageModal: true,
            pageModalName: 'Редактировать страницу',
            pageModalTitle: modalTitle
        });
    }

    handleDeletePage(id) {
        this.props.onRemovePage(id);
    }

    handlePagePosition(index, direction) {
        if (direction === 'top') {
            this.props.onMovePage(index, -1);
        } else if (direction === 'bottom') {
            this.props.onMovePage(index, 1);
        }
    }

    handleTaskPosition(index, pageId, direction) {
        if (direction === 'top') {
            this.props.onMoveTask(pageId, index, -1);
        } else if (direction === 'bottom') {
            this.props.onMoveTask(pageId, index, 1);
        }
    }

    handleSetEditView() {
        this.props.onSetView('EDIT');
    }

    handleSetTextView() {
        this.props.onSetView('TEXT');
    }

    getPageTime(index) {
        let sum = 0;

        this.props.projectPages[index].tasks.map((task) => {
            sum += task.taskTime;
        });

        return getTotalTime(sum);
    }

    getSum() {
        let sum = 0;

        this.props.projectPages.map(page => {
            page.tasks.map(task => {
                sum += task.taskTime;
            })
        });
        return sum;
    }

    getResultTime() {
        return getTotalTime(this.getSum());
    }

    getRisksTime() {
        return getTotalTime(this.getSum() + Math.round(this.getSum() * 10 / 100));
    }

    changePageModalTitle() {
        let value = this.refs.title.getValue();

        this.setState({
            pageModalTitle: value
        });
    }

    getModalEditTaskTitle(pageId, id) {
        return this.props.projectPages[pageId].tasks[id].taskName;
    }

    getModalEditTaskDescription(pageId, id) {
        return this.props.projectPages[pageId].tasks[id].taskDesc;
    }

    handleSaveTask(title, description, taskId, pageId) {
        if (title) {
            this.props.onEditTask(pageId, taskId, title, description);
        }
    }

    render() {
        let viewStyle = this.props.viewStyle;

        if (viewStyle === 'EDIT') {
            return(
                <section>
                    <div className="container text-right">
                        <h1 className="text-center">{this.props.projectName}</h1>
                        <ButtonGroup>
                            <Button onClick={this.handleSetEditView.bind(this)}><Glyphicon glyph="list-alt" /></Button>
                            <Button onClick={this.handleSetTextView.bind(this)}><Glyphicon glyph="align-left" /></Button>
                        </ButtonGroup>
                    </div>

                    {this.props.projectPages.map((page, index) =>
                        <Page
                            id={index}
                            key={index}
                            pageName={page.pageName}
                            pagesLength={this.props.projectPages.length}
                            tasks={page.tasks}
                            onTimeChange={this.handleTimeChange.bind(this)}
                            onAddTask={this.handleAddTask.bind(this)}
                            onDeleteTask={this.handleDeleteTask.bind(this)}
                            onSaveTask={this.handleSaveTask.bind(this)}
                            onDeletePage={this.handleDeletePage.bind(this)}
                            onEditPageName={this.handleEditPageName.bind(this)}
                            onPagePosition={this.handlePagePosition.bind(this)}
                            onTaskPosition={this.handleTaskPosition.bind(this)}
                            getModalEditTaskTitle={this.getModalEditTaskTitle.bind(this)}
                            getModalEditTaskDescription={this.getModalEditTaskDescription.bind(this)} />
                    )}

                    <hr/>

                    <div className="text-center">
                        <Button onClick={this.openAddPageDialog.bind(this)}>Добавить страницу</Button>
                    </div>

                    <hr/>

                    {this.props.projectPages.length > 0 ? <Result pages={this.props.projectPages} /> : ''}

                    <Modal show={this.state.showAddPageModal} onHide={this.closeAddPageDialog.bind(this)} onExited={this.resetAddPageDialog.bind(this)}>
                        <Modal.Header>
                            <Modal.Title>{this.state.pageModalName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Input autoFocus type="text" ref="title" placeholder="Название" value={this.state.pageModalTitle} onChange={this.changePageModalTitle.bind(this)}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="link" onClick={this.closeAddPageDialog.bind(this)}>Отмена</Button>
                                {this.state.editPageId !== null ?
                                    <Button bsStyle="primary" onClick={this.handleSavePage.bind(this)}>Сохранить</Button> :
                                    <Button bsStyle="primary" onClick={this.handleAddPage.bind(this)}>Добавить</Button>}
                        </Modal.Footer>
                    </Modal>
                </section>
            );
        } else if (viewStyle === 'TEXT') {
            return(
                <section>
                    <div className="container text-right">
                        <h1 className="text-center">{this.props.projectName}</h1>
                        <ButtonGroup>
                            <Button onClick={this.handleSetEditView.bind(this)}><Glyphicon glyph="list-alt" /></Button>
                            <Button onClick={this.handleSetTextView.bind(this)}><Glyphicon glyph="align-left" /></Button>
                        </ButtonGroup>
                    </div>

                    <div className="container">
                        <p>
                            <strong>{this.props.projectName}</strong>
                        </p>
                        <p>----------------------------------------</p>
                    </div>

                    {this.props.projectPages.map((page, index) => {
                        return(
                            <div className="container" key={index}>
                                <p>
                                    <strong>{page.pageName}</strong> <br/>
                                    {page.tasks.map((task, index) => {
                                        return(
                                            <span key={index}>{task.taskName} {getTotalTime(task.taskTime)} <br/></span>
                                        )
                                    })}
                                    <span>Итого: {this.getPageTime(index)} </span>
                                </p>
                                <p>----------------------------------------</p>
                            </div>
                        )
                    })}

                    <div className="container">
                        <p>
                            <strong>Итоговое время без рисков: {this.getResultTime()}</strong> <br/>
                            <strong>Итоговое время с рисками: {this.getRisksTime()}</strong>
                        </p>
                    </div>
                </section>
            );
        }
    }
}
