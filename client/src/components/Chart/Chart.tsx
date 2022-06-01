// react
import { FC, useState, useEffect } from "react"

// styles
import * as S from "./Chart.styled"

// hooks
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartsMostStarred: FC<ChartProps> = ({ type, title }) => {
    // states
    const [chartData, setChartData] = useState<any>()

    useEffect(() => {
        setChartData({
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    // label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        })
    }, [])
    return <S.ChartContainer>
        <S.ChartTitle>{title}</S.ChartTitle>
        {chartData &&
            <Pie data={chartData} />
        }
    </S.ChartContainer>;
};

export default ChartsMostStarred;
