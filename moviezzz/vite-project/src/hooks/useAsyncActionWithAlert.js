import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { showAlert } from "../redux/slices/alert";

export function useAsyncActionWithAlert() {
  const dispatch = useDispatch();

  const runAction = useCallback(
    async ({ action, payload, successMessage, errorMessage }) => {
      try {
        await dispatch(action(payload)).unwrap();
        dispatch(showAlert({ type: "success", message: successMessage }));
      } catch (error) {
        dispatch(
          showAlert({
            type: "error",
            message: `${errorMessage} [<${error.message}>]`,
          })
        );
      }
    },
    [dispatch]
  );

  return runAction;
}
