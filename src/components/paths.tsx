import { Divider, Typography } from "@mui/material";

interface PathsProps {
  path: string;
}

const Paths = ({ path }: PathsProps) => {
  return (
    <>
      <Typography
        sx={{ fontSize: "24px", fontWeight: "400", marginBottom: "13px" }}
      >
        {path}
      </Typography>
      <Divider></Divider>
    </>
  );
};

export default Paths;
