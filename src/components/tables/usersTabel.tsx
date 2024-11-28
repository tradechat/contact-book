import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Paths from "@/components/layouts/paths";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { Button, FormControl, OutlinedInput, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { HeadCell, User } from "@/models/user";
import UserStatusBox from "../actions/userStatusBox";
import PaginationComponent from "../actions/paginationComponent";
import UserCard from "../userCard";
import { LightTooltip } from "../actions/copyToolTip";
import { headCells } from "@/models/user";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/apiService";
import { useEffect, useMemo, useState } from "react";

export default function UsersTable() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const columStyle = { fontSize: "20px", fontWeight: "400" };
  const router = useRouter();

  const { query } = router;
  const {
    isLoading,
    error,
    data: rows,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    setSearchTerm("");
    if (query.page) {
      const pageNumber = parseInt(query.page as string, 10) - 1;
      setPage(pageNumber >= 0 ? pageNumber : 0);
    }
    if (rows) {
      const rowsPerPage = 6;
      const calculatedPageCount = Math.ceil(rows.length / rowsPerPage);
      setPageCount(calculatedPageCount);
    }
    console.log(rows);
  }, [query, rows]);

  const handleCreateNew = () => {
    router.push("/users/add");
  };

  const handleViewUser = (id: string) => {
    router.push(`/users/view/${id}`);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows!
        .map((n: User) => (typeof n.id === "number" ? n.id : NaN))
        .filter((id) => !isNaN(id));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const visibleRows = useMemo(() => {
    if (!rows) return [];
    console.log(rows);

    return rows
      .filter((row) => {
        const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.phoneNumber.includes(searchTerm)
        );
      })
      .slice(page * 6, page * 6 + 6);
  }, [rows, page, searchTerm]);

  const buttonSize = {
    textTransform: "capitalize",
    fontWeight: "300",
    fontSize: "16px",
    " &.MuiButtonBase-root": { height: "40px" },
  };

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return "Loading.....";
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paths></Paths>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "space-between",
        }}
      >
        <FormControl
          size="small"
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: "400px" },
            background: "#fff",
          }}
        >
          <OutlinedInput placeholder="Search" />
        </FormControl>
        <Box
          sx={{
            marginBottom: { xs: "20px", md: "0px" },
            display: "flex",
            justifyContent: "end",
            flexWrap: { xs: "wrap-reverse", md: "nowrap" },
            width: "100%",
            gap: { xs: "7px", md: "25px" },
          }}
        >
          <Button
            sx={{
              ...buttonSize,
              background: "#DC3545",
              width: { xs: "100%", md: "83px" },
            }}
            variant="contained"
            disableElevation
          >
            Delete
          </Button>

          <Button
            sx={{
              ...buttonSize,
              width: { xs: "100%", md: "200px" },
              background: "#4E73DF",
            }}
            variant="contained"
            disableElevation
            onClick={handleCreateNew}
          >
            Invite New User
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: "100%", mb: 2, mt: "18px" }} variant="outlined">
        <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead
              sx={{
                "&.MuiTableHead-root": {
                  borderBottom: "solid 2px",
                },
              }}
            >
              <TableRow
                sx={{
                  "& td, & th": {
                    fontSize: "19px",
                    padding: "15px",
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows!.length
                    }
                    checked={
                      rows!.length > 0 && selected.length === rows!.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
                {headCells.map((headCell: HeadCell, index: number) => (
                  <TableCell
                    key={index}
                    align={headCell.align ?? "left"}
                    padding="normal"
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row: User, index: number) => {
                const isItemSelected = selected.includes(index);
                const labelId = `enhanced-table-checkbox-${row.id}`;
                return (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: "pointer",
                      "& td, & th": {
                        fontSize: "19px",
                        padding: "15px",
                      },
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        color="primary"
                        onClick={() => handleClick(index)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                        {index}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography noWrap sx={{ ...columStyle }}>
                        {row.firstName}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography noWrap sx={{ ...columStyle }}>
                        {row.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ ...columStyle }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Typography noWrap sx={{ ...columStyle }}>
                          {row.email}
                        </Typography>
                        <LightTooltip title="Copy" placement="top">
                          <FileCopyOutlinedIcon></FileCopyOutlinedIcon>
                        </LightTooltip>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Typography noWrap sx={{ ...columStyle }}>
                        {row.phoneNumber}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <UserStatusBox status={row.status!} />
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "400",
                          background: "#4E73DF",
                        }}
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          handleViewUser(row.id!);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {visibleRows.map((row: User, index: number) => {
            const isItemSelected = selected.includes(index);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <UserCard
                user={row}
                isItemSelected={isItemSelected}
                handleClick={handleClick}
                labelId={labelId}
                key={row.id}
                index={index}
              />
            );
          })}
        </Box>
      </Paper>
      <Box
        sx={{ display: "flex", justifyContent: { xs: "center", md: "end" } }}
      >
        <PaginationComponent pageCount={pageCount} setPage={setPage} />
      </Box>
    </Box>
  );
}
