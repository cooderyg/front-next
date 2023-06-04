import { useState } from 'react'
import { BlueButton, RedInput } from './BoardWrite.styles'


export default function BoardWriteUI(props) {
    
    return(
        <>
            <div>#################여기는 프리젠터입니다.#################</div>
            <div>
                작성자: <RedInput type="text" onChange={props.OnChangeWriter}/>
                제목: <RedInput type="text" onChange={props.OnChangeTitle}/>
                내용: <RedInput type="text" onChange={props.OnChangeContents}/>
                <BlueButton 
                onClick={props.onClickSubmit}
                isActive={props.isActive}
                >
                    Graphql-api요청하기
                </BlueButton>
            </div>
            <div>#################여기는 프리젠터입니다.#################</div>
        </>
    )
}