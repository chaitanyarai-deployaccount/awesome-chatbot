import Head from "next/head";

import App from "@/Components/App";

const Home = () => {
    return (
        <>
            <Head>
                <title>Code Llama on Akash</title>
                <meta content="yes" />
                <meta content="Chatbot UI"></meta>
            </Head>
            <App />
        </>
    );
};

export default Home;
