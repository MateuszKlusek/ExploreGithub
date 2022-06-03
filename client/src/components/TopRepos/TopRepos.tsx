//@ts-nocheck 
// react
import { FC, useState, useEffect } from "react"

// helpers
import { TopReposData } from "../../helpers/prepareDataForTopRepos";

// components
import TopReposSingleRepo from "../TopReposSingleRepo/TopReposSingleRepo";

// styles
import * as S from "./TopRepos.styled"




const TopRepos: FC<TopReposProps> = ({ data }) => {
    // states
    const [reposData, setReposData] = useState<any>([])

    useEffect(() => {
        setReposData(TopReposData(data))
    }, [])

    return (
        <S.TopReposContainer>
            <S.Title>Top Repos</S.Title>
            <S.Subtitle> with specified languages</S.Subtitle>
            <S.Container>
                {reposData.map((el: any, idx: any) => (
                    <TopReposSingleRepo key={idx} data={el} />
                ))}
            </S.Container>
        </S.TopReposContainer>
    )
};

export default TopRepos;
