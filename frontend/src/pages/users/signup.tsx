import Link from "next/link";
import { ImHome } from "react-icons/im";

export default function SignUp() {
    return (
        <div className="flex w-screen h-screen items-center justify-center bg-stone-400 font-omyu_pretty">
            <div className="w-1/5 h-1/2 pl-10 pt-5 bg-white">
                <div className="pb-10 font-bold text-2xl">
                    <Link href={{ pathname: `/` }}>
                        <button className="mr-3 hover:text-gray-200">
                            <ImHome />
                        </button>
                    </Link>
                    회원가입
                </div>
                <form action="http://localhost:4000/users/signup" method="POST">
                    <div className="pb-1 font-bold">이메일</div>
                    <input
                        className="w-3/4 border rounded-sm"
                        type="email"
                        placeholder="이메일 입력"
                        name="email"
                    ></input>
                    <div className="pt-5 pb-1 font-bold">이름</div>
                    <input
                        className="w-3/4 border rounded-sm"
                        placeholder="이름을 입력해주세요"
                        name="name"
                    ></input>
                    <div className="pt-5 pb-1 font-bold">비밀번호</div>
                    <input
                        className="w-3/4 border rounded-sm"
                        type="password"
                        placeholder="비밀번호 입력"
                        name="password"
                    ></input>
                    <div className="pt-5 pb-1 font-bold">비밀번호 확인</div>
                    <input
                        className="w-3/4 border rounded-sm"
                        type="password"
                        placeholder="비밀번호 재입력"
                    ></input>
                    <button
                        className="flex w-16 justify-center mt-5 border-2 rounded-md hover:text-gray-200"
                        type="submit"
                    >
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
}
