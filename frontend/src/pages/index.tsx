import MainPage from "@/components/MainPage";
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPageContext,
} from "next";
import dotenv from "dotenv";

dotenv.config();

export default function Home({
    results,
}: InferGetServerSidePropsType<GetServerSideProps>) {
    return <MainPage results={results} />;
}
export async function getServerSideProps(context: NextPageContext) {
    const { results } = await (
        await fetch(`http://localhost:4000/posts`, {
            method: "GET",
        })
    ).json();
    return {
        props: {
            results: results || null,
        },
    };
}
