import React, {Component} from 'react'
import Button from 'react-bootstrap/lib/Button'

export default class Settings extends Component {
    render() {
        return(
            <section>
                <div className="container">
                    <h1 className="text-center">Настройки</h1>

                    <p><strong>Тема:</strong></p>
                    <p>
                        Светлая
                    </p>

                    <hr/>

                    <p><strong>Проекты:</strong></p>
                    <p>Риски <input type="number" min="10" max="30" value="10" /> %</p>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked />
                            Подтверждать удаление проектов
                        </label>
                    </div>

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
