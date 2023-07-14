import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../../commons/stores";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";

// 재렌더링 때문에 cache가 날라가기 때문에 컴포넌트 위에 만든 상수
const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const restoreTokenLoadable = useRecoilValueLoadable(
    restoreAccessTokenLoadable
  );

  // 1. window가 있는지 확인해서 프리렌더링 상태가 아닌지 확인하는 방법
  // if (typeof window !== "undefined") {
  // }

  // 2. process.browser
  // if (process.browser) {
  //   const result = localStorage.getItem("accessToken");
  //   console.log(result);
  //   setAccessToken(result ?? "");
  // } else {
  //   console.log(
  //     "지금은 프론트엔드 서버(yarn dev로 실행시킨 프로그램 내부다!!)"
  //   );
  // }

  // 3. 프리렌더링 무시 - useEffect
  useEffect(() => {
    // 1. refreshToken 방식 이전
    // const result = localStorage.getItem("accessToken");

    // 2. loadable 도입 전
    // void getAccessToken().then((newAccessToken) => {
    //   setAccessToken(newAccessToken ?? "");
    // });

    // 2. refreshToken 방식
    void restoreTokenLoadable.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? "");
    });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const error of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크
        if (error.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2. refreshToken으로 accessToken을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");

              // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 만료된 AT가 추가되어 있는 상태
                  Authorization: `Bearer ${newAccessToken ?? ""}`, // 3-2 newAT로 overwrite
                },
              });
              // 바로 위에서 수정한 context로 재요청하기
            })
          ).flatMap(() => forward(operation));
        }
      }
    }

    // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기
  });

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  // const errorLink
  // const authLink
  const client = new ApolloClient({
    // errorLink가 uploadLink보다 앞에있어야 함 순서 중요
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE, // 컴퓨터의 메모리에 백엔드에서 받아온 데이터 임시로 저장해 놓기 => 나중에 더 자세히 알아보기!
  });
  // prettier-ignore
  return (
    <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
  )
}
