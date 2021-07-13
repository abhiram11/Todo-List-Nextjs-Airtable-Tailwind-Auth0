import Head from "next/head";
// import Image from "next/image";
import Navbar from "../components/Navbar";
import { table, minifyRecords } from "./api/utils/Airtable";

export default function Home({ initialTodos }) {
  console.log(initialTodos);
  return (
    <div>
      <Head>
        <title>Authenticated TODO App!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>To-do App</h1>
      </main>
    </div>
  );
}

//built-in/ natively supported by nextjs: IT RUNS THE FUNCTION BEFORE IT SERVES THE INDEX.JS PAGE
// GO GRAB AL ITEMS FROM TODO TABLE, AND PASS IT TO THE INDEX.JS NOW
export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: minifyRecords(todos), // this will be send to the Home() as props above
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}
