import { React, useState, useMemo } from "react";
import Chart from "./components/Chart";
import "./App.css";

const tenantURL = "https://webdev.cse.buffalo.edu/hci/api/api/example"

export default function App() {   
    const [labels, setLabels] = useState(0)
    const [datasets, setDatasets] = useState(0)

    function getLabels() {
        setLabels(["comic", "sans"])
    }

    function getDatasets() {
        setDatasets([{
            label: "Popularity",
            data: [100, 34]
        }])
    }

    useMemo(() => {
        getLabels();
        getDatasets();
    }, []);

    return (
        <div className="main-content">
            <Chart type="doughnut" labels={labels} datasets={datasets}/>
        </div>
    );
}
