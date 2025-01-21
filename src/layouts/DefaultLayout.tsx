import Feed from "@/components/Feed/Feed";
import About from "@/components/About/About";
import Header from "@/components/Header/Header";
import { Routes, Route } from "react-router";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default DefaultLayout;
