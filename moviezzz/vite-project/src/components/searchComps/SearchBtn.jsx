import SearchIcon from '@mui/icons-material/Search';

export default function SearchBtn({isActive, onClick}) {
  return (
    <SearchIcon
      variant="outlined"
      onClick={isActive ? onClick: undefined}
      sx={{
        alignSelf: "center",
        cursor: isActive ? "pointer" : "",
        color: isActive ?'#e32828a9' : "#504d4de4",
      }}
    >
      Search
    </SearchIcon>
  );
}
