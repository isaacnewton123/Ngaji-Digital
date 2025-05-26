import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useScrollTrigger,
  Slide,
  alpha,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { motion } from 'framer-motion';

// Navigation item interface
interface NavItem {
  label: string;
  path: string;
}

// Header props interface
interface HeaderProps {
  navItems?: NavItem[];
}

// Hide app bar on scroll down
interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(8px)',
  boxShadow: 'none',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
}));

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1.5),
  fontWeight: 500,
  fontSize: '0.95rem',
  position: 'relative',
  letterSpacing: '0.3px',
  padding: theme.spacing(0.5, 0),
  minWidth: 'auto',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: -2,
    left: 0,
    background: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  },
}));

const NavActiveButton = styled(NavButton)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  '&::after': {
    width: '100%',
  },
}));

const MenuDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '280px',
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

const DevChip = styled(Chip)(({ theme }) => ({
  background: alpha(theme.palette.warning.main, 0.12),
  color: theme.palette.warning.dark,
  fontWeight: 500,
  fontSize: '0.7rem',
  height: 24,
  border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    top: 12,
    right: 60,
  }
}));

const Logo = styled('img')(({ theme }) => ({
  height: '36px',
  transition: 'transform 0.2s ease',
  [theme.breakpoints.down('sm')]: {
    height: '28px',
  }
}));

const Header: React.FC<HeaderProps> = ({ navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
] }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box component={motion.div} whileHover={{ scale: 1.02 }}>
          <Logo src="/LogoWithoutBG.png" alt="NgajiDigital Logo" />
        </Box>
        <IconButton edge="end" onClick={handleDrawerToggle} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ px: 2, py: 1.5, bgcolor: alpha(theme.palette.warning.main, 0.08), mx: 2, borderRadius: 1, mb: 2 }}>
        <Typography variant="caption" color="warning.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <WarningAmberRoundedIcon fontSize="small" sx={{ fontSize: 16 }} />
          Experimental stage - Consult with experts
        </Typography>
      </Box>
      <List sx={{ px: 1, flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.label}
            onClick={() => handleNavigation(item.path)}
            disablePadding
            sx={{ 
              mb: 0.5,
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <Button
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                py: 1.2,
                px: 2,
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                bgcolor: isActive(item.path) ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                fontWeight: isActive(item.path) ? 600 : 400,
                '&:hover': {
                  bgcolor: isActive(item.path) 
                    ? alpha(theme.palette.primary.main, 0.12) 
                    : alpha(theme.palette.action.hover, 0.1)
                }
              }}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <StyledAppBar 
          position="fixed" 
          color="transparent" 
          elevation={0}
          sx={{ 
            py: scrolled ? 0.8 : 1.2,
            transition: 'padding 0.3s ease',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <Box 
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/')}
              >
                <Logo src="/LogoWithoutBG.png" alt="NgajiDigital Logo" />
              </Box>

              {!isMobile && (
                <DevChip 
                  label="EXPERIMENTAL" 
                  size="small" 
                  icon={<WarningAmberRoundedIcon style={{ fontSize: 14 }} />} 
                />
              )}

              {/* Mobile view */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  size="small"
                >
                  <MenuRoundedIcon />
                </IconButton>
              )}

              {/* Desktop view */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {navItems.map((item) => (
                    isActive(item.path) ? (
                      <NavActiveButton
                        key={item.label}
                        disableRipple
                        onClick={() => navigate(item.path)}
                      >
                        {item.label}
                      </NavActiveButton>
                    ) : (
                      <NavButton
                        key={item.label}
                        disableRipple
                        onClick={() => navigate(item.path)}
                      >
                        {item.label}
                      </NavButton>
                    )
                  ))}
                </Box>
              )}
            </Toolbar>
          </Container>
        </StyledAppBar>
      </HideOnScroll>
      
      {/* Mobile drawer */}
      <MenuDrawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </MenuDrawer>

      {/* Toolbar placeholder to push content below the fixed AppBar */}
      <Toolbar 
        sx={{ 
          height: { xs: '60px', md: scrolled ? '70px' : '80px' },
          transition: 'height 0.3s ease',
        }} 
      />
    </>
  );
};

export default Header; 