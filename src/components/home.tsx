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
      <Paths />
      <Grid
        container
        spacing={{ xs: "56px", md: "56px", lg: "50px", xl: "70px" }}
        sx={{
          marginTop: {
            xs: "20px",
            sm: "40px",
            md: "10px",
          },
        }}
      >
        <Grid
          container
          spacing={{ xs: "30px", md: "30px", lg: "70px", xl: "70px" }}
          size={{ xs: 12, md: 12, lg: 6, xl: 6 }}
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
        <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
          <LatestActivitiesTable headShow={false} />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
