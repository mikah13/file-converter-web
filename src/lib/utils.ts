import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UploadFile, Mode } from "./types";
import { FileWithPath } from "react-dropzone";

const API_ENDPOINT = `${process.env.BACKEND_API}`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert bytes to human readable format.
 * @param bytes
 * @param decimals
 * @returns
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * for longer file that exceed 25 characters
 * @param filename
 * @returns
 */
export function formatFileName(filename: string) {
  if (filename.length >= 25) {
    return (
      filename.substring(0, 15) +
      "..." +
      filename.substring(filename.length - 10, filename.length)
    );
  }
  return filename;
}

/**
 * get file extension from filename
 * @param filename
 * @returns
 */
export function getFileExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase();
}

/**
 *
 * @param bin
 * @param filename
 * @param format
 */
export function downloadFromBin(
  bin: string | null | undefined,
  filename: string,
  format: string = "png",
) {
  if (!bin) return;
  const lastDotIndex = filename.lastIndexOf(".");

  let fn = filename.substring(0, lastDotIndex);
  const downloadLink = document.createElement("a");
  downloadLink.href = bin;
  downloadLink.download = `${fn}.${format}`;
  downloadLink.click();
  URL.revokeObjectURL(bin);
}

/**
 * Check if the files are being converted
 * @param files
 * @returns
 */
export function isProcessing(files: UploadFile[]) {
  return files.filter((file) => file.status === "Processing").length > 0;
}

export function copyToClipboard(text: string) {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

export function handleOnDrop(
  acceptedFiles: FileWithPath[],
  callback: Function,
) {
  return acceptedFiles
    .filter((e) => e.type.indexOf("image") !== -1)
    .map((e: FileWithPath) => ({
      file: e,
      status: "Uploaded",
      format: getFileExtension(e.name),
      convertedBin: null,
      quality: 95,
    }))
    .map((e) => {
      callback(e);
    });
}
export async function sendFileRequest(uploadFile: UploadFile, mode: string) {
  const { file, status, format, quality } = uploadFile;

  const addNewFile = await fetch("/api/files", {
    method: "POST",
    body: JSON.stringify({ filesize: file.size }),
  });

  if (mode === Mode.Converter) {
    let res = await handleConvert(uploadFile);
    return res;
  }

  if (mode === Mode.Compressor) {
    let res = await handleCompress(uploadFile);
    return res;
  }

  let res = await handleConvert(uploadFile);
  return res;
}

/**
 * handle Conversion route fetch
 * @param uploadFile
 * @returns
 */
export async function handleConvert(uploadFile: UploadFile) {
  const { file, status, format, quality } = uploadFile;
  const form = new FormData();
  form.set("file", file);
  const res = await fetch(
    `${API_ENDPOINT}/convert?format=${format}&quality=${quality}`,
    {
      method: "POST",
      body: form,
    },
  );

  return res;
}

/**
 * Handle Compression route fetch
 * @param uploadFile
 * @returns
 */
export async function handleCompress(uploadFile: UploadFile) {
  const { file, status, format, quality } = uploadFile;

  const form = new FormData();
  form.set("file", file);
  const res = await fetch(
    `${API_ENDPOINT}/compress?format=${format}&quality=${quality}`,
    {
      method: "POST",
      body: form,
    },
  );
  return res;
}
