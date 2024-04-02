import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { mainNavBarItems } from './consts/navbarItems';
import { ShoppingCart } from '@mui/icons-material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { StyledAppBar, StyledButtonImage, StyledDivGrow, StyledDivButton } from './styles';

const pages = mainNavBarItems;

function ResponsiveAppBar() {
  const navigate = useNavigate();
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? true : false;
  };  

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledButtonImage component={Link} to="/">
            <img
              alt="Home"
              src="/logo-pulsit7.png"
              width="110"
              height="30"
              className={"d-inline-block align-top"}
            />
          </StyledButtonImage>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((item, index) => (
                <MenuItem key={item.id} onClick={() => {
                  navigate(item.route);
                  handleCloseNavMenu();
                }}>
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((item, index) => (
              <Button
                key={item.id}
                onClick={() => navigate(item.route)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <StyledDivGrow />          
          <StyledDivButton>
            {isAuthenticated() ? (
              <IconButton
                aria-label="Profile"
                color="inherit"
                component={Link}
                to="/profile"
              >
                <PersonPinIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="Authenticate"
                color="inherit"
                component={Link}
                to="/signIn"
              >
                <PersonPinIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="Show cart items"
              color="inherit"
              component={Link}
              to="/cart"
            >
              <ShoppingCart />
            </IconButton>
          </StyledDivButton>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default ResponsiveAppBar;
