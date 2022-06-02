// react
import { FC, useState, useEffect } from "react"

// styles
import * as S from "./DoughnutChart.styled"

// hooks
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// helpers
import { StarsPerLanguageData } from "./../../../helpers/prepareDataForCharts"

ChartJS.register(...registerables);

const DoughnutChart: FC<ChartProps> = ({ title, data }) => {
    // states
    const [chartData, setChartData] = useState<any>()


    useEffect(() => {
        const { labels, datasetData, colors } = StarsPerLanguageData(data)

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
    }, [])
    return <S.ChartContainer>
        <S.ChartTitle>{title}</S.ChartTitle>
        {chartData && <Doughnut data={chartData} />}
    </S.ChartContainer>;
};

export default DoughnutChart;
