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
            projectName: 'Sample project',
            projectPages: [
                {
                    pageName: 'sample page',
                    tasks: [
                        {
                            taskName: 'sample task',
                            taskDesc: 'sample description',
                            taskTime: 3
                        },
                        {
                            taskName: 'sample task another',
                            taskDesc: 'another sample description',
                            taskTime: 5
                        }
                    ]
                },
                {
                    pageName: 'another sample page',
                    tasks: [
                        {
                            taskName: 'sample task',
                            taskDesc: 'sample description',
                            taskTime: 2
                        },
                        {
                            taskName: 'sample task another',
                            taskDesc: 'another sample description',
                            taskTime: 3
                        },
                        {
                            taskName: 'sample task another',
                            taskDesc: 'another sample description',
                            taskTime: 1
                        },
                        {
                            taskName: 'sample task another',
                            taskDesc: 'another sample description',
                            taskTime: 1
                        }
                    ]
                },
                {
                    pageName: 'another same thing',
                    tasks: [
                        {
                            taskName: 'sample task',
                            taskDesc: 'sample description',
                            taskTime: 6
                        },
                        {
                            taskName: 'sample task another',
                            taskDesc: 'another sample description',
                            taskTime: 2
                        }
                    ]
                }
            ],
            showAddPageModal: false,
            pageModalName: 'Добавить страницу',
            pageModalTitle: '',
            editPageId: null,
            viewStyle: 'edit'
        };
    }

    handleTimeChange(value, pageId, taskId) {
        this.setState(project =>
            project.projectPages[pageId].tasks[taskId].taskTime = parseInt(value)
        );
    }

    handleAddTask(title, description, pageId) {
        if (title.trim()) {
            this.setState(project => {
                    let tasks = project.projectPages[pageId].tasks;

                    tasks[tasks.length] = {
                        taskName: title,
                        taskDesc: description,
                        taskTime: 1
                    }
                }
            );

        }
    }

    handleDeleteTask(pageId, id) {
        this.setState(project => {
                this.setState(project => {
                    project.projectPages[pageId].tasks.splice(id, 1);
                });
            }
        );
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
            showAddPageModal: false,
            editPageId: null
        })
    }

    handleAddPage() {
        let title = this.refs.title.getValue().trim();

        if (title) {
            this.setState(project => {
                let projects = project.projectPages;

                projects[projects.length] = {
                    pageName: title,
                    tasks: []
                }
            });
        }

        this.setState({
            showAddPageModal: false
        });
    }

    handleSavePage() {
        let title = this.refs.title.getValue().trim();

        if (title) {
            let pages = this.state.projectPages;

            pages[this.state.editPageId].pageName = title;

            this.setState({
                projectPages: pages
            });
        }

        this.setState({
            showAddPageModal: false,
            editPageId: null
        });
    }

    handleEditPageName(id) {
        let modalTitle = this.state.projectPages[id].pageName;

        this.setState({
            editPageId: id,
            showAddPageModal: true,
            pageModalName: 'Редактировать страницу',
            pageModalTitle: modalTitle
        });
    }

    handleDeletePage(id) {
        this.setState(project => {
            project.projectPages.splice(id, 1);
        });
    }

    handlePagePosition(index, direction) {
        let newIndex;

        if (direction === 'top') {
            newIndex = index - 1;
        } else if (direction === 'bottom') {
            newIndex = index + 1;
        }

        let pages = this.state.projectPages;
        let oldElem = pages[index];

        pages.splice(index, 1);
        pages.splice(newIndex, 0, oldElem);

        this.setState({
            projectPages: pages
        });
    }

    handleTaskPosition(index, pageId, direction) {
        let newIndex;

        if (direction === 'top') {
            newIndex = index - 1;
        } else if (direction === 'bottom') {
            newIndex = index + 1;
        }

        let pages = this.state.projectPages;
        let tasks = pages[pageId].tasks;
        let oldElem = tasks[index];

        tasks.splice(index, 1);
        tasks.splice(newIndex, 0, oldElem);

        this.setState({
            projectPages: pages
        });
    }

    handleSetEditView() {
        this.setState({
            viewStyle: 'edit'
        })
    }

    handleSetTextView() {
        this.setState({
            viewStyle: 'text'
        })
    }

    getPageTime(index) {
        let sum = 0;

        this.state.projectPages[index].tasks.map((task) => {
            sum += task.taskTime;
        });

        return getTotalTime(sum);
    }

    getSum() {
        let sum = 0;

        this.state.projectPages.map(page => {
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
        return this.state.projectPages[pageId].tasks[id].taskName;
    }

    getModalEditTaskDescription(pageId, id) {
        return this.state.projectPages[pageId].tasks[id].taskDesc;
    }

    handleSaveTask(title, description, taskId, pageId) {
        if (title) {
            let pages = this.state.projectPages;

            pages[pageId].tasks[taskId].taskName = title;
            pages[pageId].tasks[taskId].taskDesc = description;

            this.setState({
                projectPages: pages
            });
        }
    }

    render() {
        let viewStyle = this.state.viewStyle;

        if (viewStyle === 'edit') {
            return(
                <section>
                    <div className="layout-table">
                        <h1 className="text-center">{this.state.projectName}</h1>

                        <div className="container text-right">
                            <ButtonGroup>
                                <Button onClick={this.handleSetEditView.bind(this)}><Glyphicon glyph="list-alt" /></Button>
                                <Button onClick={this.handleSetTextView.bind(this)}><Glyphicon glyph="align-left" /></Button>
                            </ButtonGroup>
                        </div>

                        {this.state.projectPages.map((page, index) =>
                            <Page
                                id={index}
                                key={index}
                                pageName={page.pageName}
                                pagesLength={this.state.projectPages.length}
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
                            <Button onClick={this.openAddPageDialog.bind(this)}><Glyphicon glyph="plus" /> Добавить страницу</Button>
                        </div>

                        <hr/>

                        <Result pages={this.state.projectPages} />

                        <p className="text-center">
                            <Button bsStyle="link">Отмена</Button>
                            <Button bsStyle="success">Сохранить</Button>
                        </p>
                    </div>

                    <Modal show={this.state.showAddPageModal} onHide={this.closeAddPageDialog.bind(this)}>
                        <Modal.Header>
                            <Modal.Title ref="modalname">{this.state.pageModalName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Input type="text" ref="title" placeholder="Название" value={this.state.pageModalTitle} onChange={this.changePageModalTitle.bind(this)}/>
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
        } else if (viewStyle === 'text') {
            return(
                <section>
                    <h1 className="text-center">{this.state.projectName}</h1>

                    <div className="container text-right">
                        <ButtonGroup>
                            <Button onClick={this.handleSetEditView.bind(this)}><Glyphicon glyph="list-alt" /></Button>
                            <Button onClick={this.handleSetTextView.bind(this)}><Glyphicon glyph="align-left" /></Button>
                        </ButtonGroup>
                    </div>

                    <div className="container">
                        <p>
                            <strong>{this.state.projectName}</strong>
                        </p>
                        <p>----------------------------------------</p>
                    </div>

                    {this.state.projectPages.map((page, index) => {
                        return(
                            <div className="container" key={index}>
                                <p>
                                    <strong>{page.pageName}</strong> <br/>
                                    {page.tasks.map((task, index) => {
                                        return(
                                            <span key={index}>{task.taskName} {getTotalTime(task.taskTime)} <br/></span>
                                        )
                                    })}
                                    <span>Суммарное время: {this.getPageTime(index)} </span>
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
