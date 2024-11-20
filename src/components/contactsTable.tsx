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
import { useRouter } from "next/router";
import { Contact, HeadCell } from "@/models/contact";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Fade,
  FormControl,
  Menu,
  MenuItem,
  OutlinedInput,
  Pagination,
  PaginationItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function ContactsTable({ rows, headCells }: TableProps) {
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const pageCount = Math.ceil(rows!.length / 6);
  const [isActionSend, setIsActionSend] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const columStyle = { fontSize: "20px", fontWeight: "400" };
  const router = useRouter();
  const { query } = router;

  React.useEffect(() => {
    if (query.action === "export") {
      setIsActionSend(true);
    } else {
      setIsActionSend(false);
    }
    console.log(isActionSend);
  }, [query]);

  const buttonSize = {
    textTransform: "capitalize",
    fontWeight: "300",
    fontSize: "16px",
    " &.MuiButtonBase-root": { height: "40px" },
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreateNew = () => {
    router.push("/contacts/contact/?mode=add");
  };

  const handleViewContact = (id: number) => {
    router.push(`/contacts/contact/?mode=view&id=${id}`);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((contact: Contact) => contact.id);
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
            maxWidth: { xs: "100%", md: "300px", lg: "400px" },
            background: "#fff",
          }}
        >
          <OutlinedInput placeholder="Search" />
        </FormControl>
        {!isActionSend && (
          <Box
            sx={{
              marginBottom: { xs: "20px", md: "0px" },
              display: "flex",
              justifyContent: { xs: "space-between", md: "end" },
              flexWrap: { xs: "wrap-reverse", md: "nowrap" },
              width: "100%",
              gap: { md: "9px", lg: "25px" },
              rowGap: "12px",
            }}
          >
            <Button
              sx={{
                ...buttonSize,
                background: "#DC3545",
                width: { xs: "48%", md: "83px" },
              }}
              variant="contained"
              disableElevation
            >
              Delete
            </Button>
            <Box sx={{ width: { xs: "48%", md: "120px", lg: "142px" } }}>
              <Button
                fullWidth
                sx={{
                  ...buttonSize,
                  background: "#4E73DF",
                }}
                variant="contained"
                disableElevation
                onClick={handleOpenMenu}
              >
                Export to
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                elevation={0}
                onClose={handleCloseMenu}
                sx={{
                  boxShadow: "none",
                  "& .MuiPaper-root": {
                    width: "200px",
                    border: "solid 1px #E0E0E0",
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleCloseMenu}>PDF File</MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <Link
                    href="/contacts?action=export"
                    style={{ textDecoration: "none", color: "#212529" }}
                  >
                    Send via Email
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <Button
              sx={{
                ...buttonSize,
                width: {
                  xs: "50%",
                  md: "120px",
                  lg: "142px",
                },
                background: "#4E73DF",
                display: { xs: "none", md: "block", lg: "block" },
              }}
              variant="contained"
              disableElevation
            >
              Send Email
            </Button>

            <Button
              sx={{
                ...buttonSize,
                width: { xs: "100%", md: "150px", lg: "200px" },
                background: { xs: "#4E73DF", md: "#28A745" },
              }}
              variant="contained"
              disableElevation
              onClick={handleCreateNew}
            >
              Create New
            </Button>
          </Box>
        )}
        {isActionSend && (
          <Fade in={isActionSend}>
            <Box
              sx={{
                display: "flex",
                gap: { xs: "10px", md: "25px" },
                justifyContent: "end",
                marginBottom: { xs: "20px", md: "0px" },
                width: "100%",
                flexWrap: { xs: "wrap", md: "nowrap" },
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
                <OutlinedInput placeholder="name@example.com" />
              </FormControl>
              <Button
                sx={{ ...buttonSize, width: { xs: "100%", md: "142px" } }}
                variant="contained"
                disableElevation
              >
                Send
              </Button>
            </Box>
          </Fade>
        )}
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
              {visibleRows.map((row: Contact, index: number) => {
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
                        padding: "10px",
                      },
                      "& td:nth-child(8)": {
                        pl: "40px",
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
                    </TableCell>
                    <TableCell align="center">
                      {row.favorite ? (
                        <StarBorderRoundedIcon sx={{ fontSize: "36px" }} />
                      ) : (
                        <StarRateRoundedIcon
                          sx={{ color: "#4E73DF", fontSize: "36px" }}
                        />
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
                    <TableCell
                      align="center"
                      sx={{ ...columStyle, width: "300px", pl: "20px" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
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
                      <Button
                        sx={{ textTransform: "capitalize", fontWeight: "400" }}
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          handleViewContact(row.id);
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
          {visibleRows.map((row: Contact, index: number) => {
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
                      position: "absolute",
                      width: "90%",
                      left: 0,
                      right: 0,
                      m: "auto",
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
                    <Box
                      sx={{
                        width: "70px",
                        background:
                          row.status == "Active" ? "#D4EDDA" : "#E7E8EA",
                        border: `solid 1px ${
                          row.status == "Active" ? "#C3E6CB" : "#DDDFE2"
                        }`,
                        color: row.status == "Active" ? "#155724" : "#6C757D",
                        borderRadius: "5px",
                        padding: "4px 0",
                        fontSize: "13px",
                        textAlign: "center",
                      }}
                    >
                      {row.status}
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        width="80"
                        height="80"
                        src="/images/Person.png"
                        alt=""
                      ></Image>
                    </Box>
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
                previous: () => <Box sx={{ color: "#6C757D" }}>Previous</Box>,
                next: () => <Box sx={{ color: "#4E73DF" }}>Next</Box>,
              }}
              sx={{
                "&.MuiButtonBase-root": {
                  borderRadius: 0,
                  border: "solid 1px #DEE2E6",
                  margin: 0,
                  fontSize: { xs: "16px", sm: "20px" },
                  padding: { xs: "14px", sm: "20px" },
                  color: "#4E73DF",
                  "&.Mui-selected": { color: "#fff" },
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

interface TableProps {
  rows: Contact[];
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
            padding: "10px",
          },
          "& th:nth-child(8)": {
            pl: "40px",
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
        {props.headCells.map((headCell: HeadCell) => (
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
