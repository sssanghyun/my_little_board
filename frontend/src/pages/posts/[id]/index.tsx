import axios from "axios";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import { ImHome } from "react-icons/im";

export default function Post({
    result,
}: InferGetServerSidePropsType<GetServerSideProps>) {
    const router = useRouter();

    const deleteOnClick = (
        id: number
    ): MouseEventHandler<HTMLButtonElement> => {
        return async (event) => {
            if (confirm("게시글을 삭제하시겠습니까?")) {
                try {
                    await axios.delete(`http://localhost:4000/posts/${id}`);
                    alert("게시글이 삭제되었습니다.");
                    router.push("/");
                } catch (error) {
                    console.log("게시글 삭제 실패:", error);
                }
            }
        };
    };
    return (
        <div className="flex w-screen h-screen items-center justify-center bg-stone-400 font-omyu_pretty">
            <div className="w-1/5 h-1/2 pl-10 pt-5 bg-white">
                <div className="flex pb-10 font-bold text-2xl">
                    <Link href={{ pathname: `/` }}>
                        <button className="mr-3 hover:text-gray-200">
                            <ImHome />
                        </button>
                    </Link>
                    게시글 상세
                </div>
                <div className="pb-1 font-bold">제목</div>
                <div className="w-3/4 rounded-sm">{result[0].title}</div>

                <div className="pt-5 pb-1 font-bold">내용</div>
                <div className="w-3/4 mh-24 rounded-sm">
                    {result[0].content}
                </div>

                <div className="pt-5 pb-1 font-bold">작성자</div>
                <div className="w-3/4 rounded-sm">{result[0].name}</div>
                <div className="flex pr-10 justify-center">
                    <Link
                        className="px-2"
                        href={{
                            pathname: `/posts/${result[0].id}/modify`,
                            query: {
                                title: result[0].title,
                                content: result[0].content,
                                id: result[0].id,
                                writer_id: result[0].writer_id,
                                name: result[0].name,
                            },
                        }}
                        as={`/posts/${result[0].id}/modify`}
                    >
                        <button className="flex w-24 justify-center mt-5 border-2 rounded-md hover:text-gray-200">
                            수정
                        </button>
                    </Link>

                    <button
                        className="flex w-24 justify-center mt-5 border-2 rounded-md hover:text-gray-200"
                        onClick={deleteOnClick(result[0].id)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}

type Params = {
    id: number;
};

export async function getServerSideProps({ params }: { params: Params }) {
    const { result } = await (
        await fetch(`http://localhost:4000/posts/${params.id}`, {
            method: "GET",
        })
    ).json();
    return {
        props: {
            result: result || null,
        },
    };
}
