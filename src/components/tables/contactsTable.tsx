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
import Image from "next/image";
import { useRouter } from "next/router";
import { Contact, HeadCell } from "@/models/contact";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { Button, Typography } from "@mui/material";
import PaginationComponent from "../actions/paginationComponent";
import ContactsTableActionsBox from "../actions/contactsTableActions";
import { LightTooltip } from "../actions/copyToolTip";
import ConatactCard from "../layouts/contactCard";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletContacts,
  favoriteContact,
  getContacts,
} from "@/services/apiService";
import { headCells } from "@/models/contact";
// import ProfileImage from "../profileImage";
import { useUser } from "@/userContext";
import { UserType } from "@/models/userType";

export default function ContactsTable() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [isActionSend, setIsActionSend] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const columStyle = { fontSize: "19px", fontWeight: "400" };
  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { query } = router;
  const { userType } = useUser();
  const rowsPerPage = 6;
  const isOwner = userType === UserType.ADMIN || userType === UserType.OWNER;
  const {
    isLoading,
    error,
    data: rows,
  } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: getContacts,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    mutationFn: () => deletContacts(selected),
    mutationKey: ["contacts"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setSearchTerm("");
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: (id: number) => favoriteContact(id),
    mutationKey: ["contacts"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  useEffect(() => {
    if (query.action === "export") {
      setIsActionSend(true);
    } else {
      setIsActionSend(false);
    }

    if (query.page) {
      const pageNumber = parseInt(query.page as string, 10) - 1;
      setPage(pageNumber >= 0 ? pageNumber : 0);
    }
    if (rows) {
      const calculatedPageCount = Math.ceil(rows.length / rowsPerPage);
      setPageCount(calculatedPageCount);
    }
  }, [query, rows]);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreateNew = () => {
    router.push("/contacts/add");
  };

  const handleViewContact = (id: number) => {
    router.push(`/contacts/view/${id}`);
  };

  const handleSendEmail = () => {
    if (selected.length != 0) {
      const email =
        rows?.find((item) => item.id === selected[0])?.email || null;
      router.push(`/contacts/send-email?email=${encodeURIComponent(email!)}`);
    }
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows!.map((contact: Contact) => contact.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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
      <ContactsTableActionsBox
        isActionSend={isActionSend}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleCreateNew={handleCreateNew}
        handleOpenMenu={handleOpenMenu}
        handleCloseMenu={handleCloseMenu}
        deletePendding={mutation.isPending}
        disabledDelete={selected.length == 0}
        disabledSendEmail={selected.length == 0}
        setSearchTerm={(value) => {
          setSearchTerm(value);
        }}
        sendEmail={handleSendEmail}
        onDelete={() => {
          if (selected.length !== 0) {
            mutation.mutate();
          }
        }}
      />
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
                {headCells.map((headCell: HeadCell) => {
                  if (headCell.id === "isFavorite" && !isOwner) {
                    return null;
                  }
                  return (
                    <TableCell
                      key={headCell.id}
                      align={headCell.align ?? "left"}
                      padding="normal"
                    >
                      {headCell.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& td, & th": { borderBottom: "solid 2px #DDE1E6" },
              }}
            >
              {visibleRows!.map((row: Contact, index: number) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "& td:first-of-type, & th:first-of-type": {
                        pl: "25px",
                      },
                      cursor: "pointer",
                      "& td": {
                        fontSize: "19px",
                        py: "10px",
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
                          onClick={() => handleClick(row.id)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    )}

                    <TableCell align="left">
                      <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                        {row.id}
                      </Typography>
                    </TableCell>
                    {isOwner && (
                      <TableCell align="center">
                        <Button
                          onClick={() => {
                            favoriteMutation.mutate(row.id);
                          }}
                        >
                          <Image
                            width="28"
                            height="28"
                            src={
                              row.isFavorite
                                ? "/images/star-active.png"
                                : "/images/star.png"
                            }
                            alt=""
                          />
                        </Button>
                      </TableCell>
                    )}

                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            width: "58px",
                            height: "58px",
                          }}
                        >
                          <Image
                            src="/images/user.png"
                            alt="profile"
                            className="rounded-full"
                            layout="fill"
                            style={{ borderRadius: "50%" }}
                            objectFit="cover"
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    {/* <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            width: "58px",
                            height: "58px",
                          }}
                        >
                          {row.imageUrl ? (
                            <ProfileImage url={row.imageUrl} />
                          ) : (
                            <Image
                              src="/images/user.png"
                              alt="profile"
                              className="rounded-full"
                              layout="fill"
                              style={{ borderRadius: "50%" }}
                              objectFit="cover"
                            />
                          )}
                        </Box>
                      </Box>
                    </TableCell> */}
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
                        <Typography noWrap sx={{ ...columStyle, mr: "7px" }}>
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
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "400",
                          background: "#4E73DF",
                        }}
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
          {visibleRows!.map((row: Contact, index: number) => {
            const isItemSelected = selected.includes(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <ConatactCard
                contact={row}
                isItemSelected={isItemSelected}
                handleClick={handleClick}
                labelId={labelId}
                key={row.id}
                handleViewContact={(id) => {
                  handleViewContact(id);
                }}
                handleFavouriteClick={(id) => {
                  favoriteMutation.mutate(id);
                }}
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
            router.push(`/contacts/?page=${value + 1}`);
          }}
          page={page + 1}
        />
      </Box>
    </Box>
  );
}
