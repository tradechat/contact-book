import { Contact } from "@/models/contact";
import axiosInstance from "./axiosInstance";
import { Company } from "@/models/company";
import { User } from "@/models/user";

// Users
export const getCurrentUser = async () => {
  const response = await axiosInstance.get(`/Users/current-user`);
  return response.data;
};

// Contacts
export const getContacts = async (): Promise<Contact[]> => {
  const response = await axiosInstance.get(`/contacts`);
  return response.data;
};

export const getContact = async (id: any): Promise<Contact> => {
  const response = await axiosInstance.get(`/contacts/${id}`);
  console.log(response.data);
  return response.data;
};

export const createContact = async (data: any): Promise<Contact> => {
  return axiosInstance.post("/contacts", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateContact = async (data: any): Promise<Contact> => {
  return axiosInstance.put(`/contacts/${data.id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const favoriteContact = async (id: number): Promise<Contact> => {
  return axiosInstance.patch(`/contacts/toggle-favorite/${id}`);
};

export const deletContacts = async (data: any) => {
  return axiosInstance.delete(`/contacts`, { data: data });
};
export const sendEmail = async (data: any): Promise<Contact> => {
  return axiosInstance.post("/contacts/send-email", data);
};

// Authentication
export const login = async (data: any) => {
  return axiosInstance.post(`/login`, data);
};

export const register = async (data: any) => {
  return axiosInstance.post(`/register`, data);
};

export const resetPassword = async (data: any) => {
  return axiosInstance.post(`/forgot-password`, data);
};

export const setPassword = async (data: any, id: any, code: any) => {
  return axiosInstance.post(`/reset-password?id=${id}&code=${code}`, data);
};

// Activities

export const getActivities = async () => {
  const response = await axiosInstance.get(`/logs`);
  return response.data;
};

// Companies

export const getCompany = async (): Promise<Company> => {
  const response = await axiosInstance.get(`/companies`);
  return response.data;
};

export const updateCompany = async (data: any): Promise<Company> => {
  const response = await axiosInstance.put(`/companies`, data);
  return response.data;
};

// Users

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: any): Promise<User> => {
  return axiosInstance.post("/users", data);
};

export const updateUser = async (data: any): Promise<User> => {
  return axiosInstance.put(`/users/${data.id}`, data);
};
