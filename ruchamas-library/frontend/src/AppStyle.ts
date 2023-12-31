import { PaletteMode, SxProps } from "@mui/material"
import { amber, deepOrange, grey } from "@mui/material/colors"

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: amber,
          divider: amber[200],
          background: {
            default: "white",
          },
          text: {
            primary: grey[900],
            secondary: grey[400],
          },
        }
      : {
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
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

export { getDesignTokens, appContainerSx }
