import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.6),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  position: 'relative',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -8,
    height: '2px',
    width: '24px',
    background: theme.palette.primary.main,
  }
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  marginBottom: theme.spacing(1.5),
  display: 'block',
  fontSize: '0.9rem',
  transition: 'color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(4px)',
  }
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: 8,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  }
}));

const Logo = styled('img')(({ theme }) => ({
  height: '32px',
  marginBottom: theme.spacing(2),
}));

const DisclaimerBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.info.main, 0.04),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'flex-start',
}));

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Pembelajaran',
      links: [
        { name: 'AI Nahwu', href: '/nahwu-chat' },
        { name: 'AI Shorof', href: '#' },
        { name: 'AI Fiqih', href: '#' },
      ]
    },
    {
      title: 'Perusahaan',
      links: [
        { name: 'Tentang Kami', href: '/about' },
        { name: 'Kontak', href: '#' },
        { name: 'Kebijakan Privasi', href: '#' },
      ]
    },
    {
      title: 'Sumber Daya',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Dukungan', href: '#' },
      ]
    }
  ];

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <DisclaimerBox>
          <InfoOutlinedIcon color="info" sx={{ mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle2" color="info.dark" gutterBottom fontWeight={500}>
              Aplikasi Eksperimental
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aplikasi ini masih dalam tahap pengembangan dan disediakan hanya untuk tujuan eksperimental.
              Konten yang dihasilkan AI mungkin tidak sepenuhnya akurat. Silakan berkonsultasi dengan pakar
              ilmu Islam yang berkualifikasi untuk menghindari kesalahpahaman.
            </Typography>
          </Box>
        </DisclaimerBox>

        <Box sx={{ display: { xs: 'block', md: 'flex' }, justifyContent: 'space-between', mb: 5 }}>
          <Box sx={{ mb: { xs: 4, md: 0 }, maxWidth: { xs: '100%', md: '280px' } }}>
            <Box component={motion.div} whileHover={{ scale: 1.02 }} sx={{ display: 'inline-block', mb: 0.5 }}>
              <Logo src="/LogoWithoutBG.png" alt="NgajiDigital Logo" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Pelajari ilmu-ilmu Islam dengan mudah melalui platform berbasis AI kami. Akses pengetahuan kapan saja, di mana saja.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Link href="https://www.facebook.com/hanif.maulana.108" target="_blank" aria-label="Facebook">
                <SocialIconButton size="small">
                  <FacebookRoundedIcon fontSize="small" />
                </SocialIconButton>
              </Link>
              <Link href="https://x.com/isaac_newton252" target="_blank" aria-label="Twitter/X">
                <SocialIconButton size="small">
                  <TwitterIcon fontSize="small" />
                </SocialIconButton>
              </Link>
              <Link href="https://www.instagram.com/hanifmaulana2" target="_blank" aria-label="Instagram">
                <SocialIconButton size="small">
                  <InstagramIcon fontSize="small" />
                </SocialIconButton>
              </Link>
              <Link href="https://www.youtube.com/@isaacnewton7777" target="_blank" aria-label="YouTube">
                <SocialIconButton size="small">
                  <YouTubeIcon fontSize="small" />
                </SocialIconButton>
              </Link>
              <Link href="https://github.com/isaacnewton123" target="_blank" aria-label="GitHub">
                <SocialIconButton size="small">
                  <GitHubIcon fontSize="small" />
                </SocialIconButton>
              </Link>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 4, md: 8 } }}>
            {footerLinks.map((section) => (
              <Box key={section.title}>
                <FooterTitle variant="subtitle2">{section.title}</FooterTitle>
                {section.links.map((link) => (
                  <FooterLink key={link.name} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'left' },
          gap: 1.5,
          pt: 1
        }}>
          <Typography variant="caption" color="text.secondary">
            © {currentYear} NgajiDigital. Seluruh hak cipta dilindungi.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="caption" color="text.secondary" component={Link} href="#" sx={{ textDecoration: 'none' }}>
              Privasi
            </Typography>
            <Typography variant="caption" color="text.secondary" component={Link} href="#" sx={{ textDecoration: 'none' }}>
              Ketentuan
            </Typography>
            <Typography variant="caption" color="text.secondary" component={Link} href="#" sx={{ textDecoration: 'none' }}>
              Cookies
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 