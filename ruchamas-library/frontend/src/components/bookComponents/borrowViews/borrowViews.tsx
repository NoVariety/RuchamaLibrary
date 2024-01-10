import * as React from "react"

import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import SwipeUpAltRoundedIcon from "@mui/icons-material/SwipeUpAltRounded"
import SwipeDownAltRoundedIcon from "@mui/icons-material/SwipeDownAltRounded"
import Tooltip from "@mui/material/Tooltip"

import { borrowViewTypes } from "../../../data.consts"

import { toggleButtonSx, toggleGroupSx } from "./borrowViewsStyle"

type Props = {
  views: borrowViewTypes
  setViews: React.Dispatch<React.SetStateAction<borrowViewTypes>>
}

export default function BorrowViews({ views, setViews }: Props) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: borrowViewTypes | null
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
      <ToggleButton value={borrowViewTypes.BORROW} sx={toggleButtonSx}>
        <Tooltip title="borrow books" placement="top" arrow>
          <SwipeUpAltRoundedIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={borrowViewTypes.RETURN} sx={toggleButtonSx}>
        <Tooltip title="return books" placement="top" arrow>
          <SwipeDownAltRoundedIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
