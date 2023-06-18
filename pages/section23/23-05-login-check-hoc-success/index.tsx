import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../../../src/commons/types/generated/types";
import { loginCheck } from "../../../src/components/commons/hocs/login-check";

const FETCH_USER_LOGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

function LoginSuccessPage(): JSX.Element {
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGED_IN);

  return <>{data?.fetchUserLoggedIn.name}님 환영합니다!!</>;
}

export default loginCheck(LoginSuccessPage);
