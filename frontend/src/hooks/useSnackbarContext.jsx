import { useContext } from "react";

import { SnackbarContext } from "../contexts/SnackbarContext";

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarContextProvider"
    );
  }

  return context;
};