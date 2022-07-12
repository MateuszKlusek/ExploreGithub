//@ts-nocheck 
// react
import { FC } from "react"

// styles
import * as S from "./TopReposSingleRepo.styled"

// assets
import FileFork from "./../../assets/code-fork-solid.svg"

// helper
import { formatSize } from "../../helpers/formatData";
import { LANGUAGE_COLORS } from "../../utils/languageColors"


const TopReposSingleRepo: FC<TopReposSingleRepoProps> = ({ data }) => {

    return (<S.TopReposSingleRepoContainer
        onClick={() => {
            window.open(data.html_url, '_blank')
        }}
    >
        <S.Title>{data.name}</S.Title>
        <S.Subtitle>{data.description}</S.Subtitle>
        <S.ButtomIconContainer>
            <S.Language >
                <S.Dot color={LANGUAGE_COLORS[data.language]} />
                {data.language !== null ? data.language : "undefined"}
            </S.Language>
            <S.Stars>{data.stargazers_count}</S.Stars>
            <S.Forks>
                <S.ForkIconImg src={FileFork} alt="fork icon"></S.ForkIconImg>
                <S.ForkText>{data.forks}</S.ForkText>
            </S.Forks>
            <S.Size>{data.size !== null && `${formatSize(data.size)} KB`} </S.Size>

        </S.ButtomIconContainer>


    </S.TopReposSingleRepoContainer >)
}

export default TopReposSingleRepo;
