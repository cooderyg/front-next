import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage(): JSX.Element {
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });
  //   state 여러개 => 한개로 리펙터링

  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard({
      // variables 이게 $역할을 함
      variables: { ...inputs },
    });
    console.log(result);
  };
  const OnChangeInputs = (event) => {
    // 변수를 객체의 키값으로 사용하기 위해 대괄호로 감싸줘야함 객체의 키로 들어가는 대괄호는 배열이 아님
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <>
      작성자: <input type="text" id="writer" onChange={OnChangeInputs} />
      제목: <input type="text" id="title" onChange={OnChangeInputs} />
      내용: <input type="text" id="contents" onChange={OnChangeInputs} />
      <button onClick={onClickSubmit}>Graphql-api요청하기</button>
    </>
  );
}
