import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import CakeEnquiry from "./pages/CakeEnquiry";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Navbar />

        <main>

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/menu"
              element={<Menu />}
            />

            <Route
              path="/menu/:id"
              element={<ProductDetails />}
            />

            <Route
  path="/custom-cake"
  element={<CakeEnquiry />}
/>

            <Route
              path="/contact"
              element={<Contact />}
            />

          </Routes>

        </main>

<Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;