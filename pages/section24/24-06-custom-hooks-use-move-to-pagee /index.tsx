import { useMoveToPage } from "../../../src/components/commons/hooks/useMoveToPage";

export default function customHooksUseAuthPage(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <>
      <button onClick={onClickMoveToPage("/board")}>게시판으로 이동</button>
      <button onClick={onClickMoveToPage("/markets")}>마켓으로 이동</button>
      <button onClick={onClickMoveToPage("/mypages")}>마이페이지로 이동</button>
    </>
  );
}
