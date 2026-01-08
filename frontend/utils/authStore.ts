// lib/token.ts
let accessToken: string | null = null;

export const getToken = () => {
  console.log("[getToken] accessToken:", accessToken);
  return accessToken;
};

export const setToken = (token: string) => {
  console.log("[setToken] NEW accessToken:", token);

  if (accessToken && accessToken !== token) {
    console.log("[setToken] accessToken CHANGED");
    console.log("OLD:", accessToken);
    console.log("NEW:", token);
  }

  accessToken = token;
};

export const clearToken = () => {
  console.log("[clearToken] accessToken cleared");
  accessToken = null;
};
