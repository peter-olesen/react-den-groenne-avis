import { Router } from "./router/Router";
import { UserContextProvider } from "./context/UserContext";
import { useScrollToTop } from "./hooks/useScrollToTop";

function App() {
  // Scrolls to the top of the page on path change/page load
  useScrollToTop();
  return (
    <>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </>
  );
}

export default App;
