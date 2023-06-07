import { BlueButton, RedInput } from './BoardWrite.styles'


export default function BoardWriteUI(props) {
    
    return(
        <>
            <div>#################여기는 프리젠터입니다.#################</div>
            <div>
                작성자: <RedInput type="text" onChange={props.OnChangeWriter} defaultValue={props.data?.fetchBoard.writer}/>
                제목: <RedInput type="text" onChange={props.OnChangeTitle} defaultValue={props.data?.fetchBoard.title}/>
                내용: <RedInput type="text" onChange={props.OnChangeContents} defaultValue={props.data?.fetchBoard.contents}/>
                <BlueButton onClick={props.isEdit? props.onClickUpdate : props.onClickSubmit}>
                    {props.isEdit ? "수정": "등록" }하기
                </BlueButton>
            </div>
            <div>#################여기는 프리젠터입니다.#################</div>
        </>
    )
}