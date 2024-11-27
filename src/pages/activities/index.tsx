import LatestActivitiesTable from "@/components/tables/latestActivitiesTable";
import Paths from "@/components/layouts/paths";
import { Box } from "@mui/material";

const Activities = () => {
  return (
    <Box>
      <Paths></Paths>
      <Box sx={{ marginBottom: "30px" }}></Box>
      <LatestActivitiesTable headShow={true}></LatestActivitiesTable>
    </Box>
  );
};

export default Activities;
