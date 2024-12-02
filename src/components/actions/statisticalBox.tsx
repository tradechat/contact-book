import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface StatisticalBoxProps {
  count: number;
  status: string;
  percentage: number;
  color: string;
  Icon: React.ElementType;
}

const StatisticalBox = ({
  count,
  status,
  percentage,
  color,
  Icon,
}: StatisticalBoxProps) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box
        sx={{
          background: color,
          borderRadius: "5px",
          p: "23px",
        }}
      >
        <Grid container>
          <Grid size={9}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "40px", color: "#fff" }}>
                {count}
              </Typography>
              <Typography
                sx={{ fontSize: "20px", color: "#fff", opacity: ".5" }}
              >
                {status}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <ArrowUpwardIcon
                  sx={{
                    fontSize: "17px",
                    color: "#fff",
                    opacity: ".5",
                    mb: "4px",
                  }}
                ></ArrowUpwardIcon>
                <Typography
                  noWrap
                  sx={{
                    fontSize: "16px",
                    color: "#fff",
                    opacity: ".5",
                    ml: "3px",
                  }}
                >
                  {`${percentage} %  from last month`}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={3}>
            <Box
              sx={{
                height: "52px",
                width: "52px",
                background: "#fff",
                opacity: ".5",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "auto",
              }}
            >
              <Icon sx={{ color: color, fontSize: "30px" }}></Icon>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default StatisticalBox;
