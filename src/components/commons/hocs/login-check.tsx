import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import { restoreAccessTokenLoadable } from "../../../commons/stores";

export const loginCheck = (Component: any) => (props: any) => {
  const router = useRouter();
  const restoreTokenLoadable = useRecoilValueLoadable(
    restoreAccessTokenLoadable
  );

  // useEffect(() => { // 1. 로그인 체크(refreshToken 이전)
  //   if (localStorage.getItem("accessToken") === null) {
  //     alert("로그인 후 이용가능합니다!!!");
  //     void router.replace("/section23/23-05-login-check-hoc");
  //   }
  // }, []);

  // 2. 로그인 체크(refreshToken 이후)
  // loadable 도입 전
  // useEffect(() => {
  //   void getAccessToken().then((newAccessToken) => {
  //     if (newAccessToken === undefined) {
  //       alert("로그인 후 이용가능합니다!!!");
  //       void router.replace("/section23/23-05-login-check-hoc");
  //     }
  //   });
  // }, []);

  // 2. 로그인 체크(refreshToken 이후) 함수공유 loadable
  useEffect(() => {
    void restoreTokenLoadable.toPromise().then((newAccessToken) => {
      if (newAccessToken === undefined) {
        alert("로그인 후 이용가능합니다!!!");
        void router.replace("/section23/23-05-login-check-hoc");
      }
    });
  }, []);
  return <Component {...props} />;
};
