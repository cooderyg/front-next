import { gql, useMutation } from "@apollo/client"

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

    const [createBoard] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {
      const result = await createBoard({
        variables:{                  // variables 이게 $역할을 함  
            writer: "유리",
            title: "안녕하세요!",
            contents: "반갑습니다."
        }
      })
      console.log(result)
    }
    return <button onClick={onClickSubmit}>Graphql-api요청하기</button>
    
}