import CloseIcon from "@mui/icons-material/Close";

export default function ClearTextFieldBtn({ isActive, onClick }) {

  function handleClick() {
    onClick()
  }

  return (
    <CloseIcon
      onClick={isActive ? handleClick : undefined}
      sx={{
        alignSelf: "center",
        cursor: isActive ? "pointer" : "",
        color: isActive ? "#842e2ecb" : "#504d4de4",
      }}
    />
  );
}
