import { gql, useMutation } from "@apollo/client"

const CREATE_BOARD = gql`
    mutation{
        createBoard(writer: "철수", title: "안녕", contents: "반갑습니다."){
            _id
            number
            message
        }
    }
`



export default function GraphqlMutationPage () {

    const [createBoard] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {
      const result = await createBoard()
      console.log(result)
    }
    return <button onClick={onClickSubmit}>Graphql-api요청하기</button>
    
}