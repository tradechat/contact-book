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
  imageUploadFile?: any;
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

export const rows = [
  createContact(
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
  createContact(
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
  createContact(
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
  createContact(
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
  createContact(
    5,
    true,
    "image5.png",
    "Mason",
    "Martinez",
    "martinez@example.com",
    "+49 321 654 987",
    "Active",
    "view"
  ),
  createContact(
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
