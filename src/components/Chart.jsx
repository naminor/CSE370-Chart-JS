import { React, useRef, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export default function Chart(props) {
    const chart = useRef(0);
    const canvas = useRef(0);
    
    useEffect(() => {
        if (!canvas.current) return;
        if (chart.current) chart.current.destroy();

        chart.current = new ChartJS(canvas.current, {
            type: props.type,
            data: {
                labels: props.labels,
                datasets: props.datasets
            },
            options: {
                responsive: 1
            }
        })
    }, [props.labels, props.datasets, props.type]);

    return (
        <div className="chart">
            <canvas ref={canvas}/>
        </div>
    )

}