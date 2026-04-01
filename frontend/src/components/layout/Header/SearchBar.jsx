import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);

    // 👉 later:
    // debounce + API call
    // search agents / missions / TPVS
  };

  return (
    <TextField
      fullWidth
      size="small"
      value={query}
      onChange={handleChange}
      placeholder="Search agents, missions, TPVS..."
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;