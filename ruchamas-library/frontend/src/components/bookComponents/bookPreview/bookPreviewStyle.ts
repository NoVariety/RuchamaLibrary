import { SxProps } from "@mui/material"

const previewContainerSx: SxProps = {
  backgroundColor: "red",
  height: "auto",
  width: "22rem",
}

const marginContainerSx: SxProps = {
  width: "auto",
  height: "100%",
  backgroundColor: "background.default",
  border: ".1rem solid",
  borderColor: "text.secondary",
  borderRadius: "0.1rem",
}

const coverImageSx: SxProps = {
  width: "8rem",
  height: "12rem",
  margin: "1rem",
  display: "block",
  marginRight: "auto",
  marginLeft: "auto",
  border: ".1rem solid",
  borderColor: "text.secondary",
  borderRadius: "0.1rem",
}

const infoStackSx: SxProps = {
  paddingBottom: "0.5rem",
}

const infoNameSx: SxProps = {
  minWidth: "50%",
  paddingRight: "1rem",
  fontSize: "1rem",
  color: "text.primary",
  textAlign: "left",
}

const infoValueSx: SxProps = {
  minWidth: "50%",
  fontSize: "1rem",
  color: "text.primary",
  wordWrap: "break-word",
  textAlign: "left",
}

const titleSx: SxProps = {
  width: "100%",
  fontSize: "1.2rem",
  textAlign: "center",
  fontWeight: "bold",
}

function getCoverImageSx(imagePath: string): SxProps {
  return {
    ...coverImageSx,
    backgroundImage: `url(${imagePath})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "8rem 12rem",
  }
}

export {
  previewContainerSx,
  marginContainerSx,
  infoStackSx,
  infoNameSx,
  infoValueSx,
  titleSx,
  getCoverImageSx,
}
