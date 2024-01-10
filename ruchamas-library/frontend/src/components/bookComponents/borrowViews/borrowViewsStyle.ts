import { SxProps } from "@mui/material"

const toggleButtonSx: SxProps = {
  color: "#9BC4BE",
  backgroundColor: "background.main",
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "background.strong",
    width: "4.45rem",
  },
}

const toggleGroupSx: SxProps = {
  position: "fixed",
  right: "0.5rem",
  bottom: "3rem",
  zIndex: "100",
}

export { toggleButtonSx, toggleGroupSx }
