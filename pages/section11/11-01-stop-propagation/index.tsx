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

    const onClickAlert = (e:any) => {
            alert(`${e.currentTarget.id}님이 작성한 글입니다.`)
    } 

    const qqq1 = () => {
        alert("1번클릭")
    }

    const qqq2 = () => {
        alert("2번클릭")
    }

    const qqq3 = (event) => {
        event.stopPropagation()
        alert("3번클릭")
    }

    const qqq4 = (event) => {
        event.stopPropagation()
        alert("4번클릭")
    }

    return (
    <>
        {data?.fetchBoards.map((el:any) => (
            <div id={el.writer} onClick={qqq1}>
                <span onClick={qqq2}>
                    <input type="checkbox" onClick={qqq3}/>
                </span>
                <span style={{margin: "10px"}} onClick={qqq4}>{el.number}</span>
                <span style={{margin: "10px"}}>{el.title}</span>
                <span style={{margin: "10px"}}>{el.writer}</span>
            </div>
            ))}
    </>
    )
}