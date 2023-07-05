import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "../../../commons/stores";

interface IUseMoveToPageReturn {
  vistedPage: string;
  onClickMoveToPage: (path: string) => () => void;
}

export const useMoveToPage = (): IUseMoveToPageReturn => {
  const router = useRouter();
  const [vistedPage, setVistedPage] = useRecoilState(visitedPageState);

  const onClickMoveToPage = (path: string) => () => {
    // localStorage.setItem("visitedPage", path); // 로컬스토리지도 가능!
    setVistedPage(path); // 로그인페이지 일 때는 set하지 않도록 조건 추가

    void router.push(path);
  };

  return {
    vistedPage,
    onClickMoveToPage,
  };
};
