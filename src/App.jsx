import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./component/Root";
import DictionaryContent from "./component/DictionaryContent";
import Dictionary from "./pages/Dictionary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dictionary />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
