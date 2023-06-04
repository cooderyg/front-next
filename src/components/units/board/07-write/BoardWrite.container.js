import BoardWriteUI from "./BoardWrite.presenter"
import { useMutation } from "@apollo/client"
import { CREATE_BOARD } from "./BoardWrite.queries"
import { useState } from "react"

export default function BoardWrite () {
    const [isActive, setIsActive] =useState(false)
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
       if(event.target.value && title && contents){
        setIsActive((prev) => prev = true)
       }
    }
    const OnChangeTitle = (event) => {
       setTitle(event.target.value) 
       if(writer && event.target.value && contents){
         setIsActive((prev) => prev = true)
       }
    }
    const OnChangeContents = (event) => {
       setContents(event.target.value) 
       if(writer && title && event.target.value){
         setIsActive((prev) => prev = true)
       }
       
    }
    
    return(
      <BoardWriteUI 
        onClickSubmit={onClickSubmit}
        OnChangeWriter={OnChangeWriter}
        OnChangeTitle={OnChangeTitle}
        OnChangeContents={OnChangeContents}
        isActive={isActive}
      />
    )
 
}