import { Routes, Route, useNavigate } from "react-router-dom";
import { lazy, useEffect, startTransition, Suspense } from "react";
import ThankYouPage from "./components/ThankYouPage.jsx";

const Product01 = lazy(() => import("./Product01.jsx"));

const Error = lazy(() => import("./components/Error"));

const App = () => {
  const navigate = useNavigate();
  const url = localStorage.getItem("baseURL");

  useEffect(() => {
    if (
      url &&
      (window.location.pathname === "/" ||
        window.location.pathname === "/products" ||
        window.location.pathname === "/products/")
    ) {
      startTransition(() => {
        navigate(url);
      });
    }
  }, [url, navigate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="*" element={<Error />} />

        <Route path="/products/cut" element={<Product01 />} />
        <Route path="/products/thankyou" element={<ThankYouPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
