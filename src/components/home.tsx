import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import StatisticalBox from "./statisticalBox";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LatestActivitiesTable from "./latestActivitiesTable";
import Paths from "./paths";

const HomePage = () => {
  return (
    <>
      <Paths path="Statistical Dashboard" />
      <Grid
        container
        sx={{
          marginTop: {
            xs: "20px",
            sm: "40px",
            md: "70px",
          },
        }}
      >
        <Grid
          container
          sx={{
            gap: {
              xs: 3,
              md: 7,
            },
          }}
          size={{ xs: 12, md: 6 }}
        >
          <StatisticalBox
            count={101}
            status="Active"
            percentage={3}
            Icon={ArrowUpwardIcon}
            color="#1ABC9C"
          ></StatisticalBox>
          <StatisticalBox
            count={101}
            status="Inactive"
            percentage={3}
            Icon={ArrowDownwardIcon}
            color="#FC766A"
          ></StatisticalBox>
          <StatisticalBox
            count={101}
            status="With email"
            percentage={3}
            Icon={EmailIcon}
            color="#2C3E50"
          ></StatisticalBox>
          <StatisticalBox
            count={101}
            status="Without email"
            percentage={3}
            Icon={CloseIcon}
            color="#5B84B1"
          ></StatisticalBox>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LatestActivitiesTable />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
