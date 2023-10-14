import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Stack } from "@mui/material";

const Footer = () => {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      sx={{ backgroundColor: "black", color: "white", padding: "4px 0px" }}
    >
      <Typography variant="body2">All rights reserved.</Typography>
      <Typography>
        Developed by <FavoriteRoundedIcon fontSize="small" color="primary" />
        <Link
          href="https://github.com/MuminBashir"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          Mumin Bashir
        </Link>
      </Typography>
    </Stack>
  );
};

export default Footer;
