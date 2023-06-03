import { useRouter } from 'next/router'
 
export default function StaticRoutingPage(){
    const router = useRouter()
    const onClickMove1 = () => {
        router.push("/section05/05-04-dynamic-routing-board-query-moved/13190")
    }
    const onClickMove2 = () => {
        router.push("/section05/05-04-dynamic-routing-board-query-moved/13189")
    }
    const onClickMove3 = () => {
        router.push("/section05/05-04-dynamic-routing-board-query-moved/13187")
    }

    
    return (
        <>
            <button onClick={onClickMove1}>1번 게시글로 이동하기</button>
            <button onClick={onClickMove2}>2번 게시글로 이동하기</button>
            <button onClick={onClickMove3}>3번 게시글로 이동하기</button>
        </>
    )
}