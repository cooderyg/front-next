import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";
import { useEffect } from "react";

// 재렌더링 때문에 cache가 날라가기 때문에 컴포넌트 위에 만든 상수
const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
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
    const result = localStorage.getItem("accessToken");
    setAccessToken(result ?? "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  // const errorLink
  // const authLink
  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE, // 컴퓨터의 메모리에 백엔드에서 받아온 데이터 임시로 저장해 놓기 => 나중에 더 자세히 알아보기!
  });
  // prettier-ignore
  return (
    <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
  )
}
