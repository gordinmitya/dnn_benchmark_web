import React from 'react';

export default function MeasurmentRow(frameworks, props) {
    let columns = [...frameworks].flatMap(tuple => {
        let fw = tuple[0];
        return tuple[1].map(type => {
            return props[fw+" "+type]
        })
    });
    console.log(columns);

    return (
        <tr key={props.uid}>
            <td>{props.device}</td>
            {columns.map(col => {
                if (col === undefined || col.benchmarkResult === undefined)
                    return <td>"X"</td>;
                else {
                    let payload = JSON.stringify(col);
                    let color = col.precisionResult.errors !== 0 ? 'red' : 'white';
                    return <td alt={payload} bgcolor={color}>{col.benchmarkResult.avg.toFixed(1)}</td>
                }
            })}
            <td>{props.appVersion}</td>
        </tr>
    );
}