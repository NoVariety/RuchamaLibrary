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

const summaryIconSx: SxProps = {
  backgroundImage:
    "url(https://cdn-icons-png.flaticon.com/128/1102/1102028.png?ga=GA1.1.448369478.1702563865&semt=ais)",
  width: "1.25rem",
  height: "1.25rem",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  margin: "0",
  marginTop: "0.15rem",
  cursor: "pointer",

  "&:hover": {
    transform: "scale(1.5)",
  },
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
  summaryIconSx,
  titleSx,
  getCoverImageSx,
}
