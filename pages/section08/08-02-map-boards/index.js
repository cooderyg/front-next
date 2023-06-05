
import { gql, useQuery } from "@apollo/client"


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
// data ?? data.fetchProfile 비어있으면 실행!!


export default function StaticRoutedPage(){
    const { data } =useQuery(FETCH_BOARDS)
    
    console.log(data?.fetchBoards)

    return (
    <>
        {data?.fetchBoards.map(el => (
            <div>
                <span>
                    <input type="checkbox" />
                </span>
                <span style={{margin: "10px"}}>{el.number}</span>
                <span style={{margin: "10px"}}>{el.title}</span>
                <span style={{margin: "10px"}}>{el.writer}</span>
            </div>
            ))}
    </>
    )
}