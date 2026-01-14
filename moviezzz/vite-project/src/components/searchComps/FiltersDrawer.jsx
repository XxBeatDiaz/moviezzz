import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Box, Slide } from "@mui/material";

import OpenFiltersBtn from "./OpenFiltersBtn";
import FiltersForm from "./FiltersForm";
import FiltersBtns from "./FiltersBtns";

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

  const handleFilterYear = ({ target: { value } }) => {
    setSelectedYear(value);
  };

  const handleFilterGenre = ({ target: { value } }) => {
    setSelectedGenre(value);
  };

  return (
    <>
      <OpenFiltersBtn applyMark={applyMark} onOpen={handleOpenDrawer} />

      {open && (
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
              onClick={(event) => event.stopPropagation()}
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
              <FiltersForm
                selectedYear={selectedYear}
                selectedGenre={selectedGenre}
                years={years}
                genres={genres}
                handleFilterYear={handleFilterYear}
                handleFilterGenre={handleFilterGenre}
              />

              <FiltersBtns
                applyMark={applyMark}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
              />
            </Box>
          </Slide>
        </Box>
      )}
    </>
  );
}
