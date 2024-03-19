import Header from "../Components/Header/Header";

export default function App({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
