export default function Register() {
    return (
        <div className="flex w-screen h-screen items-center justify-center bg-stone-400 font-omyu_pretty">
            <div className="w-1/5 h-1/2 pl-10 pt-5 bg-white">
                <div className="pb-10 font-bold text-2xl">게시글 작성</div>
                <form action="http://localhost:4000/posts" method="POST">
                    <div className="pb-1 font-bold">제목</div>
                    <input
                        className="w-3/4 border rounded-sm"
                        placeholder="제목 입력"
                        name="title"
                    ></input>

                    <div className="pt-5 pb-1 font-bold">내용</div>
                    <textarea
                        className="w-3/4 border rounded-sm"
                        placeholder="내용 입력"
                        name="content"
                    ></textarea>

                    <button
                        className="flex w-16 justify-center mt-5 border-2 rounded-md hover:text-gray-200"
                        type="submit"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}
