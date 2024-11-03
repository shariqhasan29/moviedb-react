import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, styled } from "@mui/material";

interface NavbarProps {
  username: string;
}

const StyledButton = styled(Button)({
  width: "100%",
});

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleWatchlist = () => {
    navigate("/watchlist"); // Navigate to watchlist page
  };
  const handleHome = () => {
    navigate("/home"); // Navigate to home page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        backgroundColor: "#002244",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h1 style={{ color: "#fff" }}>
        Welcome,{" "}
        {username
          ? username.charAt(0).toUpperCase() + username.slice(1)
          : "Admin"}
        !
      </h1>
      <div style={{ display: "flex", gap: "30px" }}>
        {location.pathname === "/watchlist" ? (
          <StyledButton
            onClick={handleHome}
            variant="contained"
            color="inherit"
          >
            Home
          </StyledButton>
        ) : (
          <StyledButton
            onClick={handleWatchlist}
            variant="contained"
            color="inherit"
          >
            Watchlist
          </StyledButton>
        )}
        <StyledButton
          onClick={handleLogout}
          variant="contained"
          color="warning"
        >
          Logout
        </StyledButton>
      </div>
    </div>
  );
};

export default Navbar;
