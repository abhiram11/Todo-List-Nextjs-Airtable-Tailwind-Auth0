import "../styles/index.css";
//make SURE .ENV IS IN GITIGNORE
// 0:30 5/11 making api routes that integrate airtable to get the data that we need
// in javascript section of airatable/api webpage IT SHOWS HOW TO SELECT N BRAG THE DATA NEEDED by Query
function MyApp({ Component, pageProps }) {
  return (
    <div className="container mx-auto my-10 max-w-xl">
      {/* max width is max-w */}
      {/* margin for x axis = mx, for y axis my, here my-6 6 is relative, = 1.5rem, my-10 is 2.5rem */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
