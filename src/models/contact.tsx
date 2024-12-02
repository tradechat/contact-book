export interface Contact {
  id: number;
  isFavorite?: boolean;
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  emailTwo?: string;
  phoneNumber: string;
  mobileNumber?: string;
  address?: string;
  addressTwo?: string;
  status?: string;
  action?: string;
  imageUploadFile?: File | string;
}

export function createContact(
  id: number,
  isFavorite: boolean,
  imageUrl: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  status: string,
  action: string
): Contact {
  return {
    id,
    email,
    firstName,
    lastName,
    phoneNumber,
    status,
    action,
    isFavorite,
    imageUrl,
  };
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Contact;
  label: string;
  numeric: boolean;
  align?: "left" | "center" | "right" | "inherit" | "justify";
}

export const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "isFavorite",
    numeric: false,
    disablePadding: true,
    label: "Favorite",
    align: "center",
  },
  {
    id: "imageUrl",
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
    id: "phoneNumber",
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
