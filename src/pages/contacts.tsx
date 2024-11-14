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
import Image from "next/image";
import { Button } from "@mui/material";
interface Data {
  id: number;
  favorite: boolean;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  action: string;
}

function createData(
  id: number,
  favorite: boolean,
  image: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  status: string,
  action: string
): Data {
  return {
    id,
    email,
    firstName,
    lastName,
    phone,
    status,
    action,
    favorite,
    image,
  };
}

const rows = [
  createData(
    1,
    true,
    "image1.png",
    "Ricardo",
    "Jones",
    "ricardo.jones@example.com",
    "+49 123 456 789",
    "Active",
    "view"
  ),
  createData(
    2,
    false,
    "image2.png",
    "Sophia",
    "Smith",
    "sophia.smith@example.com",
    "+49 987 654 321",
    "Inactive",
    "edit"
  ),
  createData(
    3,
    true,
    "image3.png",
    "Liam",
    "Brown",
    "liam.brown@example.com",
    "+49 456 789 123",
    "Active",
    "view"
  ),
  createData(
    4,
    false,
    "image4.png",
    "Olivia",
    "Garcia",
    "olivia.garcia@example.com",
    "+49 654 321 987",
    "Active",
    "delete"
  ),
  createData(
    5,
    true,
    "image5.png",
    "Mason",
    "Martinez",
    "mason.martinez@example.com",
    "+49 321 654 987",
    "Active",
    "view"
  ),
  createData(
    6,
    false,
    "image6.png",
    "Emma",
    "Davis",
    "emma.davis@example.com",
    "+49 789 123 456",
    "Inactive",
    "edit"
  ),
];

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  align?: "left" | "center" | "right" | "inherit" | "justify";
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "favorite",
    numeric: false,
    disablePadding: true,
    label: "Favorite",
    align: "center",
  },
  {
    id: "image",
    numeric: true,
    disablePadding: true,
    label: "Image",
    align: "center",
  },
  {
    id: "firstName",
    numeric: true,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: true,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: true,
    label: "Email",
    align: "center",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: true,
    label: "Phone",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: true,
    label: "Status",
    align: "center",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: true,
    label: "Action",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead
      sx={{
        "&.MuiTableHead-root	": {
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
        {headCells.map((headCell) => (
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

export default function Contacts() {
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    console.log(id);

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paths path="Home / Contacts"></Paths>
      <Paper sx={{ width: "100%", mb: 2, mt: "18px" }} variant="outlined">
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
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

                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="center">
                      {row.favorite ? (
                        <StarBorderIcon />
                      ) : (
                        <StarIcon sx={{ color: "#FC0" }} />
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          width="58"
                          height="58"
                          src="/images/Person.png"
                          alt=""
                        ></Image>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.firstName}</TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          width: "90px",
                          background:
                            row.status == "Active" ? "#D4EDDA" : "#E7E8EA",
                          border: `solid 1px ${
                            row.status == "Active" ? "#C3E6CB" : "#DDDFE2"
                          }`,
                          color: row.status == "Active" ? "#155724" : "#6C757D",
                          borderRadius: "5px",
                          padding: "4px 0",
                          fontSize: "16px",
                          margin: "auto",
                        }}
                      >
                        {row.status}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <Button
                        sx={{ textTransform: "capitalize", fontWeight: "4 00" }}
                        variant="contained"
                      >
                        {" "}
                        View
                      </Button>{" "}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
