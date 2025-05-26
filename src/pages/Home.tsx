import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  alpha,
  Chip,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

// Styled components
const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.05)}`,
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2.5),
  '& svg': {
    fontSize: 56,
    color: theme.palette.primary.main,
    filter: `drop-shadow(0 4px 8px ${alpha(theme.palette.primary.main, 0.25)})`,
  },
}));

const FeatureIconCircle = styled(Box)(({ theme }) => ({
  width: 90,
  height: 90,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
  margin: '0 auto',
  transition: 'all 0.3s ease',
  marginBottom: theme.spacing(3),
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
  }
}));

const ActionButton = styled(Button)(({ theme, disabled }) => ({
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 20px',
  borderRadius: theme.spacing(2),
  boxShadow: disabled ? 'none' : `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
  transition: 'all 0.3s ease',
  fontSize: '0.95rem',
  letterSpacing: '0.5px',
  '&:hover': {
    transform: disabled ? 'none' : 'translateY(-3px)',
    boxShadow: disabled ? 'none' : `0 12px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
  ...(disabled && {
    backgroundColor: alpha(theme.palette.action.disabled, 0.12),
    color: theme.palette.action.disabled,
  }),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0, 10),
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.08)} 1px, transparent 1px)`,
  backgroundSize: '30px 30px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(8, 0, 6),
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  }
}));

const LogoWithBg = styled('div')(({ theme }) => ({
  width: 160,
  height: 160,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  padding: theme.spacing(2),
  boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.2)}`,
  '& img': {
    width: '85%',
    height: 'auto',
    filter: 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))',
  },
  [theme.breakpoints.down('sm')]: {
    width: 120,
    height: 120,
  }
}));

const InfoSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(6),
  padding: theme.spacing(5, 5, 5, 6),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.info.main, 0.04),
  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
  boxShadow: `0 10px 30px ${alpha(theme.palette.info.main, 0.06)}`,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 3, 4, 4),
    marginTop: theme.spacing(6),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '5px',
    height: '100%',
    background: `linear-gradient(to bottom, ${theme.palette.info.main}, ${alpha(theme.palette.info.main, 0.3)})`,
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  marginBottom: theme.spacing(1),
  fontWeight: 700,
  background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: 0,
    width: 60,
    height: 4,
    borderRadius: '2px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.3)})`,
  }
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  borderRadius: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const AvailableChip = styled(StatusChip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.success.main, 0.1),
  color: theme.palette.success.dark,
  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
}));

const ComingSoonChip = styled(StatusChip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[500], 0.1),
  color: theme.palette.text.secondary,
  border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
}));

const BenefitItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  '& svg': {
    color: theme.palette.success.main,
    marginRight: theme.spacing(1.5),
    marginTop: '2px',
  }
}));

const FeatureContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(4),
  }
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  width: 'calc(33.333% - 32px)',
  [theme.breakpoints.down('md')]: {
    width: 'calc(50% - 24px)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  }
}));

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Features data
  const features = [
    {
      id: 'nahwu',
      title: 'AI Nahwu',
      icon: <SchoolRoundedIcon />,
      description: 'Pelajari tata bahasa Arab dengan analisis dan penjelasan AI. Dapatkan umpan balik instan tentang kalimat dan aturan tata bahasa.',
      available: true,
      path: '/nahwu-chat',
      benefits: [
        'Analisis gramatikal instan untuk kalimat bahasa Arab',
        'Penjelasan jelas tentang aturan dan konsep tata bahasa',
        'Latihan dengan contoh terpandu dan koreksi'
      ]
    },
    {
      id: 'shorof',
      title: 'AI Shorof',
      icon: <DescriptionRoundedIcon />,
      description: 'Segera hadir! Kuasai morfologi bahasa Arab dengan bantuan AI untuk bentuk kata, akar kata, dan derivasi.',
      available: false,
      path: '/shorof',
      benefits: [
        'Jelajahi akar kata dan derivasinya',
        'Pelajari pola konjugasi kata kerja',
        'Memahami transformasi morfologis'
      ]
    },
    {
      id: 'fiqih',
      title: 'AI Fiqih',
      icon: <AutoStoriesRoundedIcon />,
      description: 'Segera hadir! Jelajahi yurisprudensi Islam dengan penjelasan dan referensi berbasis AI.',
      available: false,
      path: '/fiqih',
      benefits: [
        'Pelajari berbagai pendapat hukum Islam',
        'Jelajahi hukum-hukum dengan referensi sumber',
        'Bandingkan pendekatan dari berbagai mazhab'
      ]
    }
  ];

  // Benefits of AI learning
  const aiLearningBenefits = [
    'Pengalaman belajar yang disesuaikan dengan tingkat kemampuan Anda',
    'Belajar dengan kecepatan sendiri, kapan saja dan di mana saja',
    'Umpan balik langsung membantu memperkuat pemahaman yang benar',
    'Kesempatan latihan tak terbatas dengan contoh yang beragam',
    'Penjelasan yang mudah diakses untuk konsep-konsep kompleks'
  ];

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LogoContainer>
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              >
                <LogoWithBg>
                  <motion.img 
                    src="/LogoWithoutBG.png" 
                    alt="NgajiDigital Logo"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  />
                </LogoWithBg>
              </motion.div>
            </LogoContainer>
          
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800, 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                background: 'linear-gradient(120deg, #2563eb, #4f46e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                mx: 'auto',
                letterSpacing: '-0.5px',
                lineHeight: 1.2
              }}
            >
              Pelajari Ilmu Islam dengan AI
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography 
              variant="h6" 
              component="p" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 700, 
                fontWeight: 400,
                mb: 4, 
                fontSize: { xs: '1rem', md: '1.125rem' },
                mx: 'auto',
                lineHeight: 1.6,
                px: { xs: 2, sm: 0 }
              }}
            >
              Pengetahuan modern dan mudah diakses untuk semua orang melalui kekuatan kecerdasan buatan.
              Mulai perjalanan belajar Islam Anda hari ini.
            </Typography>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <ActionButton
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/nahwu-chat')}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{ px: 4, py: 1.5 }}
              >
                Mulai Belajar Sekarang
              </ActionButton>
            </motion.div>
          </motion.div>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <SectionTitle 
            variant="h3"
            sx={{ 
              '&::after': { 
                left: '50%', 
                transform: 'translateX(-50%)' 
              },
              mb: 3,
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
            }}
          >
            Temukan Fitur Kami
          </SectionTitle>
          <Typography 
            color="text.secondary" 
            sx={{ 
              mt: 2, 
              mb: { xs: 4, md: 6 }, 
              maxWidth: 700, 
              mx: 'auto',
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              px: { xs: 2, sm: 0 }
            }}
          >
            Jelajahi alat-alat yang kami kembangkan untuk membantu Anda mempelajari ilmu-ilmu Islam
            melalui kekuatan kecerdasan buatan
          </Typography>
        </Box>
        
        <FeatureContainer>
          {features.map((feature, index) => (
            <FeatureItem key={feature.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                style={{ height: '100%' }}
              >
                <FeatureCard>
                  <CardContent sx={{ flexGrow: 1, p: { xs: 3, sm: 4 } }}>
                    {feature.available ? (
                      <AvailableChip 
                        label="TERSEDIA SEKARANG" 
                        icon={<StarRoundedIcon />}
                        size="small"
                      />
                    ) : (
                      <ComingSoonChip 
                        label="SEGERA HADIR" 
                        size="small"
                      />
                    )}
                    <FeatureIconCircle>
                      {feature.icon}
                    </FeatureIconCircle>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      align="center" 
                      gutterBottom 
                      fontWeight={700}
                      sx={{ mb: 2, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      align="center" 
                      color="text.secondary" 
                      sx={{ mb: 3 }}
                    >
                      {feature.description}
                    </Typography>
                    
                    <Divider sx={{ my: 3, opacity: 0.6 }} />
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary.main" fontWeight={600} sx={{ mb: 1.5 }}>
                        Fitur Utama:
                      </Typography>
                      {feature.benefits.map((benefit, i) => (
                        <BenefitItem key={i}>
                          <CheckCircleOutlineRoundedIcon fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {benefit}
                          </Typography>
                        </BenefitItem>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: { xs: 3, sm: 4 }, pt: 0 }}>
                    <ActionButton
                      variant="contained"
                      color="primary"
                      disabled={!feature.available}
                      onClick={() => feature.available && navigate(feature.path)}
                      fullWidth
                      endIcon={<ArrowForwardRoundedIcon />}
                    >
                      {feature.available ? 'Mulai Belajar' : 'Segera Hadir'}
                    </ActionButton>
                  </CardActions>
                </FeatureCard>
              </motion.div>
            </FeatureItem>
          ))}
        </FeatureContainer>
        
        <InfoSection>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: { xs: 4, md: 3 }
          }}>
            <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 65%' } }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box
                  component={motion.div}
                  whileHover={{ rotate: 15 }}
                  sx={{
                    p: 1,
                    borderRadius: '50%',
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                    display: 'flex',
                    mt: 0.5
                  }}
                >
                  <InfoOutlinedIcon color="info" />
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom fontWeight={700} color="info.dark">
                    Informasi Penting
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 3 }}>
                    NgajiDigital adalah aplikasi eksperimental yang menggunakan AI untuk membantu pengguna memahami ilmu-ilmu Islam.
                    Aplikasi ini masih dalam pengembangan aktif dan disediakan hanya untuk tujuan pendidikan.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Meskipun kami berusaha untuk akurat, konten yang dihasilkan AI mungkin mengandung kesalahan. Kami menyarankan
                    untuk berkonsultasi dengan ulama atau ahli Islam yang berkualifikasi untuk verifikasi konsep yang disajikan di sini.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ 
              flex: { xs: '1 1 auto', md: '0 0 35%' }, 
              borderLeft: { xs: 'none', md: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}` }, 
              pl: { xs: 0, md: 3 } 
            }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600} color="info.dark">
                Manfaat Belajar dengan AI
              </Typography>
              {aiLearningBenefits.map((benefit, index) => (
                <BenefitItem key={index}>
                  <CheckCircleOutlineRoundedIcon fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {benefit}
                  </Typography>
                </BenefitItem>
              ))}
            </Box>
          </Box>
        </InfoSection>
      </Container>
    </Box>
  );
};

export default Home; 