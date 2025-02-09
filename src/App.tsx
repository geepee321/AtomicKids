import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import History from "./components/history";
import routes from "tempo-routes";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          {/* For the tempo routes */}
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
