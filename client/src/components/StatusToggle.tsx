import type { MouseEvent } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { StatusFilter, type StatusFilterType } from "../types/ticket";

type StatusToggleProps = {
  selectedFilter: StatusFilterType;
  onFilterChange: (filter: StatusFilterType) => void;
};

export function StatusToggle({ selectedFilter, onFilterChange }: StatusToggleProps) {
  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    newFilter: StatusFilterType | null,
  ) => {
    if (newFilter !== null) {
      onFilterChange(newFilter);
    }
  };

  return (
    <ToggleButtonGroup
      value={selectedFilter}
      exclusive
      onChange={handleChange}
      color="primary"
      size="small"
    >
      <ToggleButton value={StatusFilter.ALL}>All</ToggleButton>
      <ToggleButton value={StatusFilter.OPEN}>Open</ToggleButton>
      <ToggleButton value={StatusFilter.RESOLVED}>Resolved</ToggleButton>
    </ToggleButtonGroup>
  );
}
