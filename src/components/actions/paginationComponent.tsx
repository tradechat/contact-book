// PaginationComponent.tsx

import React from "react";
import { Box, Pagination, PaginationItem } from "@mui/material";

interface PaginationComponentProps {
  pageCount: number;
  page?: number;
  setPage: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pageCount,
  setPage,
  page,
}) => {
  return (
    <Pagination
      siblingCount={-1}
      count={pageCount}
      page={page}
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
              padding: { xs: "14px", sm: "19px" },
              color: "#4E73DF",
              minWidth: "52px",
              height: "47px",
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
  );
};

export default PaginationComponent;
