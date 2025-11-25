import { useSelector, useDispatch } from "react-redux";

import { clearAlert } from "./redux/slices/alert.js";

import ConfigRoutes from "./routes/configRoutes";
import Layout from "./sections/Layout";
import CustomSnackbar from "./components/alertComps/SnackBar.jsx";
import useOnStart from "./hooks/useOnStart.js";

function App() {
  const dispatch = useDispatch();

  useOnStart();

  const { type, message } = useSelector((state) => state.alert);

  function handleClearAlert() {
    dispatch(clearAlert());
  }

  return (
    <>
      <Layout>
        <ConfigRoutes />
        {message && (
          <CustomSnackbar
            key={message}
            type={type}
            message={message}
            onClose={handleClearAlert}
          />
        )}
      </Layout>
    </>
  );
}

export default App;
