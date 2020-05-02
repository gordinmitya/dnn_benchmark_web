import React from 'react';
import subscribeToResults from './storage';
import MeasurmentRow from './MeasurmentRow';

class ResultsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            measurements: [],
            frameworks: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.unsubscribe = subscribeToResults(this.props.firebase, (frameworks, measurements) => {
            this.setState({
                loading: false,
                frameworks,
                measurements,
            })
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    tableHead(frameworks) {
        return (
            <tr>
                <th>Device</th>
                {[...frameworks].flatMap(f => f[1].map(t=> f[0]+" "+t)).map(col=>(
                    <th key={col}>{col}</th>
                ))}
                <th>App version</th>
            </tr>
        )
    }

    render() {
        if (this.state.loading)
            return <p>Loading…</p>;
        return (
            <table>
                <thead>
                    {this.tableHead(this.state.frameworks)}
                </thead>
                <tbody>
                    {this.state.measurements.map(row => MeasurmentRow(this.state.frameworks, row))}
                </tbody>
            </table>
        );
    }
}

export default ResultsTable;