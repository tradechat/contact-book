import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

function createData(name: string, date: string, status: string, admin: string) {
  return { name, date, status, admin };
}

const rows = [
  createData("Adam Smith", "01 Jan 2022", "Add", "Noor"),
  createData("Ronald Markson", "01 Jan 2022", "Delete", "David"),
  createData("David Walso", "01 Jan 2022", "Update", "Chris"),
  createData("Adam Waldo", "01 Jan 2022", "Access", "Noor"),
  createData("John Bullak", "01 Jan 2022", "Email sent", "Noor"),
  createData("Matt Adams", "01 Jan 2022", "Add", "Noor"),
];

const statusColors = [
  { status: "Add", color: "#00AC69" },
  { status: "Delete", color: "#FF0000" },
  { status: "Update", color: "#FFA500" },
  { status: "Access", color: "#0000FF" },
  { status: "Email sent", color: "#8A2BE2" },
];

const getStatusColor = (status: string) => {
  const statusColor = statusColors.find((item) => item.status === status);
  return statusColor ? statusColor.color : "#000";
};

const LatestActivitiesTable = () => {
  return (
    <Card
      sx={{
        "&.MuiCard-root": {
          borderRadius: "6px",
          border: "solid 1px #E0E0E0",
        },
        marginTop: { xs: "56px", md: 0 },
        marginBottom: { xs: "56px", md: 0 },
      }}
    >
      <CardHeader
        title="Latest activities"
        sx={{
          backgroundColor: "#F7F7F7",
          "&.MuiCardHeader-root": {
            borderRadius: "5px",
            border: "solid 1px #E0E0E0",
          },
        }}
      ></CardHeader>
      <CardContent>
        <Table aria-label="latest-activities">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "& td, & th": {
                    border: 0,
                    padding: "9px",
                  },
                  "& th:first-child": {
                    border: 0,
                    width: "310px",
                  },
                }}
              >
                <TableCell
                  sx={{ fontSize: "20px", fontWeight: "400" }}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#000",
                    opacity: ".4",
                    textAlign: "center",
                  }}
                >
                  {row.date}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        height: "10px",
                        width: "10px",
                        borderRadius: "50%",
                        background: getStatusColor(row.status),
                        mr: "8px",
                      }}
                    ></Box>
                    <Box sx={{ color: "#000", opacity: ".4" }}>
                      {row.status}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    sx={{
                      background: "#EEEEEE",
                      color: "#000",
                      textTransform: "capitalize",
                      fontWeight: "400",
                    }}
                  >
                    {row.admin}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LatestActivitiesTable;
