import { gql, useMutation } from "@apollo/client";
import { wrapAsyncFunc } from "../../../src/commons/libraries/asyncFunc";

const CREATE_BOARD = gql`
  mutation {
    createBoard(writer: "철수", title: "안녕", contents: "반갑습니다.") {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage(): JSX.Element {
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async (): Promise<void> => {
    const result = await createBoard();
    console.log(result);
  };

  return (
    <button onClick={wrapAsyncFunc(onClickSubmit)}>Graphql-api요청하기</button>
  );
}
