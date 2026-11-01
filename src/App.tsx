import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./site/HomePage";

const MyWorks = lazy(() => import("./pages/MyWorks"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/myworks"
          element={
            <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
              <MyWorks />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
