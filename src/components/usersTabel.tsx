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
import Paths from "@/components/paths";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Fade,
  FormControl,
  OutlinedInput,
  Pagination,
  PaginationItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { HeadCell, User } from "@/models/user";
import UserStatusBox from "./userStatusBox";

interface TableProps {
  rows: User[];
  headCells: HeadCell[];
}

interface EnhancedTableProps {
  headCells: any;
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
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
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {props.headCells.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ?? "left"}
            padding="normal"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function UsersTable({ rows, headCells }: TableProps) {
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const pageCount = Math.ceil(rows.length / 6);
  const columStyle = { fontSize: "20px", fontWeight: "400" };

  const router = useRouter();

  const buttonSize = {
    textTransform: "capitalize",
    fontWeight: "300",
    fontSize: "16px",
    " &.MuiButtonBase-root": { height: "40px" },
  };

  const handleCreateNew = () => {
    router.push("/users/user/?mode=add");
  };

  const handleViewUser = (id: number) => {
    router.push(`/users/user/?mode=view&id=${id}`);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
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

  const visibleRows = React.useMemo(
    () => rows.slice(page * 6, page * 6 + 6),
    [page, 6]
  );

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
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row: User, index: number) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      "& td, & th": {
                        fontSize: "19px",
                        padding: "15px",
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                        {row.id < 10 ? "00" : "0"}
                        {row.id}
                      </Typography>
                    </TableCell>{" "}
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
                        <Tooltip
                          title="Copy"
                          arrow
                          placement="top"
                          sx={{
                            "& .MuiTooltip-arrow": { background: "#fff" },
                          }}
                        >
                          <FileCopyOutlinedIcon></FileCopyOutlinedIcon>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Typography noWrap sx={{ ...columStyle }}>
                        {row.phone}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <UserStatusBox status={row.status!} />
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        sx={{ textTransform: "capitalize", fontWeight: "400" }}
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          handleViewUser(row.id);
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
            const isItemSelected = selected.includes(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <Card
                sx={{ border: "solid 1px #E0E0E0", m: "20px" }}
                elevation={0}
              >
                <CardHeader
                  sx={{
                    borderBottom: "solid 1px #E0E0E0",
                    "&.MuiCardHeader-root": { p: "7px", pr: "16px" },
                  }}
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Checkbox
                        sx={{ position: "relative", zIndex: "999" }}
                        color="primary"
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                      {row.favorite ? (
                        <StarBorderIcon />
                      ) : (
                        <StarIcon sx={{ color: "#FC0" }} />
                      )}
                    </Box>
                  }
                ></CardHeader>
                <CardContent sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pb: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        p: "4px",
                        border: "solid 1px #E0E0E0",
                        bgcolor: "#F7F7F7",
                        width: "42px",
                        textAlign: "center",
                        borderRadius: "5px",
                        color: "#787878",
                        fontSize: "13px",
                      }}
                    >
                      #{row.id}
                    </Box>
                    <Box>
                      <UserStatusBox status={row.status!} />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
                      {row.firstName + row.lastName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "1px",
                      width: "80%",
                      bgcolor: "#E0E0E0",
                      m: "10px auto",
                    }}
                  ></Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      sx={{
                        fontWeight: "300",
                        fontSize: "18px",
                        color: "#808080",
                      }}
                    >
                      {row.email}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "300",
                        fontSize: "18px",
                        color: "#808080",
                      }}
                    >
                      {row.phone}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Paper>
      <Box
        sx={{ display: "flex", justifyContent: { xs: "center", md: "end" } }}
      >
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
    </Box>
  );
}
