/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MYSQL_HOST: "127.0.0.1",
    MYSQL_PORT: "3307",
    MYSQL_DATABASE: "timetable",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "",
    GOOGLE_CLIENT_ID:
      "1093208213236-ldio7lodslr51od6iq0ddt1d92t5feuk.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXTAUTH_SECRET: "03a8473fcb07d87e6cad283a452c90ab",
  },
  transpilePackages: ["material-react-table", "@mui/material"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
