import { PaletteMode, SxProps } from "@mui/material"
import { blue, grey } from "@mui/material/colors"

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: blue,
          divider: blue[200],
          background: {
            default: "white",
            main: blue[500],
            strong: blue[600],
          },
          text: {
            primary: grey[900],
            secondary: grey[400],
            contrast: "white",
          },
        }
      : {
          primary: blue,
          divider: blue[700],
          background: {
            default: blue[900],
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

const appContainerSx: SxProps = {
  height: "100vh",
  width: "100vw",
  overflow: "show",
}

const propertyContainerSx: SxProps = {
  width: "auto",
  height: "auto",
  margin: "2rem",
}

const refreshButtonSx: SxProps = {
  position: "fixed",
  bottom: "0.5rem",
  right: "0.5rem",
  zIndex: "100",
}

export { getDesignTokens, appContainerSx, propertyContainerSx, refreshButtonSx }
