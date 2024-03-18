import { useState } from "react";

export const useFormStatus = () => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const setErrorMsg = (message) => {
    if (message != "") {
      setError(message);
    } else {
      throw "Cant Set Error Message empty use clearError instead";
    }
  };
  const clearError = () => setError("");
  const resetHook = () => {
    setStatus("");
    clearError();
  };
  return { status, setStatus, error, setErrorMsg, clearError, resetHook };
};
