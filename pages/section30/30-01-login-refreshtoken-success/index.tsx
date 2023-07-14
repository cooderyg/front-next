import { gql, useApolloClient } from "@apollo/client";
import { wrapAsyncFunc } from "../../../src/commons/libraries/asyncFunc";

const FETCH_USER_LOGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginSuccessPage(): JSX.Element {
  // 1. 페이지에 접속하면 자동으로 data에 받아지고 (data는 글로벌스테이트 저장), 리렌더링됨
  // const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGED_IN);

  // 2. 버튼을 클릭하면 데이터가 받아지고 (data는 글로벌스테이트에 저장), 리렌더링이 되는 방식
  // const [fetchUser, { data }] = useLazyQuery(FETCH_USER_LOGED_IN);

  // 3. axios처럼 사용하는 방법(data는 글로벌스테이트에 저장)
  // const client = useApolloClient();
  // client.query() <==> axios.get()

  const client = useApolloClient();
  const onClickButton = async (): Promise<void> => {
    const result = await client.query({
      query: FETCH_USER_LOGED_IN,
    });
    console.log(result);
  };

  return <button onClick={wrapAsyncFunc(onClickButton)}>클릭하세요!!</button>;
  // return <>{data?.fetchUserLoggedIn.name}님 환영합니다!!</>;
}
