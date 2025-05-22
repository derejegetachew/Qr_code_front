import { currentUser } from "./tokenUtils";
export const BASE_URL = "http://localhost:8089/api";
export function isAllowedBarances() {
  const user = currentUser();
  const allowedbranhes = ["473"];
  const userBranch = user?.branch_id;
  const exists = allowedbranhes.includes(userBranch);
  console.log(exists);
  return exists;
}
