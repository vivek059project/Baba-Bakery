import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import CakeEnquiry from "./pages/CakeEnquiry";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Footer from "./components/Footer";

import CartProvider from "./context/CartContext";


function PublicLayout() {
  return (
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
            path="/cart"
            element={<Cart />}
          />
          <Route 
          path="/checkout"
          element={<Checkout/>}
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
  );
}


function AppContent() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Routes>
    );
  }

  return <PublicLayout />;
}


function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}


export default App;