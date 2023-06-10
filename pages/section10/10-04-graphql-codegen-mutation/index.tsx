import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { IMutation, IMutationCreateBoardArgs } from "../../../src/commons/types/generated/types"

const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $title: String, $contents: String){

        createBoard(writer: $writer, title: $title, contents: $contents){
            _id
            number
            message
        }
    }
`



export default function GraphqlMutationPage () {
    const [writer, setWriter] = useState()
    const [title, setTitle] = useState()
    const [contents, setContents] = useState()

    //const [createBoard] = useMutation<결과타입, 변수타입>(CREATE_BOARD)
    const [createBoard] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(CREATE_BOARD)

    const onClickSubmit = async () => {
      const result = await createBoard({
        variables:{                  // variables 이게 $역할을 함  
            writer,
            title,
            contents,
        }
      })
      console.log(result)
    }
    // const OnChangeWriter = (event) => {
    //    setWriter(event.target.value)
    // }
    // const OnChangeTitle = (event) => {
    //    setTitle(event.target.value) 
    // }
    // const OnChangeContents = (event) => {
    //    setContents(event.target.value) 
    // }
    return (
    <>
       {/* 작성자: <input type="text" onChange={OnChangeWriter}/>
       제목: <input type="text" onChange={OnChangeTitle}/>
       내용: <input type="text" onChange={OnChangeContents}/> */}
        <button onClick={onClickSubmit}>Graphql-api요청하기</button>
    </>
    )
    
}