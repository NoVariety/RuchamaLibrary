import { SxProps } from "@mui/material"

const marginContainerSx: SxProps = {
  width: "20em",
  height: "auto",
  textAlign: "center",
  backgroundColor: "background.default",
  border: ".1em solid",
  borderColor: "text.secondary",
  borderRadius: "0.1em",
}

const buttonSx: SxProps = {
  minWidth: "25%",
  margin: "0.5em",
  float: "right",
  marginRight: "1em",
}

const infoValueSx: SxProps = {
  minWidth: "25%",
  fontSize: "1em",
  color: "text.primary",
  wordWrap: "break-word",
  textAlign: "left",
  fontWeight: "400",
  fontFamily: "Lexend",
  marginTop: "0.8em",
}

const infoNameSx: SxProps = {
  minWidth: "25%",
  paddingRight: "1em",
  fontSize: "1em",
  color: "text.primary",
  textAlign: "left",
  fontWeight: "400",
  fontFamily: "Lexend",
  marginTop: "0.25em",
}

export { marginContainerSx, buttonSx, infoValueSx, infoNameSx }
