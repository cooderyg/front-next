interface IProfile {
    name: string;
    age: number;
    school: string;
    hobby?: string;
}

// 1. Partial 타입
type aaa = Partial<IProfile>

// 2. Required
type aa = Required<IProfile>

// 3. Pick 타입
type ccc = Pick<IProfile, "name" | "age">

// 4. Omit 타입
type ddd = Omit<IProfile, "school">

// 5. Record 타입
type eee = "철수" | "영희" | "훈이"// Union 타입
let child1: eee = "철수"
let child2: string = "철수"

type fff = Record<eee, IProfile> // Record타입 

// 6. 객체의 key들로 Union타입 만들기
type ggg = keyof IProfile // "name" | "age" | "school" | "hobby"
let myprofile: ggg = "hobby"

// 7. type vs interface차이 =>  interface는 선언병합가능 선언병합
interface IProfile{
    candy: number // 선언병합을 추가됨
}

// 8. 배운것 응용
let profile:  Partial<IProfile> = {

}