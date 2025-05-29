import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    // RouterProvider wraps everything
    <RouterProvider router={router} />
  );
}

export default App;
