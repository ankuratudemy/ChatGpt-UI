// companyTheme.js
import { createTheme } from "@mui/material/styles";

const JllTheme = createTheme({
  typography: {
    fontFamily: "Source Sans Pro",
  },
  palette: {
    primary: {
      main: "#000000d9",
    },
    secondary: {
      main: "#E30613",
    },
    tertiary: {
      main: "#003E51",
    },
    background: {
      main: "#f3f3f3",
    },
    // Customize other colors as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
          fontSize: 16,
          fontFamily: "Source Sans Pro SemiBold",
          padding: "6px 12px",
          lineHeight: 1.5,
          backgroundColor: "#E30613",
          borderColor: "#E30613",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#131E29",
          },
        },
        // Add other customizations as needed
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          color: "#E30613",
          backgroundColor: "#fff",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#F3F3F3",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#f3f3f3",
          "& .MuiInputLabel-root": {
            fontWeight: 700,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
            '& .MuiOutlinedInput-root.Mui-error': {
              borderColor: theme => theme.palette.secondary.main,
            },
            '& .MuiFormHelperText-root.Mui-error': {
              color: theme => theme.palette.secondary.main,
            },
          },
        },
      },
      defaultProps: {
        inputProps: {
          style: {
            //fontSize: "11.8px",
            // height: '.85rem',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          backgroundColor: "#f3f3f3",
          "& .MuiInputLabel-root": {
            fontWeight: 700,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#f3f3f3",
          "& .MuiInputLabel-root": {
            fontWeight: 700,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: "blue",

          "&.Mui-selected": {
            backgroundColor: "red",
          },
        },
      },
    },
  },
});

export default JllTheme;
