
import { gql, useMutation, useQuery } from "@apollo/client"


const FETCH_BOARDS = gql`
    query{
        fetchBoards{
            number
            writer
            title
            contents
        }
    }
`

const DELETE_BOARD = gql`
    mutation deleteBoard($number: Int){
        deleteBoard(number: $number){
            message
            
        }
    }
`

// data ?? data.fetchProfile 비어있으면 실행!!


export default function StaticRoutedPage(){
    const { data } =useQuery(FETCH_BOARDS)
    
    const [deleteBoard] = useMutation(DELETE_BOARD)
    console.log(data?.fetchBoards)
    const onClickDelete = (event) => {
        deleteBoard({
            variables:{ number : Number(event.target.id) },
            refetchQueries: [{query: FETCH_BOARDS}] // 삭제로직 실행후 다시 실행시킬 쿼리!!
        }) 
    }
    return (
        // map을 활용할 때에는 key값을 꼭 작성해줘야함 근데 index로는 key값을 주면 문제가 생김 유일하지 않은 값이기 때문!
    <>
        {data?.fetchBoards.map(el => (
            <div key={el.number}> 
                <span>
                    <input type="checkbox" />
                </span>
                <span style={{margin: "10px"}}>{el.number}</span>
                <span style={{margin: "10px"}}>{el.title}</span>
                <span style={{margin: "10px"}}>{el.writer}</span>
                <span>
                    <button id={el.number} onClick={onClickDelete}>삭제</button>
                </span>
            </div>
            ))}
    </>
    )
}