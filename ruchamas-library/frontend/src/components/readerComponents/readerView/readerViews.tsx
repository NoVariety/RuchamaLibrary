import * as React from "react"

import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import EventRoundedIcon from "@mui/icons-material/EventRounded"
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded"
import Tooltip from "@mui/material/Tooltip"

import { readerViewTypes } from "../../../data.consts"

import { toggleButtonSx, toggleGroupSx } from "./readerViewsStyle"

type Props = {
  views: readerViewTypes
  setViews: React.Dispatch<React.SetStateAction<readerViewTypes>>
}

export default function ReaderViews({ views, setViews }: Props) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: readerViewTypes | null
  ) => {
    if (newView !== null) {
      setViews(newView)
    }
  }

  return (
    <ToggleButtonGroup
      exclusive
      value={views}
      onChange={handleChange}
      sx={toggleGroupSx}
    >
      <ToggleButton value={readerViewTypes.ALL} sx={toggleButtonSx}>
        <Tooltip title="all readers" placement="top" arrow>
          <CollectionsBookmarkRoundedIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={readerViewTypes.UNRETURNED} sx={toggleButtonSx}>
        <Tooltip title="readers late to return a book" placement="top" arrow>
          <EventRoundedIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
