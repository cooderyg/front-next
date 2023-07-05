import React, { useState } from "react";
import { Rate } from "antd";

export default function App(): JSX.Element {
  const [value, setValue] = useState(3);
  // === 1단계 방식 ===
  //   const onChangeStar = (value: number): void => {
  //     setValue(value);
  //   };
  //  === 2단계 방식 ===
  //   const onChangeStar = (value) => setValue(value);fg hj;

  //   <Rate onChange={setValue} value={value} />;                      //1단계 방식
  //   <Rate onChange={onChangeStar} value={value} />                   //2단계 방식
  //   <Rate onChange={(value) => setValue(value)} value={value} />;    //3단계 방식
  console.log(value);
  return <Rate onChange={setValue} value={value} />; //                 //4단계 방식
}
