import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";

export const SnackbarContext = createContext(null);
const initialState = {
  open: false,
  severity: "info",
  autoHideDuration: 3000, // 3 seconds
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
};

export const SnackbarContextProvider = ({ children }) => {
  const [snackBar, setSnackbar] = useState(initialState);
  const showSnackbar = (
    message,
    severity = "info",
    autoHideDuration = initialState.autoHideDuration,
    anchorOrigin = initialState.anchorOrigin
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
      autoHideDuration,
      anchorOrigin,
    });
  };
  const handleClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackBar.open}
        autoHideDuration={snackBar.autoHideDuration}
        anchorOrigin={snackBar.anchorOrigin}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackBar.severity}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

SnackbarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SnackbarContextProvider;