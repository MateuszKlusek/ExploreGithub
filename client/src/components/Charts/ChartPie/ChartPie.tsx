// react
import { FC, useState, useEffect } from "react"

// styles
import * as S from "./ChartPie.styled"

// hooks
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// helpers
import { TopLanguageData } from "./../../../helpers/prepareDataForCharts"

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPie: FC<ChartProps> = ({ title, data }) => {
    // states
    const [chartData, setChartData] = useState<any>()


    useEffect(() => {
        const { labels, datasetData, colors } = TopLanguageData(data)

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
        {chartData && <Pie data={chartData} />}
    </S.ChartContainer>;
};

export default ChartPie;
