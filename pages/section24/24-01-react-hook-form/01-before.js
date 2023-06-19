import { useState } from "react";

//

export default function GraphqlMutationPage() {
  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  const onClickSubmit = async () => {};
  const OnChangeWriter = (event) => {
    setWriter(event.target.value);
  };
  const OnChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const OnChangeContents = (event) => {
    setContents(event.target.value);
  };
  return (
    <>
      작성자: <input type="text" onChange={OnChangeWriter} />
      제목: <input type="text" onChange={OnChangeTitle} />
      내용: <input type="text" onChange={OnChangeContents} />
      <button onClick={onClickSubmit}>Graphql-api요청하기</button>
    </>
  );
}
