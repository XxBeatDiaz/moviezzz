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
import { getYearsList } from "../../utils/searchUtils";

export default function FiltersDrawer({ onClickApply, onClickReset }) {
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

  const years = getYearsList();

  const handleOpenDrawer = () => setOpen(true);

  const handleCloseDrawer = () => setOpen(false);

  const handleApplyFilters = () => {
    if (selectedYear || selectedGenre) {
      handleCloseDrawer();
      setApplyMark(true);
      onClickApply(selectedYear, selectedGenre);
    }
  };

  const handleResetFilters = () => {
    handleCloseDrawer();
    setApplyMark(false);
    setSelectedYear("");
    setSelectedGenre("");
    onClickReset();
  };

  const handleFilterYear = (event) => {
    const { value } = event.target;
    setSelectedYear(value);
  };

  const handleFilterGenre = (event) => {
    const { value } = event.target;
    setSelectedGenre(value);
  };

  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        badgeContent={
          applyMark && <CircleIcon sx={{ fontSize: 7, color: "#773535f0" }} />
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
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
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
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
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
