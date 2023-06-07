import { ChangeEvent, MouseEvent } from "react";

export interface IBoardWriteProps {
    isEdit: boolean;
    data?: any;
  }

export interface IUpdateVariables {
    number: number;
    title?: string;
    writer?: string;
    contents?: string; 
  }

export interface IBoardWriteUIProps {
    onClickSubmit: (event: MouseEvent<HTMLButtonElement>)=> void;
    onClickUpdate: (event: MouseEvent<HTMLButtonElement>)=> void;
    OnChangeWriter: (event: ChangeEvent<HTMLInputElement>)=> void;
    OnChangeTitle: (event: ChangeEvent<HTMLInputElement>)=> void;
    OnChangeContents: (event: ChangeEvent<HTMLInputElement>)=> void;
    isEdit: boolean;
    data: any;
}