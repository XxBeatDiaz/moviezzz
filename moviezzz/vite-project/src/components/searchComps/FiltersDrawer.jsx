import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Button,
  Box,
  Typography,
  Divider,
  Badge,
  TextField,
  MenuItem,
  Slide,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import CircleIcon from "@mui/icons-material/Circle";

import { selectLastSearch } from "../../redux/slices/search";
import { selectGenres } from "../../redux/slices/genres";

const YEARS = 1900;

export default function FiltersDrawer({
  onClickApply,
  onClickReset,
  currentYear,
}) {
  const [open, setOpen] = useState(false);
  const [applyMark, setApplyMark] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const genres = useSelector(selectGenres);
  const lastSearch = useSelector(selectLastSearch);

  useEffect(() => {
    setSelectedYear(lastSearch.year || "");
    setSelectedGenre(lastSearch.genre || "");
  }, [lastSearch]);

  const years = getYearsList(currentYear);

  function handleOpenDrawer() {
    setOpen(true);
  }

  function handleCloseDrawer() {
    setOpen(false);
  }

  function handleApplyFilters() {
    if (!selectedYear && !selectedGenre) return;

    handleCloseDrawer();
    setApplyMark(true);
    onClickApply(selectedYear, selectedGenre);
  }

  function handleResetFilters() {
    handleCloseDrawer();
    setApplyMark(false);
    setSelectedYear("");
    setSelectedGenre("");
    onClickReset();
  }

  function handleFilterYear(e) {
    setSelectedYear(e.target.value);
  }

  function handleFilterGenre(e) {
    setSelectedGenre(e.target.value);
  }

  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        badgeContent={
          applyMark ? (
            <CircleIcon sx={{ fontSize: 7, color: "#773535f0" }} />
          ) : undefined
        }
      >
        <FilterListIcon
          onClick={handleOpenDrawer}
          sx={{
            cursor: "pointer",
            color: "#797575ff",
            transition: "color 0.17s",
            "&:hover": { color: "#e03838cc" },
          }}
        />
      </Badge>

      {open && (
        <>
          <Box
            onClick={handleCloseDrawer}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "rgba(0,0,0,0.3)",
              zIndex: 1200,
            }}
          >
            <Slide in={open} direction="down" mountOnEnter unmountOnExit>
              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  position: "fixed",
                  top: 0,
                  left: "40%",
                  width: "20%",
                  transform: "translateX(-50%)",
                  bgcolor: "white",
                  borderRadius: "0 0 12px 12px",
                  boxShadow: "0 10px 900px rgba(130,16,16,0.32)",
                  zIndex: 1300,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  overflowY: "auto",
                }}
              >
                <Typography variant="h6">Filters</Typography>

                <Divider />

                <TextField
                  id={`genre-select/${selectedGenre}`}
                  label="Genre"
                  value={selectedGenre}
                  select
                  onChange={handleFilterGenre}
                >
                  {genres.map((g) => (
                    <MenuItem key={g.id} value={g.id}>
                      {g.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id={`year-Select/${selectedYear}`}
                  label="Year"
                  value={selectedYear}
                  select
                  onChange={handleFilterYear}
                >
                  {years.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </TextField>

                <Divider />

                <Box>
                  <Button
                    variant="text"
                    color="success"
                    onClick={handleApplyFilters}
                  >
                    Apply
                  </Button>

                  {applyMark && (
                    <Button
                      variant="text"
                      color="error"
                      onClick={handleResetFilters}
                    >
                      Reset
                    </Button>
                  )}
                </Box>
              </Box>
            </Slide>
          </Box>
        </>
      )}
    </>
  );
}

function getYearsList(currentYear) {
  const years = Array.from(
    { length: currentYear - YEARS + 1 },
    (_, year) => 1900 + year
  ).reverse();
  return years;
}
