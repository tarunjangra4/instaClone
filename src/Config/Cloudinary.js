export const uploadToCloudinary = async (image) => {
  if (image) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dfpbgqv66");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfpbgqv66/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData?.url?.toString();
  }
};
