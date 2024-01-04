import { SxProps } from "@mui/material"

const marginContainerSx: SxProps = {
  // transform: "scale(0.75)",
  width: "20em",
  height: "100%",
  backgroundColor: "background.default",
  border: ".1em solid",
  borderColor: "text.secondary",
  borderRadius: "0.1em",
}

const coverImageSx: SxProps = {
  width: "8em",
  height: "12em",
  margin: "1em",
  display: "block",
  marginRight: "auto",
  marginLeft: "auto",
  border: ".1em solid",
  borderColor: "text.secondary",
  borderRadius: "0.1em",
  transition: "0.2s",

  "&:hover": {
    transition: "0.2s",
    transform: "scale(1.5) translateY(1.5em)",
  },
}

const infoStackSx: SxProps = {
  paddingBottom: "0.5em",
}

const infoNameSx: SxProps = {
  minWidth: "50%",
  paddingRight: "1em",
  fontSize: "1em",
  color: "text.primary",
  textAlign: "left",
}

const infoValueSx: SxProps = {
  minWidth: "50%",
  fontSize: "1em",
  color: "text.primary",
  wordWrap: "break-word",
  textAlign: "left",
}

const summaryIconSx: SxProps = {
  backgroundImage:
    "url(https://cdn-icons-png.flaticon.com/128/1102/1102028.png?ga=GA1.1.448369478.1702563865&semt=ais)",
  width: "1em",
  height: "1em",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  marginLeft: "0.5rem",
  display: "inline-block",
  verticalAlign: "text-bottom",
  marginBottom: "0.1rem",
}

const titleSx: SxProps = {
  width: "100%",
  fontSize: "1.3em",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "none !important",
  marginTop: "0.5rem",
}

function getCoverImageSx(imagePath: string): SxProps {
  return {
    ...coverImageSx,
    backgroundImage: `url(${imagePath})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "8em 12em",
  }
}

export {
  marginContainerSx,
  infoStackSx,
  infoNameSx,
  infoValueSx,
  summaryIconSx,
  titleSx,
  getCoverImageSx,
}
