import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/product";
import Layout from "./components/Layout";

const App = () => {
  return  (
    <Routes>
       <Route element={<Layout/>}>
       <Route path="/" element={<Product />} />
       </Route> 
    </Routes>
  )
}

export default App;
