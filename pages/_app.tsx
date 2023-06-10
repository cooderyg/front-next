import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppProps } from "next/app";
import Layout from "../src/commons/layout";

export default function App({ Component }: AppProps): JSX.Element {
  const client = new ApolloClient({
    uri: "http://backend-example.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(), // 컴퓨터의 메모리에 백엔드에서 받아온 데이터 임시로 저장해 놓기 => 나중에 더 자세히 알아보기!
  });

  return (
    <>
      <div>======여기는 _app.js 컴포넌트 시작부분 입니다.=======</div>
      <ApolloProvider client={client}>
        <Layout>
          <Component />
        </Layout>
      </ApolloProvider>
      <div>========여기는 _app.js 컴포넌트 마지막부분 입니다.========</div>
    </>
  );
}
