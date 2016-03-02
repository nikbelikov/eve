import React, { Component } from 'react'
import { getTotalTime } from '../../functions'

export default class Result extends Component {
    getSum() {
        let sum = 0;

        this.props.pages.map((page) => {
            page.tasks.map((task) => {
                sum += task.taskTime;
            });
        });
        return sum;
    }

    getPageSum(index) {
        let sum = 0;

        this.props.pages[index].tasks.map(task => {
            sum += task.taskTime;
        });

        return getTotalTime(sum);
    }

    getResultTime() {
        return getTotalTime(this.getSum());
    }

    getRisksTime() {
        return getTotalTime(Math.round(this.getSum() * 10 / 100));
    }

    getResultRisksTime() {
        return getTotalTime(this.getSum() + Math.round(this.getSum() * 10 / 100));
    }

    goToPage(e) {
        let index = e.target.dataset.index;
        let el = document.querySelectorAll('h3')[index];
        let bodyRect = document.body.getBoundingClientRect();
        let elRect = el.getBoundingClientRect();
        let elPosition = elRect.top - bodyRect.top;

        // скролл до нужного блока
        window.scrollTo(0, elPosition);
    }

    render() {
        return(
            <div className="container">
                <h3 className="text-center"><span className="glyphicon glyphicon-time"></span> Итоговое время</h3>
                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <th width="5%">#</th>
                        <th>Страница</th>
                        <th width="30%">Время (ч.)</th>
                    </tr>
                    {this.props.pages.map((page, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><span data-index={index} onClick={this.goToPage}>{page.pageName}</span></td>
                            <td>{this.getPageSum(index)}</td>
                        </tr>
                    )}
                    <tr>
                        <td></td>
                        <td>
                            <small>Риски (10%)</small>
                        </td>
                        <td>
                            <small>{this.getRisksTime()}</small>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="pull-right"><strong>Итоговое время без рисков: {this.getResultTime()}</strong></p><br/><br/>
                <p className="pull-right"><strong>Итоговое время с рисками (10%): {this.getResultRisksTime()}</strong></p>
                <br/><br/><br/>
            </div>
        );
    }
}
