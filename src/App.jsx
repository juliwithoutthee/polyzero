import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Landing from "./pages/Landing";
import Tiers from "./pages/Tiers";
import Footprint from "./pages/Footprint";
import Registration from "./components/Registration";
import "./pages/Footprint";
import PaymentsForm from "./pages/PaymentsForm";
import OrderConfirmation from "./pages/OrderConfirmation";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import TipsToReduce from "./pages/TipsToReduce";
import { pageTracking } from "./analytics/tracking";
import FootprintWizard from "./pages/FootprintWizard";
import Results from "./pages/Results";
import Top from "./components/Top";
function App() {
  const [tier, setTier] = useState({});
  const [result, setResult] = useState(null);
  const location = useLocation();

  useEffect(() => {
    pageTracking(location);
    localStorage.setItem("footprint", JSON.stringify(result));
    console.log(
      "RESULT:",
      result,
      "LOCAL:",
      JSON.parse(localStorage.footprint)
    );
  }, [location, result]);

  return (
    <>
      <div className="flex flex-col h-screen md:ml-64">
        {location.pathname === "/" ||
        location.pathname === "/resources" ? null : (
          <SideBar result={result} />
        )}
        <Top />
        <Routes>
          <Route exact path="/resources" element={<Resources />} />
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route
            exact
            path="/wizard"
            element={<FootprintWizard result={result} setResult={setResult} />}
          />
          <Route
            exact
            path="/results"
            element={<Results result={result} setResult={setResult} />}
          />

          <Route exact path="/tiers" element={<Tiers setTier={setTier} />} />
          <Route exact path="/payment" element={<PaymentsForm />} />
          <Route exact path="/tips" element={<TipsToReduce />} />
          <Route
            exact
            path="/confirmation"
            element={<OrderConfirmation tier={tier} />}
          />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
