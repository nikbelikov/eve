import React, { Component } from 'react'
import Header from '../components/Header'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class ProjectList extends Component {
    render() {
        return(
            <section>
                <Header />

                <div className="container">
                    <h1 className="text-center">Проекты</h1>

                    <table className="table table-striped table-hover">
                        <tbody>
                            <tr>
                                <th width="5%">#</th>
                                <th>Название</th>
                                <th width="8%">&nbsp;</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><a href="#/project/1">project.name</a></td>
                                <td>
                                    <Button bsSize="xsmall"><Glyphicon glyph="pencil" /></Button>
                                    <Button bsSize="xsmall"><Glyphicon glyph="trash" /></Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr/>

                <section>
                    <div className="text-center">
                        <Button>Добавить проект</Button>
                    </div>
                </section>

                <br/><br/>
            </section>
        );
    }
}

export default ProjectList
