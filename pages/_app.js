import "../styles/index.css";
import { TodosProvider } from "../contexts/TodosContext";
//make SURE .ENV IS IN GITIGNORE
// 0:30 5/11 making api routes that integrate airtable to get the data that we need
// in javascript section of airatable/api webpage IT SHOWS HOW TO SELECT N BRAG THE DATA NEEDED by Query

// 7:30 6/11 using context api to transfer todos..!! check JSON.stringify

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className="container mx-auto my-10 max-w-xl">
        {/* max width is max-w */}
        {/* margin for x axis = mx, for y axis my, here my-6 6 is relative, = 1.5rem, my-10 is 2.5rem */}
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  );
}

export default MyApp;
