import { createTheme } from "@mui/material";

const createAppTheme = (mode = "dark") =>
  createTheme({
    palette: {
      mode,
    },
  });

export default createAppTheme;