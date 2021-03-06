import { access, constants, mkdir } from "fs";
import { readdir } from "fs/promises";
import { logger } from "../../util/logger";

export const CheckUploadDirExist = (path: string, pid: string) => {
  path = `${path}/${pid}`;
  access(path, constants.F_OK, (err) => {
    if (err) {
      mkdir(path, { recursive: true }, (err2) => {
        if (err2) {
          logger(`Failed creating /tmp/${pid}`, "error");
        } else {
          logger(`Created tmp/${pid} folder`);
        }
      });
    } else {
      logger(`tmp/${pid} folder already exists`);
    }
  });
};

export const CheckFileExist = async (path: string) => {
  return new Promise((resolve, reject) => {
    access(path, constants.R_OK, (err) => {
      if (err) {
        logger(`Unreadable file ${path}`, "error");
        reject(err);
      } else {
        logger(`${path} is readable`);
        resolve(true);
      }
    });
  });
};

export const ReadDirectory = async (path: string) => {
  const files = await readdir(path);
  return files;
};
