import BoardWriteUI from "./BoardWrite.presenter"
import { useMutation } from "@apollo/client"
import { CREATE_BOARD } from "./BoardWrite.queries"
import { useState } from "react"

export default function BoardWrite () {
    const [writer, setWriter] = useState()
    const [title, setTitle] = useState()
    const [contents, setContents] = useState()

    const [createBoard] = useMutation(CREATE_BOARD)

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
    const OnChangeWriter = (event) => {
       setWriter(event.target.value)
    }
    const OnChangeTitle = (event) => {
       setTitle(event.target.value) 
    }
    const OnChangeContents = (event) => {
       setContents(event.target.value) 
    }
 
    return(
      <BoardWriteUI 
        onClickSubmit={onClickSubmit}
        OnChangeWriter={OnChangeWriter}
        OnChangeTitle={OnChangeTitle}
        OnChangeContents={OnChangeContents}
      />
    )
 
}