import { React, useState, useMemo } from "react";
import Chart from "./components/Chart";
import "./App.css";

const tenantURL = "https://webdev.cse.buffalo.edu/hci/api/api/example"
const authToken = "example|lNvqxpTqdrUkE4UNrjVInxeAET4smq_a1JMS5K-ic_0"

export default function App() {   
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])
    const [options, setOptions] = useState({})
    const [chartType, setChartType] = useState("doughnut")

    function getLabels() {
        setLabels(["comic", "sans"])
    }

    function getDatasets() {
        setDatasets([{
            label: "Popularity",
            data: [100, 34]
        }])
    }

    async function getColors() {
        const response = await fetch(`${tenantURL}/users?attributes=%7B%0A%20%20%22path%22%3A%20%22favoritecolor%22%2C%0A%20%20%22stringContains%22%3A%20%22%22%0A%7D`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }
        });
        if (response.status != 200) return;

        const responseBody = await response.json();
        const colors = responseBody[0].map(user => user.attributes.favoritecolor)
        const colorFrequencies = {}
        for (let c of colors) {
            colorFrequencies[c] ? colorFrequencies[c] += 1 : colorFrequencies[c] = 1
        }

        setLabels(Object.keys(colorFrequencies));
        setDatasets([{
            label: "Quantity",
            data: Object.values(colorFrequencies),
            backgroundColor: Object.keys(colorFrequencies),
            hoverBorderWidth: 2,
            hoverBorderColor: "#000"
        }]);
        setOptions({
            responsive: 1,
            plugins: {
                title: {
                    display: true,
                    text: "Users' Favorite Colors",
                    font: { size: 24 }
                }
            }
        });
    }
    
    useMemo(() => {
        // getLabels();
        // getDatasets();
        getColors();
        console.log(options)
    }, []);

    return (
        <div className="main-content">
            <Chart type={chartType} labels={labels} datasets={datasets} options={options}/>
            
            <label htmlFor="chart-type">Chart Type:</label>
            <select name="chart-type" onChange={(e) => setChartType(e.target.value)}>
                <option value="doughnut">Doughnut</option>
                <option value="pie">Pie</option>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
            </select> 
        </div>
    );
}
