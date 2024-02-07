import Link from "next/link";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Post from "../interface/post";
import { useRouter } from "next/router";
import axios from "axios";

let uid: number;
let isLogined: boolean;

export default function MainPage({
    results,
}: InferGetServerSidePropsType<GetServerSideProps>) {
    const router = useRouter();
    console.log("router.query.isLogined = " + router.query.isLogined);
    if (router.query.isLogined) {
        uid = Number(router.query.uid);
        isLogined = Boolean(router.query.isLogined);
        console.log("uid = " + uid + "isLog = " + isLogined);
    }
    const logoutOnClick = (uid: number, isLogined: boolean) => {
        return async () => {
            try {
                await axios
                    .get(`http://localhost:4000/users/logout`)
                    .then((res) => {
                        alert("로그아웃 하였습니다.");
                        window.location.reload();
                    });
            } catch (error) {
                console.log(error);
            }
        };
    };
    return (
        <div className="w-screen h-screen bg-stone-400 font-omyu_pretty">
            {isLogined ? (
                <div className="flex pr-10 pt-3 items-center justify-end bg-stone-500 font-bold">
                    <button
                        className="px-2"
                        onClick={logoutOnClick(uid, isLogined)}
                    >
                        로그아웃
                    </button>
                </div>
            ) : (
                <div className="flex pr-10 pt-3 items-center justify-end bg-stone-500 font-bold">
                    <Link className="px-2" href={"/users/signup"}>
                        회원가입
                    </Link>
                    <Link className="px-2" href={"/users/login"}>
                        로그인
                    </Link>
                </div>
            )}
            <div className="flex h-1/6 items-center justify-center bg-stone-500 font-bold text-7xl">
                MY LITTLE BOARD
            </div>
            <div className="mx-40 mt-10 h-3/6 items-center justify-center bg-stone-200 text-black overflow-y-auto border border-stone-400 rounded-2xl">
                <table className="w-full h-full">
                    <thead className="h-14">
                        <tr>
                            <td className="w-7/12 px-5 font-bold text-lg border border-stone-400">
                                제목
                            </td>
                            <td className="px-5 font-bold text-lg border border-stone-400">
                                게시일
                            </td>
                            <td className="px-5 font-bold text-lg border border-stone-400">
                                조회수
                            </td>
                            <td className="px-5 font-bold text-lg border border-stone-400">
                                좋아요
                            </td>
                            <td className="px-5 font-bold text-lg border border-stone-400">
                                작성자
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {results?.map((post: Post) => {
                            return (
                                <tr key={post.id}>
                                    <td className="px-5 border border-stone-400">
                                        <Link
                                            className="hover:text-gray-400"
                                            href={`/posts/${post.id}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td className="px-5 border border-stone-400">
                                        {post.create_date.split("T")[0]}
                                    </td>
                                    <td className="px-5 border border-stone-400">
                                        {post.views}
                                    </td>
                                    <td className="px-5 border border-stone-400">
                                        {post.likes}
                                    </td>
                                    <td className="px-5 border border-stone-400">
                                        {post.name}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex p-10 tems-center justify-center font-bold">
                <Link
                    className="px-2 bg-stone-700 text-white text-2xl"
                    href={"/posts/register"}
                >
                    게시글 작성
                </Link>
            </div>
        </div>
    );
}
