import { SxProps } from "@mui/material"
import { orange } from "@mui/material/colors"

const addBookFormContainerSx: SxProps = {
  display: "grid",
  padding: "1.5rem",
  width: "25rem",
  height: "100%",
  backgroundColor: "background.default",
  border: ".1em solid",
  borderColor: "text.secondary",
  borderRadius: "0.1em",
}

const requiredAsterisk: SxProps = {
  "& .MuiFormLabel-asterisk": { color: orange[700] },
}

export { addBookFormContainerSx, requiredAsterisk }
