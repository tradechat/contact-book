import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Pagination,
  PaginationItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

interface LatestActivitiesTableProps {
  headShow: boolean;
}

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
  createData("Matt Adams", "01 Jan 2022", "Add", "Noor"),
  createData("Matt Adams", "01 Jan 2022", "Add", "Noor"),
  createData("Matt Adams", "01 Jan 2022", "Add", "Noor"),
];

const statusColors = [
  { status: "Add", color: "#00AC69" },
  { status: "Delete", color: "#FC766A" },
  { status: "Update", color: "#F4A100" },
  { status: "Access", color: "#0061F2" },
  { status: "Email sent", color: "#17C3B2" },
];

const getStatusColor = (status: string) => {
  const statusColor = statusColors.find((item) => item.status === status);
  return statusColor ? statusColor.color : "#000";
};

const LatestActivitiesTable = ({ headShow }: LatestActivitiesTableProps) => {
  const [page, setPage] = React.useState(0);
  const showRow = headShow ? 10 : 6;
  const pageCount = Math.ceil(rows.length / showRow);
  const visibleRows = React.useMemo(
    () => rows.slice(page * showRow, page * showRow + showRow),
    [page, showRow]
  );

  return (
    <>
      <Card
        elevation={0}
        sx={{
          "&.MuiCard-root": {
            borderRadius: "6px",
            border: "solid 1px #E0E0E0",
          },
        }}
      >
        {!headShow && (
          <CardHeader
            title={
              <Link
                style={{
                  color: "#000",
                  textDecoration: "none",
                  fontSize: "26px",
                }}
                href="/activities"
              >
                Latest activities
              </Link>
            }
            sx={{
              backgroundColor: "#F7F7F7",
              "&.MuiCardHeader-root": {
                pl: "40px",
                borderRadius: "5px",
                borderBottom: "solid 1px #E0E0E0",
              },
            }}
          ></CardHeader>
        )}
        <CardContent
          sx={
            headShow
              ? {
                  paddingRight: { xs: "20px", md: "50px" },
                  paddingLeft: { xs: "20px", md: "50px" },
                  "&.MuiCardContent-root": {
                    paddingBottom: "50px",
                    paddingTop: "30px",
                  },
                }
              : {
                  "&.MuiCardContent-root": {
                    paddingBottom: "35px",
                    paddingTop: "30px",
                  },
                  paddingRight: { xs: "20px", md: "30px" },
                  paddingLeft: { xs: "20px", md: "30px" },
                }
          }
        >
          <Table stickyHeader aria-label="latest-activities">
            {headShow && (
              <>
                <TableHead sx={{ mb: "20px", width: "100%" }}>
                  <TableRow
                    sx={{
                      "& td, & th": {
                        p: 0,
                        py: "9px",
                        borderBottom: "solid 2px #000",
                        fontSize: "20px",
                        fontWeight: "700",
                      },
                      "& th:nth-child(3)": {
                        display: { xs: "none", sm: "table-cell" },
                      },
                      "& th:nth-child(4)": {
                        display: { xs: "none", sm: "table-cell" },
                      },
                      "& th:last-child": {
                        p: "9px 0",
                      },
                    }}
                  >
                    <TableCell align="left">Contact</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Action</TableCell>
                    <TableCell align="left">By</TableCell>
                  </TableRow>
                </TableHead>
              </>
            )}

            <TableBody>
              {headShow && (
                <TableRow
                  sx={{
                    "& td, & th": {
                      borderBottom: "0",
                    },
                  }}
                >
                  <TableCell
                    style={{ height: 20, padding: 0 }}
                    colSpan={4}
                  ></TableCell>
                </TableRow>
              )}
              {visibleRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "& td, & th": {
                      p: 0,
                      py: "9px",
                      borderBottom: headShow ? "solid 1px #DCDCDC" : 0,
                    },
                    "& td:first-child": {
                      width: {
                        xs: "70%",
                        sm: "50%",
                        md: headShow ? "60%" : "50%",
                      },
                    },
                    "& td:last-child": {
                      width: { xs: "auto", sm: "5%" },
                      p: "10px 0",
                    },
                    "& td:nth-child(3)": {
                      display: { xs: "none", sm: "table-cell" },
                    },

                    "&:last-child td": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "400",
                        opacity: ".8",
                      }}
                    >
                      {row.name}
                    </Typography>
                    <Typography
                      noWrap
                      sx={{
                        display: { xs: "block", sm: "none" },
                        fontSize: "14px",
                        color: "#000",
                        textAlign: "left",
                        opacity: ".6",
                      }}
                    >
                      {row.date}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      noWrap
                      sx={{
                        display: { xs: "none", sm: "block" },
                        fontSize: "14px",
                        color: "#000",
                        textAlign: "left",
                        opacity: ".6",
                      }}
                    >
                      {row.date}
                    </Typography>

                    <Box sx={{ display: { xs: "block", sm: "none" } }}>
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
                        <Typography
                          noWrap
                          sx={{ color: "#000", opacity: ".4" }}
                        >
                          {row.status}
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        sx={{
                          width: "100%",
                          background: "#EEEEEE",
                          color: "#000",
                          height: "20px",
                          textTransform: "capitalize",
                          fontWeight: "400",
                        }}
                      >
                        {row.admin}
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
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
                      <Typography noWrap sx={{ color: "#000", opacity: ".4" }}>
                        {row.status}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                    align="left"
                  >
                    <Button
                      size="small"
                      sx={{
                        background: "#EEEEEE",
                        color: "#000",
                        height: "20px",
                        borderRadius: "2px",
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
      {headShow && (
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
          <Pagination
            count={pageCount}
            color="primary"
            sx={{ background: "#fff" }}
            onChange={(event, value) => {
              setPage(value - 1);
            }}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                components={{
                  previous: () => <Box sx={{ color: "#4E73DF" }}>Previous</Box>,
                  next: () => <Box sx={{ color: "#4E73DF" }}>Next</Box>,
                }}
                sx={{
                  "&.MuiButtonBase-root": {
                    borderRadius: 0,
                    border: "solid 1px #DEE2E6",
                    margin: 0,
                    fontSize: "18px",
                    padding: "20px",
                  },
                  "& .MuiPaginationItem-previousNext": {
                    backgroundColor: "#DC3545",
                    color: "white",
                    borderRadius: "0px",
                    fontSize: "18px",
                  },
                }}
              />
            )}
          />
        </Box>
      )}
    </>
  );
};

export default LatestActivitiesTable;
