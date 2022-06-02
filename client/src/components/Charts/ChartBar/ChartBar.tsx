// react
import { FC, useState, useEffect } from "react"

// styles
import * as S from "./ChartBar.styled"

// hooks
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// helpers
import { MostStarredData } from "./../../../helpers/prepareDataForCharts"

ChartJS.register(...registerables);

const ChartBar: FC<ChartProps> = ({ title, data }) => {
    // states
    const [chartData, setChartData] = useState<any>()
    const [options, setOptions] = useState<any>()


    useEffect(() => {
        const { labels, datasetData, colors } = MostStarredData(data)


        setChartData({
            labels: labels,
            datasets: [
                {
                    data: datasetData,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                },
            ],
        })
        setOptions({
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 45
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }

        })
    }, [])
    return <S.ChartContainer>
        <S.ChartTitle>{title}</S.ChartTitle>
        {chartData && <Bar data={chartData} options={options} />}
    </S.ChartContainer>;
};

export default ChartBar;
