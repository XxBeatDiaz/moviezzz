import { Divider, Typography, TextField, MenuItem } from "@mui/material";

export default function FiltersForm({
  selectedYear,
  selectedGenre,
  years,
  genres,
  handleFilterYear,
  handleFilterGenre,
}) {
  return (
    <>
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
    </>
  );
}
