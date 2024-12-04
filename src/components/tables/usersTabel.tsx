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
import UserCard from "../layouts/userCard";
import { LightTooltip } from "../actions/copyToolTip";
import { headCells } from "@/models/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletUsers, getUsers } from "@/services/apiService";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/userContext";
import { UserType } from "@/models/userType";

export default function UsersTable() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const { userType } = useUser();
  const isOwner = userType === UserType.ADMIN || userType === UserType.OWNER;
  const columStyle = { fontSize: "20px", fontWeight: "400" };
  const router = useRouter();
  const queryClient = useQueryClient();
  const rowsPerPage = 6;
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
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    mutationFn: () => {
      const userIds = selected
        .map((index) => rows?.[index]?.id)
        .filter((id): id is string => id !== undefined);
      return deletUsers(userIds);
    },
    mutationKey: ["users"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  useEffect(() => {
    if (query.page) {
      const pageNumber = parseInt(query.page as string, 10) - 1;
      setPage(pageNumber >= 0 ? pageNumber : 0);
    }
    if (rows) {
      const calculatedPageCount = Math.ceil(rows.length / rowsPerPage);
      setPageCount(calculatedPageCount);
    }
    console.log(rows);
  }, [query, rows]);

  const handleCreateNew = () => {
    router.push("/users/add");
  };

  const buttonSize = {
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "16px",
    " &.MuiButtonBase-root": { height: "40px" },
  };

  const handleViewUser = (id: string) => {
    router.push(`/users/view/${id}`);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows!.map((_, index) => index);
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
    return rows
      .filter((row) => {
        const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.phoneNumber.includes(searchTerm)
        );
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, page, searchTerm]);

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
          <OutlinedInput
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Search"
          />
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
          {isOwner && (
            <>
              <Button
                sx={{
                  ...buttonSize,
                  background: "#DC3545",
                  width: { xs: "100%", md: "83px" },
                }}
                variant="contained"
                disableElevation
                onClick={() => {
                  if (selected.length !== 0) {
                    mutation.mutate();
                  }
                }}
              >
                {mutation.isPending ? "Loading..." : "  Delete"}
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
            </>
          )}
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
                  "& td:first-of-type, & th:first-of-type": {
                    pl: "25px",
                  },
                  "& td, & th": {
                    fontSize: "19px",
                    py: "25px",
                  },
                }}
              >
                {isOwner && (
                  <TableCell>
                    <Checkbox
                      sx={{
                        "&.MuiCheckbox-root": { p: 0 },
                      }}
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
                )}
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
            <TableBody
              sx={{
                "& td, & th": { borderBottom: "solid 2px #DDE1E6" },
              }}
            >
              {visibleRows.map((row: User, index: number) => {
                const isItemSelected = selected.includes(
                  page * rowsPerPage + index
                );
                const labelId = `enhanced-table-checkbox-${
                  page * rowsPerPage + index
                }`;
                return (
                  <TableRow
                    key={page * rowsPerPage + index}
                    sx={{
                      "& td:first-of-type, & th:first-of-type": {
                        pl: "25px",
                      },
                      cursor: "pointer",
                      "& td, & th": {
                        fontSize: "19px",
                        py: "20px",
                      },
                    }}
                  >
                    {isOwner && (
                      <TableCell>
                        <Checkbox
                          sx={{
                            "&.MuiCheckbox-root": { p: 0 },
                          }}
                          color="primary"
                          onClick={() =>
                            handleClick(page * rowsPerPage + index)
                          }
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    )}
                    <TableCell align="left">
                      <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                        {page * rowsPerPage + index + 1}
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
                        <LightTooltip
                          email={row.email}
                          title="Copy"
                          placement="top"
                        >
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
            const isItemSelected = selected.includes(
              page * rowsPerPage + index
            );
            const labelId = `enhanced-table-checkbox-${
              page * rowsPerPage + index
            }`;
            return (
              <UserCard
                user={row}
                isItemSelected={isItemSelected}
                handleClick={handleClick}
                labelId={labelId}
                key={row.id}
                index={page * rowsPerPage}
                handleViewUser={(id) => handleViewUser(id)}
              />
            );
          })}
        </Box>
      </Paper>
      <Box
        sx={{ display: "flex", justifyContent: { xs: "center", md: "end" } }}
      >
        <PaginationComponent
          pageCount={pageCount}
          setPage={(value) => {
            router.push(`/users/?page=${value + 1}`);
          }}
          page={page + 1}
        />
      </Box>
    </Box>
  );
}
