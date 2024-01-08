import * as React from "react"

import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import BookRoundedIcon from "@mui/icons-material/BookRounded"
import { viewTypes } from "../../../data.consts"
import { toggleButtonSx } from "./navViewsStyle"

type Props = {
  views: viewTypes
  setViews: React.Dispatch<React.SetStateAction<viewTypes>>
}

export default function NavViews({ views, setViews }: Props) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: viewTypes | null
  ) => {
    if (newView !== null) {
      setViews(newView)
    }
  }

  return (
    <ToggleButtonGroup exclusive value={views} onChange={handleChange}>
      <ToggleButton value={viewTypes.BOOKS} sx={toggleButtonSx}>
        <BookRoundedIcon />
      </ToggleButton>
      <ToggleButton value={viewTypes.READERS} sx={toggleButtonSx}>
        <PersonRoundedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
