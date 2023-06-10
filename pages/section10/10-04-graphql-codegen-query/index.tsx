import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { IQuery, IQueryFetchBoardArgs } from "../../../src/commons/types/generated/types"


const FETCH_BOARD = gql`
    query fetchBoard($number: Int){
        fetchBoard(number: $number){
            number
            writer
            title
            contents
        }
    }
`
// data ?? data.fetchProfile 비어있으면 실행!!


export default function StaticRoutedPage(){
    const router = useRouter()
    console.log(typeof router.query.number)
    const { data } =useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(FETCH_BOARD, {
        variables: { number: Number(router.query.number) }
    })
   
    console.log(data)

    return (
    <>
        <div>{router.query.number}번 게시글 이동이 완료되었습니다.</div>
        <div>작성자: {data?.fetchBoard?.writer}</div>
        <div>제목: {data?.fetchBoard?.title}</div>
        <div>내용: {data?.fetchBoard?.contents}</div>  
    </>
    )
}