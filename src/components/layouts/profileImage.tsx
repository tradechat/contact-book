import React, { useState } from "react";
import Image from "next/image";
import axiosInstance from "@/services/axiosInstance";
import { Box } from "@mui/material";

interface ProfileImageProps {
  url: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ url }) => {
  const [image, setImage] = useState<string | null>(null);

  const fetchImage = async () => {
    try {
      if (!url) throw new Error("URL is null or undefined");

      const updatedPath = url.replace("/api", "");
      const response = await axiosInstance.get(`${updatedPath}`, {
        responseType: "blob",
      });

      const imageURL = URL.createObjectURL(response.data);
      setImage(imageURL);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  if (!image) {
    fetchImage();
  }

  return (
    <>
      {image ? (
        <Box width="100%" height="100%" sx={{ position: "relative" }}>
          <Image
            src={image}
            alt="profile"
            className="rounded-full"
            fill
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </Box>
      ) : (
        <Box
          width="100%"
          height="100%"
          sx={{ position: "relative", background: "#eee", borderRadius: "50%" }}
        ></Box>
      )}
    </>
  );
};

export default ProfileImage;
