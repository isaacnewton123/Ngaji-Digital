import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  alpha,
  Button,
  Link,
  Avatar,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  position: 'relative',
  background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -8,
    height: '3px',
    width: '40px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    borderRadius: '2px',
  }
}));

const InfoCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.paper, 0.6),
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  marginBottom: theme.spacing(4),
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.03)}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.06)}`,
  },
}));

const ContactButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1, 3),
  fontWeight: 500,
  textTransform: 'none',
  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.25)}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
}));

const About: React.FC = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <PageTitle variant="h3" gutterBottom>
              Tentang NgajiDigital
            </PageTitle>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                mb: 2,
                fontWeight: 400
              }}
            >
              Menyediakan ilmu Islam yang mudah diakses melalui kecerdasan buatan
            </Typography>
            <Box 
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              sx={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%', 
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mt: 3,
                mb: 5,
                boxShadow: (theme) => `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`
              }}
            >
              <Box 
                component="img"
                src="/LogoWithoutBG.png"
                alt="NgajiDigital Logo"
                sx={{ width: '75%', height: 'auto' }}
              />
            </Box>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <InfoCard>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box
                component={motion.div}
                whileHover={{ rotate: 15 }}
                sx={{
                  p: 1,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  mt: 0.5
                }}
              >
                <InfoOutlinedIcon color="primary" />
              </Box>
              <Box>
                <SectionTitle variant="h5">Misi Kami</SectionTitle>
                <Typography variant="body1" paragraph>
                  NgajiDigital bertujuan untuk membuat ilmu Islam lebih mudah diakses oleh semua orang.
                  Dengan memanfaatkan kecerdasan buatan, kami dapat menyediakan akses cepat ke
                  informasi tentang tata bahasa Arab, hukum Islam, dan banyak lagi.
                </Typography>
                <Typography variant="body1">
                  Platform kami dirancang sebagai alat bantu pembelajaran, membantu siswa
                  memahami konsep-konsep kompleks melalui percakapan interaktif dengan AI kami.
                </Typography>
              </Box>
            </Box>
          </InfoCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InfoCard>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box
                component={motion.div}
                whileHover={{ rotate: 15 }}
                sx={{
                  p: 1,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  mt: 0.5
                }}
              >
                <SchoolOutlinedIcon color="primary" />
              </Box>
              <Box>
                <SectionTitle variant="h5">Filosofi Pendidikan</SectionTitle>
                <Typography variant="body1" paragraph>
                  Kami percaya bahwa teknologi dapat meningkatkan metode pembelajaran tradisional, bukan menggantikannya.
                  Alat AI kami dirancang untuk bekerja bersama dengan metode belajar konvensional dan bimbingan
                  dari ulama dan guru yang berkualifikasi.
                </Typography>
                <Typography variant="body1">
                  Meskipun AI kami dapat memberikan penjelasan dan analisis cepat, kami selalu mendorong pengguna
                  untuk memverifikasi informasi dengan sumber terpercaya dan pakar ilmu Islam yang berkualifikasi.
                </Typography>
              </Box>
            </Box>
          </InfoCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Box sx={{ textAlign: 'center', mt: 5, mb: 3 }}>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Hubungi Kami
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 600, mx: 'auto' }}>
              Punya pertanyaan atau saran? Kami senang mendengar dari Anda!
            </Typography>
            <ContactButton
              variant="contained"
              color="primary"
              startIcon={<EmailOutlinedIcon />}
              href="mailto:hanif@isaacnewton.site"
            >
              Kontak Kami
            </ContactButton>
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                Dibuat dengan <FavoriteIcon sx={{ mx: 0.5, fontSize: 16, color: 'error.main' }} /> untuk Umat
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <InfoCard sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box
                component={motion.div}
                whileHover={{ rotate: 15 }}
                sx={{
                  p: 1,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  mt: 0.5
                }}
              >
                <PersonIcon color="primary" />
              </Box>
              <Box sx={{ width: '100%' }}>
                <SectionTitle variant="h5">Pengembang</SectionTitle>
                <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: 3, alignItems: {xs: 'flex-start', md: 'center'}, mt: 2 }}>
                  <Avatar
                    src="https://github.com/isaacnewton123.png"
                    alt="Developer"
                    sx={{ 
                      width: 80, 
                      height: 80,
                      border: (theme) => `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
                    }}
                  />
                  <Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Isaac Newton
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Developer & Maintainer NgajiDigital. Mencintai pendidikan Islam dan teknologi.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        component={Link}
                        href="https://www.facebook.com/hanif.maulana.108" 
                        target="_blank"
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': { color: '#1877F2' }
                        }}
                      >
                        <FacebookRoundedIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        component={Link}
                        href="https://x.com/isaac_newton252" 
                        target="_blank"
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': { color: '#1DA1F2' }
                        }}
                      >
                        <TwitterIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        component={Link}
                        href="https://www.instagram.com/hanifmaulana2" 
                        target="_blank"
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': { color: '#E1306C' }
                        }}
                      >
                        <InstagramIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        component={Link}
                        href="https://www.youtube.com/@isaacnewton7777" 
                        target="_blank"
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': { color: '#FF0000' }
                        }}
                      >
                        <YouTubeIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        component={Link}
                        href="https://github.com/isaacnewton123" 
                        target="_blank"
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': { color: '#333' }
                        }}
                      >
                        <GitHubIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </InfoCard>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 