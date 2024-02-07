import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import { ImHome } from "react-icons/im";

export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await axios
                .post(`http://localhost:4000/users/login`, formData)
                .then((res) => {
                    console.log(res.data);
                    router.push(
                        {
                            pathname: `/`,
                            query: {
                                uid: res.data.uid,
                                isLogined: res.data.isLogined,
                            },
                        },
                        "/"
                    );
                });
        } catch (error) {
            console.log("Post 요청 에러:", error);
        }
    };

    return (
        <div className="flex w-screen h-screen items-center justify-center bg-stone-400 font-omyu_pretty">
            <div className="w-1/5 h-1/2 pl-10 pt-5 bg-white">
                <div className="pb-10 font-bold text-2xl">
                    <Link href={{ pathname: `/` }}>
                        <button className="mr-3 hover:text-gray-200">
                            <ImHome />
                        </button>
                    </Link>
                    로그인
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="pb-1 font-bold">이메일</div>
                    <input
                        className="w-3/4 border rounded-sm"
                        type="email"
                        placeholder="이메일 입력"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    ></input>

                    <div className="pt-5 pb-1 font-bold">비밀번호</div>
                    <input
                        className="w-3/4 border rounded-sm"
                        type="password"
                        placeholder="비밀번호 입력"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    ></input>

                    <button
                        className="flex w-16 justify-center mt-5 border-2 rounded-md hover:text-gray-200"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
