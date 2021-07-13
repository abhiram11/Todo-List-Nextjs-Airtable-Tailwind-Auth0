import Head from "next/head";
// import Image from "next/image";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import { table, minifyRecords } from "./api/utils/Airtable";
import { TodosContext } from "../contexts/TodosContext";
import { useEffect, useContext } from "react";

export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContext); //getting accecss to the properties
  //taking only 2 rn, (todos, settodos, refreshtodos, updatetodos, deletetodods,addtoto) it using this call

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

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
        <ul>
          {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </ul>
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
