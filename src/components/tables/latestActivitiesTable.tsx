import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../actions/paginationComponent";
import { useQuery } from "@tanstack/react-query";
import { getActivities } from "@/services/apiService";
import { useRouter } from "next/router";
import { Activity } from "@/models/activity";

interface LatestActivitiesTableProps {
  headShow: boolean;
}

const statusColors = [
  { status: "Add", color: "#00AC69" },
  { status: "Delete", color: "#FC766A" },
  { status: "Update", color: "#F4A100" },
  { status: "Access", color: "#0061F2" },
  { status: "Email sent", color: "#17C3B2" },
];

const getStatusColor = (status: string) => {
  const statusColor = statusColors.find((item) => item.status === status);
  return statusColor ? statusColor.color : "#eee";
};

const LatestActivitiesTable = ({ headShow }: LatestActivitiesTableProps) => {
  const {
    isLoading,
    error,
    data: rows,
  } = useQuery<Activity[]>({
    queryKey: ["activities"],
    queryFn: getActivities,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const [page, setPage] = useState(0);
  const showRow = headShow ? 10 : 6;
  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.page) {
      const pageNumber = parseInt(query.page as string, 10) - 1;
      setPage(pageNumber >= 0 ? pageNumber : 0);
    }

    if (rows) {
      const rowsPerPage = headShow ? 10 : 6;
      const calculatedPageCount = Math.ceil(rows.length / rowsPerPage);
      setPageCount(calculatedPageCount);
    }
  }, [query, rows, headShow]);

  const visibleRows = React.useMemo(() => {
    if (!rows) return [];
    return rows?.slice(page * showRow, page * showRow + showRow);
  }, [page, showRow, rows]);

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return "Loading.....";
  }

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
                    paddingBottom: "32px",
                    paddingTop: "37px",
                  },
                }
              : {
                  "&.MuiCardContent-root": {
                    paddingBottom: "42px",
                    paddingTop: "34px",
                  },
                  paddingRight: { xs: "20px", md: "40px" },
                  paddingLeft: { xs: "20px", md: "40px" },
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
                      "& th:nth-of-type(3)": {
                        display: { xs: "none", sm: "table-cell" },
                      },
                      "& th:nth-of-type(4)": {
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
              {visibleRows!.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "& td, & th": {
                      p: 0,
                      pb: !headShow ? "18px" : "10px",
                      pt: !headShow ? 0 : "10px",
                      borderBottom: headShow ? "solid 1px #DCDCDC" : 0,
                    },
                    "& td:first-of-type": {
                      width: {
                        xs: "70%",
                        sm: "50%",
                        md: headShow ? "70%" : "52%",
                      },
                    },
                    "& td:last-of-type": {
                      width: { xs: "auto", sm: !headShow ? "10%" : "auto" },
                      pb: !headShow ? "18px" : "",
                    },

                    "& td:nth-of-type(3)": {
                      display: { xs: "none", sm: "table-cell" },
                      width: !headShow ? "18%" : "auto",
                    },

                    "&:last-of-type td": {
                      borderBottom: "none",
                      p: !headShow ? 0 : "auto",
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
                      {row.contact}
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
                      {new Date(row.timestamp).toISOString().split("T")[0]}{" "}
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
                      {new Date(row.timestamp).toISOString().split("T")[0]}
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
                            background: getStatusColor(row.action!),
                            mr: "8px",
                          }}
                        ></Box>
                        <Typography
                          noWrap
                          sx={{ color: "#000", opacity: ".4" }}
                        >
                          {row.action}
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
                        {row.by}
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
                          background: getStatusColor(row.action),
                          mr: "8px",
                        }}
                      ></Box>
                      <Typography noWrap sx={{ color: "#000", opacity: ".4" }}>
                        {row.action}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                    align="left"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#EEEEEE",
                        color: "#000",
                        height: "20px",
                        borderRadius: "2px",
                        textTransform: "capitalize",
                        fontWeight: "400",
                        width: "100%",
                      }}
                    >
                      {row.by}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {headShow && (
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
          <PaginationComponent pageCount={pageCount} setPage={setPage} />
        </Box>
      )}
    </>
  );
};

export default LatestActivitiesTable;
