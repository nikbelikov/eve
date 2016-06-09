import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    getPages,
    addProject
} from '../actions'
import Header from '../components/Header'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Modal from 'react-bootstrap/lib/Modal'
import Input from 'react-bootstrap/lib/Input'

class ProjectList extends Component {
    constructor() {
        super();

        this.state = {
            showAddProjectModal: false
        }
    }

    openAddProjectDialog() {
        this.setState({
            showAddProjectModal: true
        });
    }

    closeAddProjectDialog() {
        this.setState({
            showAddProjectModal: false
        });
    }

    handleAddProject() {
        let title = this.refs.title.getValue().trim();

        if (title) {
            this.props.dispatch(addProject(title));

            this.setState({
                showAddProjectModal: false
            });
        }
    }

    render() {
        const { dispatch, app } = this.props;

        return(
            <section>
                <Header />

                <div className="container">
                    <h1 className="text-center">Проекты</h1>

                    {app.projects.length > 0 ?
                        <table className="table table-striped table-hover">
                            <tbody>
                            <tr>
                                <th width="5%">#</th>
                                <th>Название</th>
                                <th width="8%">&nbsp;</th>
                            </tr>
                            {app.projects.map((project, index) => {
                                let url = "#/project/" + project.projectId;

                                return(
                                    <tr key={index}>
                                        <td>1</td>
                                        <td><a href={url} onClick={projectId => dispatch(getPages(project.projectId))}>{project.name}</a></td>
                                        <td>
                                            <Button bsSize="xsmall"><Glyphicon glyph="pencil" /></Button>
                                            <Button bsSize="xsmall"><Glyphicon glyph="trash" /></Button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        : ''}
                </div>

                <hr/>

                <section>
                    <div className="text-center">
                        <Button onClick={this.openAddProjectDialog.bind(this)}>Создать проект</Button>
                    </div>
                </section>

                <Modal show={this.state.showAddProjectModal} onHide={this.closeAddProjectDialog.bind(this)}>
                    <Modal.Header>
                        <Modal.Title>Создать проект</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input autoFocus ref="title" type="text" placeholder="Название" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="link" onClick={this.closeAddProjectDialog.bind(this)}>Отмена</Button>
                        <Button bsStyle="primary" onClick={this.handleAddProject.bind(this)}>Создать</Button>
                    </Modal.Footer>
                </Modal>
            </section>
        );
    }
}

function select(state) {
    return {
        app: state.appData
    }
}

export default connect(select)(ProjectList)
