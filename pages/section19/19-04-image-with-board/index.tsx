/* eslint-disable @typescript-eslint/no-misused-promises */
import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useRef, useState } from "react";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../../src/commons/types/generated/types";
import { checkValidationFile } from "../../../src/commons/libraries/validationFile";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage(): JSX.Element {
  const [imageUrl, setImgUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    // 배열로 들어오늘 이유: <input type="file" multiple /> 일 때, 여러개 드레그 해서 여러 이미지 컨트롤가능
    const file = event.target.files?.[0]; // 배열 & 객체 앞 옵셔널 체이닝 가능
    console.log(file);
    const isValid = checkValidationFile(file);
    if (!isValid) return;
    const result = await uploadFile({ variables: { file } });
    setImgUrl(result.data?.uploadFile.url ?? "");
  };
  const onClickImage = (): void => {
    fileRef.current?.click();
  };
  // ///////////////////////////////////////////////////////////////////
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async (): Promise<void> => {
    const result = await createBoard({
      variables: {
        // variables 이게 $역할을 함
        createBoardInput: {
          writer,
          password: "1234",
          title,
          contents,
          images: [imageUrl],
        },
      },
    });
    console.log(result);
  };
  const OnChangeWriter = (event: ChangeEvent<HTMLInputElement>): void => {
    setWriter(event.target.value);
  };
  const OnChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };
  const OnChangeContents = (event: ChangeEvent<HTMLInputElement>): void => {
    setContents(event.target.value);
  };

  return (
    <>
      작성자: <input type="text" onChange={OnChangeWriter} />
      제목: <input type="text" onChange={OnChangeTitle} />
      내용: <input type="text" onChange={OnChangeContents} />
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "gray",
          cursor: "pointer",
        }}
        onClick={onClickImage}
      >
        이미지 선택
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onChangeFile}
        ref={fileRef}
        accept="image/jpeg,image/png"
      />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
      <button onClick={onClickSubmit}>Graphql-api요청하기</button>
    </>
  );
}
