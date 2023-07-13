// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
// import { Modal } from "antd";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage(): JSX.Element {
  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);

  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const onChangeContents = (value: string): void => {
    console.log(value);

    // register로 등록하지 않고, 강제로 값을 넣어주는 기능!!
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onchange 됐으니까 에러검증 같은 것들 해달라고 react-hook-form에 알려주는 기능!!
    void trigger("contents");
  };

  // useEffect(() => {
  //   async function aaa(): Promise<void> {
  //     const { Modal } = await import("antd");
  //     Modal.success({ content: "게시글 등록에 성공하였습니다!!!" });
  //   }
  //   void aaa();
  // }, []);

  const onClickSubmit = async (data: any): Promise<void> => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          ...data,
        },
      },
    });

    const { Modal } = await import("antd");
    Modal.success({ content: "게시글 등록에 성공하였습니다!!!" });
    const boardId = result.data.createBoard._id;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    void router.push(`/section27/27-03-web-editor-xss-detail/${boardId}`);
  };
  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type="text" {...register("writer")} />
      <br />
      비밀번호: <input type="password" {...register("password")} />
      <br />
      제목: <input type="text" {...register("title")} />
      <br />
      내용:
      <ReactQuill onChange={onChangeContents} />
      <button>등록하기</button>
    </form>
  );
}
