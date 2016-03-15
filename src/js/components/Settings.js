import React, {Component} from 'react'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Header from './Header'

export default class Settings extends Component {
    render() {
        return(
            <section>
                <Header />

                <div className="container">
                    <h1 className="text-center">Настройки</h1>

                    <p><strong>Проекты:</strong></p>
                    <p>Риски: 10 %</p>

                    <hr/>

                    <p><strong>Удаление данных:</strong></p>
                    <p>ВНИМАНИЕ! Все проекты и настройки будут удалены без возможности восстановления!</p>
                    <p>
                        <Button bsStyle="danger">Удалить все данные</Button>
                    </p>
                </div>

                <br/><br/>
            </section>
        );
    }
}
