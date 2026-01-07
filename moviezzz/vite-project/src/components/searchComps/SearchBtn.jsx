import SearchIcon from "@mui/icons-material/Search";

export default function SearchBtn({ isActive, onClick = () => {} }) {
  return (
    <SearchIcon
      onClick={isActive ? onClick : undefined}
      sx={{
        alignSelf: "center",
        cursor: isActive ? "pointer" : "default",
        color: isActive ? "#e32828a9" : "#504d4de4",
      }}
    />
  );
}
