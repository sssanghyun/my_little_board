import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { ImArrowLeft2 } from "react-icons/im";

export default function Modify() {
    const router = useRouter();
    const { title, content, id, writer_id, name } = router.query;

    const [formData, setFormData] = useState({ title, content, writer_id });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:4000/posts/${id}`, formData);
            router.push(`/posts/${id}`);
        } catch (error) {
            console.log("PUT 요청 에러:", error);
        }
    };

    if (router.isReady && router.asPath === "/posts/[id]/modify") {
        return null;
    }

    return (
        <div className="flex w-screen h-screen items-center justify-center bg-stone-400 font-omyu_pretty">
            <div className="w-1/5 h-1/2 pl-10 pt-5 bg-white">
                <div className="pb-10 font-bold text-2xl">
                    <Link href={{ pathname: `/posts/${id}` }}>
                        <button className="mr-3 hover:text-gray-200">
                            <ImArrowLeft2 />
                        </button>
                    </Link>
                    게시글 수정
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="pb-1 font-bold">제목</div>
                    <input
                        className="w-3/4 border rounded-sm"
                        placeholder="제목 입력"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    ></input>

                    <div className="pt-5 pb-1 font-bold">내용</div>
                    <textarea
                        className="w-3/4 border rounded-sm"
                        placeholder="내용 입력"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                    ></textarea>

                    <div className="pt-5 pb-1 font-bold">작성자</div>
                    <div className="w-3/4 rounded-sm">{name}</div>
                    <button
                        className="flex w-16 justify-center mt-5 border-2 rounded-md hover:text-gray-200"
                        type="submit"
                    >
                        수정하기
                    </button>
                </form>
            </div>
        </div>
    );
}
