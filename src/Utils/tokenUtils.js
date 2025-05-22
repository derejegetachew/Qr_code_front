export function currentUser() {
  const tokenWithExpiry = JSON.parse(localStorage.getItem("authToken"));
  console.log("Retrieved token with expiry:", tokenWithExpiry);

  if (tokenWithExpiry) {
    const { token } = tokenWithExpiry; // Extract the token

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const decoded = JSON.parse(jsonPayload);
      console.log("Decoded payload:", decoded); // Log the decoded payload

      if (decoded && decoded.user) {
        console.log("User found in token:", decoded.user); // Log the user
        return decoded.user; // Return the user object if found
      } else {
        console.error("No user found in token payload.");
        return null; // Return null if the user is not found
      }
    } catch (error) {
      console.error("Invalid token or failed to decode:", error);
      return null; // Return null if there is any error during decoding
    }
  }

  console.warn("No token found in local storage.");
  return null; // Return null if the token is missing
}
