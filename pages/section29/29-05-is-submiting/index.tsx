import axios from "axios";
import { wrapAsyncFunc } from "../../../src/commons/libraries/asyncFunc";
import { useState } from "react";

export default function RestGetPage(): JSX.Element {
  const [isSubmiting, setIsSubmitting] = useState(false);

  // 게시글 등록하기 버튼이라고 가정!!
  const onClickSync = async (): Promise<void> => {
    setIsSubmitting(true);

    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result);
    console.log(result.data.title);

    setIsSubmitting(false);
  };

  return (
    <button onClick={wrapAsyncFunc(onClickSync)} disabled={isSubmiting}>
      REST-API(동기) 요청하기
    </button>
  );
}
