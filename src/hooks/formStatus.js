import { useCallback, useState } from "react";

export const useFormStatus = () => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const setErrorMsg = useCallback((message) => {
    if (message != "") {
      setError(message);
    } else {
      throw "Cant Set Error Message empty use clearError instead";
    }
  }, []);
  const clearError = useCallback(() => setError(""), []);
  const resetHook = useCallback(() => {
    setStatus("");
    clearError();
  }, []);
  return { status, setStatus, error, setErrorMsg, clearError, resetHook };
};
