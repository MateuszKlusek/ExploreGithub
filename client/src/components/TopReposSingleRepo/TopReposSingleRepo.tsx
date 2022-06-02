// react
import { FC } from "react"

// styles
import * as S from "./TopReposSingleRepo.styled"

// helper
import { formatSize } from "../../helpers/formatData";


const TopReposSingleRepo: FC<TopReposSingleRepoProps> = ({ data }) => {

    return (<S.TopReposSingleRepoContainer>
        <S.Title>{data.name}</S.Title>
        <S.Subtitle>{data.description}</S.Subtitle>
        <S.ButtomIconContainer>
            <S.Language>{data.language}</S.Language>
            <S.Stars>{data.stargazers_count}</S.Stars>
            <S.Forks>{data.forks}</S.Forks>
            <S.Size>{formatSize(data.size)} KB</S.Size>

        </S.ButtomIconContainer>


    </S.TopReposSingleRepoContainer>)
}

export default TopReposSingleRepo;
