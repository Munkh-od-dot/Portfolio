// src/lib/clientUploader.ts  (client-д зориулав, CLOUDINARY SDK БИШ!)
const UPLOAD_PRESET = "portfolio"; // Cloudinary дээрх unsigned preset
const CLOUD_NAME = "dnc2qqw7z";

export type CloudinaryUploadResult = {
  secure_url?: string;
  error?: { message?: string };
  [k: string]: any;
};

export const uploadImage = async (file: File | null) => {
  if (!file) return null;

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);
  form.append("folder", "portfolio/certificates");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: form,
    }
  );

  const data: CloudinaryUploadResult = await res.json();
  if (!res.ok || !data.secure_url) {
    console.error("Cloudinary upload failed:", data);
    return null;
  }
  return data.secure_url;
};
