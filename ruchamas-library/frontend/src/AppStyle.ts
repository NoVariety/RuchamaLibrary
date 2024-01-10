import { PaletteMode, SxProps } from "@mui/material"
import { teal, grey } from "@mui/material/colors"

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: teal,
          secondary: grey,
          divider: teal[200],
          background: {
            default: "white",
            main: teal[500],
            weak: teal[50],
            strong: teal[600],
          },
          text: {
            primary: grey[900],
            secondary: grey[400],
            contrast: "white",
          },
        }
      : {
          primary: teal,
          divider: teal[700],
          background: {
            default: teal[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: ["Lexend", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  },
})

const appBackgroundSx: SxProps = {
  minHeight: "100%",
  minWidth: "100%",
  position: "absolute",
  zIndex: "-100",
  backgroundColor: "background.weak",
}

const appContainerSx: SxProps = {
  minHeight: "100%",
  height: "100%",
  flexGrow: 1,
}

const propertyContainerSx: SxProps = {
  width: "auto",
  height: "auto",
  margin: "2rem",
}

const addButtonSx: SxProps = {
  position: "fixed",
  bottom: "0.5rem",
  right: "0.5rem",
  zIndex: "100",
}

export {
  getDesignTokens,
  appBackgroundSx,
  appContainerSx,
  propertyContainerSx,
  addButtonSx,
}
