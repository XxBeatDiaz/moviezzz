import { useState } from "react";

import { Stack, TextField } from "@mui/material";

import SearchBtn from "./SearchBtn";
import ClearTextFieldBtn from "./ClearTextFieldBtn";

export default function SearchBar({
  id,
  placeholder,
  onChange,
  liveSearch = false,
}) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !liveSearch) {
      onChange(query);
      setQuery("");
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (liveSearch) {
      onChange(value);
    }
  };

  function handleClearText() {
    setQuery("");
    if (liveSearch) onChange("");
  }

  function handleSearchClick() {
    if (!liveSearch) {
      onChange(query);
      setQuery("");
    }
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      onKeyDown={handleKeyDown}
      sx={{ width: "70%" }}
    >
      <ClearTextFieldBtn isActive={query} onClick={handleClearText} />

      <TextField
        id={id}
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        size="small"
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            color: "white",
            backgroundColor: "#682f2ff2",
            borderRadius: "4px",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#a12b2bbd",
            },
            "&.Mui-focused": {
              backgroundColor: "#984b4bc3",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#281e1eff",
            },
          },
        }}
      />
      {!liveSearch && <SearchBtn isActive={query} onClick={handleSearchClick} />}
    </Stack>
  );
}
