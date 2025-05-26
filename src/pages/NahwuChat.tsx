/// <reference types="react" />

import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  IconButton,
  Stack,
  CircularProgress,
  Divider,
  Alert,
  AlertTitle,
  alpha,
  useTheme,
  Card,
  CardContent,
  Button,
  Fab,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Message type definition
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Styled components
const ChatContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 340px)',
  minHeight: '500px',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
  transition: 'box-shadow 0.3s ease',
  position: 'relative',
  '&:hover': {
    boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.12)}`,
  },
}));

const MessageArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.background.default, 0.5),
  backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.03)} 1px, transparent 1px)`,
  backgroundSize: '20px 20px',
  scrollBehavior: 'smooth',
}));

const InputArea = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  backgroundColor: theme.palette.background.paper,
}));

const MessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'sender'
})<{ sender: 'user' | 'ai' }>(({ theme, sender }) => ({
  padding: theme.spacing(1.5, 2),
  maxWidth: '80%',
  borderRadius: sender === 'user' 
    ? '16px 16px 0 16px' 
    : '16px 16px 16px 0',
  backgroundColor: sender === 'user' 
    ? alpha(theme.palette.primary.main, 0.9)
    : alpha(theme.palette.background.paper, 0.8),
  color: sender === 'user' 
    ? theme.palette.primary.contrastText 
    : theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  boxShadow: sender === 'user'
    ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
    : `0 2px 8px ${alpha(theme.palette.divider, 0.1)}`,
  border: sender === 'user' 
    ? 'none'
    : `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  position: 'relative',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  '& a': {
    color: sender === 'user' 
      ? theme.palette.primary.contrastText 
      : theme.palette.primary.main,
    textDecoration: 'underline',
  },
  '& code': {
    backgroundColor: sender === 'user'
      ? alpha(theme.palette.primary.dark, 0.3)
      : alpha(theme.palette.background.default, 0.5),
    padding: '2px 4px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.9em',
  },
  '& pre': {
    backgroundColor: sender === 'user'
      ? alpha(theme.palette.primary.dark, 0.3)
      : alpha(theme.palette.background.default, 0.5),
    padding: theme.spacing(1),
    borderRadius: '4px',
    overflowX: 'auto',
    '& code': {
      backgroundColor: 'transparent',
      padding: 0,
    }
  },
  '& blockquote': {
    borderLeft: `4px solid ${alpha(theme.palette.divider, 0.5)}`,
    margin: theme.spacing(1, 0),
    paddingLeft: theme.spacing(1),
    color: alpha(sender === 'user' 
      ? theme.palette.primary.contrastText 
      : theme.palette.text.primary, 0.8),
  },
  '& table': {
    borderCollapse: 'collapse',
    width: '100%',
    marginBottom: theme.spacing(1),
    '& th, & td': {
      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      padding: theme.spacing(0.5, 1),
      textAlign: 'left',
    },
    '& th': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
  },
}));

const PageHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
  textAlign: 'center',
  background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: 'none',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const ExampleButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 2),
  fontSize: '0.875rem',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    borderColor: theme.palette.primary.main,
  },
}));

// Example questions/phrases from the Kitab-Mukhtashor
const examples = [
  "ما هو الإعراب؟",
  "قام زيدٌ",
  "ما هي علامات الرفع؟",
  "المستثنى بإلّا ينصب إذا كان الكلام تامًا موجبًا",
];

const NahwuChat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Selamat datang di AI Nahwu! Saya menggunakan pengetahuan yang terbatas pada Kitab "Mukhtashor Jiddan Syarah" oleh Syekh Ahmad Zaini Dahlan. Silakan kirimkan pertanyaan pertama Anda tentang tata bahasa Arab sesuai dengan isi kitab tersebut.\n\n*Catatan: Jawaban akan ditampilkan dalam format Markdown untuk kemudahan membaca.*',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  // Check if this is the initial state (only welcome message)
  const isInitialState = messages.length === 1 && messages[0].sender === 'ai';

  // Auto focus input on page load
  useEffect(() => {
    // Focus on input field
    inputRef.current?.focus();
  }, []);

  // Modify the scrollToBottom function to be more robust
  const scrollToBottom = () => {
    if (messageAreaRef.current) {
      setTimeout(() => {
        if (messageAreaRef.current) { // Check again inside setTimeout
          messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
      }, 100); // Small delay to ensure content is rendered
    }
  };

  // Update useEffect for auto-scrolling
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]); // Also trigger on loading state change

  // Add scroll detection to show/hide the button
  const handleScroll = () => {
    if (messageAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageAreaRef.current;
      // Show button if we're more than 100px from the bottom
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isScrolledUp);
    }
  };

  // Add useEffect to add scroll event listener
  useEffect(() => {
    const messageArea = messageAreaRef.current;
    if (messageArea) {
      messageArea.addEventListener('scroll', handleScroll);
      return () => messageArea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
    // Jangan langsung kirim pesan agar pengguna bisa mengedit jika perlu
    // Focus input after selecting example
    inputRef.current?.focus();
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    scrollToBottom(); // Add this line to scroll after user message

    try {
      // First check if API is healthy
      const healthCheck = await axios.get('http://localhost:5000/api/health');
      
      if (healthCheck.data.apiKeyStatus === "missing") {
        throw new Error("API_KEY_MISSING");
      }
      
      // Make API call to backend with sessionId
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input,
        sessionId: sessionId // Include the session ID if available
      });

      // Save sessionId from response if not already set
      if (!sessionId && response.data.sessionId) {
        setSessionId(response.data.sessionId);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Create appropriate error message based on error type
      let errorText = 'Maaf, terjadi kesalahan dalam memproses permintaan Anda. Silakan coba lagi.';
      
      if (error.message === "API_KEY_MISSING") {
        errorText = 'Kunci API Gemini belum dikonfigurasi. Harap atur GEMINI_API_KEY di file .env backend.';
      } else if (error.response && error.response.data && error.response.data.message) {
        // Use server-provided error message if available
        errorText = error.response.data.message;
      } else if (!navigator.onLine) {
        errorText = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
      } else if (error.code === "ECONNREFUSED" || error.message.includes("Network Error")) {
        errorText = 'Tidak dapat terhubung ke server backend. Pastikan server backend berjalan di http://localhost:5000';
      }
      
      // Display error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Features data
  const features = [
    {
      icon: <TranslateRoundedIcon />,
      title: "Analisis Tata Bahasa Arab",
      description: "Dapatkan analisis gramatikal dari kalimat bahasa Arab sesuai dengan penjelasan dalam kitab Mukhtashor Jiddan Syarah."
    },
    {
      icon: <MenuBookRoundedIcon />,
      title: "Penjelasan Tata Bahasa",
      description: "Pelajari prinsip-prinsip tata bahasa Arab melalui penjelasan langsung dari kitab Syekh Ahmad Zaini Dahlan."
    },
    {
      icon: <FormatQuoteRoundedIcon />,
      title: "Contoh Dalam Kitab",
      description: "Lihat contoh struktur gramatikal yang diambil langsung dari kitab Mukhtashor Jiddan Syarah."
    }
  ];

  const resetConversation = () => {
    // Show confirmation
    if (messages.length > 1 && !window.confirm('Apakah Anda yakin ingin memulai percakapan baru? Semua riwayat percakapan akan dihapus.')) {
      return;
    }

    // Reset session and messages
    setSessionId('');
    setMessages([
      {
        id: '1',
        text: 'Selamat datang di AI Nahwu! Saya menggunakan pengetahuan yang terbatas pada Kitab "Mukhtashor Jiddan Syarah" oleh Syekh Ahmad Zaini Dahlan. Silakan kirimkan pertanyaan pertama Anda tentang tata bahasa Arab sesuai dengan isi kitab tersebut.\n\n*Catatan: Jawaban akan ditampilkan dalam format Markdown untuk kemudahan membaca.*',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    setInput('');
    // Focus on input
    inputRef.current?.focus();
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PageHeading variant="h3">
              AI Nahwu - النحو الذكي
            </PageHeading>
            <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 700, mx: 'auto' }}>
              Pelajari tata bahasa Arab dengan analisis AI. Ketik kalimat bahasa Arab atau tanyakan tentang konsep Nahwu.
            </Typography>
          </motion.div>

          <Alert 
            severity="warning" 
            icon={<WarningAmberRoundedIcon />}
            sx={{ 
              mb: 3, 
              boxShadow: 'none',
              border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
              maxWidth: 700,
              mx: 'auto',
              textAlign: 'left'
            }}
            variant="outlined"
          >
            <AlertTitle>Pengetahuan Terbatas - Gunakan dengan Bijak</AlertTitle>
            <Typography variant="body2">
              AI ini hanya menggunakan pengetahuan dari kitab "Mukhtashor Jiddan Syarah" karya Syekh Ahmad Zaini Dahlan.
              Verifikasi informasi linguistik atau Islam yang penting dengan ulama yang berkualifikasi.
            </Typography>
          </Alert>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {features.map((feature, index) => (
            <Box 
              key={index}
              sx={{ 
                width: { 
                  xs: '100%', 
                  md: 'calc(33.333% - 16px)' 
                } 
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <FeatureCard>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <FeatureIcon>
                      {feature.icon}
                    </FeatureIcon>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </motion.div>
            </Box>
          ))}
        </Box>

        <ChatContainer elevation={0}>
          <MessageArea ref={messageAreaRef}>
            <Stack spacing={1}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ width: 'auto', maxWidth: '80%' }}
                  >
                    <MessageBubble sender={message.sender}>
                      {message.sender === 'user' ? (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            whiteSpace: 'pre-wrap',
                            fontSize: '0.95rem',
                            lineHeight: 1.6
                          }}
                        >
                          {message.text}
                        </Typography>
                      ) : (
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({node, children}) => (
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  fontSize: '0.95rem',
                                  lineHeight: 1.6,
                                  mb: 1
                                }} 
                              >
                                {children}
                              </Typography>
                            ),
                            h1: ({node, children}) => (
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  mb: 1,
                                  mt: 2 
                                }} 
                              >
                                {children}
                              </Typography>
                            ),
                            h2: ({node, children}) => (
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  mb: 1,
                                  mt: 1.5 
                                }} 
                              >
                                {children}
                              </Typography>
                            ),
                            h3: ({node, children}) => (
                              <Typography 
                                variant="subtitle2" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  mb: 0.5,
                                  mt: 1 
                                }} 
                              >
                                {children}
                              </Typography>
                            ),
                            li: ({node, children}) => (
                              <li>
                                <Typography 
                                  variant="body2" 
                                  component="span"
                                  sx={{ 
                                    fontSize: '0.95rem',
                                    lineHeight: 1.6
                                  }} 
                                >
                                  {children}
                                </Typography>
                              </li>
                            ),
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      )}
                    </MessageBubble>
                  </motion.div>
                </Box>
              ))}
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: '16px',
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      maxWidth: '80%',
                      boxShadow: `0 4px 12px ${alpha(theme.palette.divider, 0.1)}`,
                      border: `1px solid ${alpha(theme.palette.divider, 0.08)}`
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={16} color="primary" />
                      <Typography variant="body2" sx={{ ml: 1, fontSize: '0.9rem' }}>
                        Sedang berpikir...
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              )}
            </Stack>
          </MessageArea>
          <Zoom in={showScrollButton}>
            <Fab
              size="small"
              color="primary"
              aria-label="scroll to bottom"
              onClick={scrollToBottom}
              sx={{
                position: 'absolute',
                bottom: 90,
                right: 20,
                zIndex: 2,
              }}
            >
              <KeyboardArrowDownIcon />
            </Fab>
          </Zoom>
          <Divider />
          {isInitialState && (
            <Box sx={{ p: 2, backgroundColor: alpha(theme.palette.background.paper, 0.5) }}>
              <Typography variant="caption" color="text.secondary">
                Coba salah satu contoh ini:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 1 }}>
                {examples.map((example, index) => (
                  <ExampleButton 
                    key={index} 
                    size="small" 
                    onClick={() => handleExampleClick(example)}
                  >
                    {example.length > 25 ? example.substring(0, 25) + '...' : example}
                  </ExampleButton>
                ))}
              </Box>
            </Box>
          )}
          <Divider />
          <InputArea>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="info"
                onClick={resetConversation}
                title="Mulai percakapan baru"
                sx={{ 
                  mr: 1,
                  width: 40,
                  height: 40,
                  bgcolor: alpha(theme.palette.info.main, 0.08),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.info.main, 0.12),
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                <RestartAltIcon fontSize="small" />
              </IconButton>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Ketik pertanyaan atau teks bahasa Arab Anda..."
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={loading}
                multiline
                maxRows={4}
                inputRef={inputRef}
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    '&:hover fieldset': {
                      borderColor: alpha(theme.palette.primary.main, 0.3)
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2
                    }
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.divider, 0.2)
                  }
                }}
              />
              <IconButton
                color="primary"
                onClick={sendMessage}
                disabled={loading || input.trim() === ''}
                sx={{ 
                  ml: 1,
                  width: 48,
                  height: 48,
                  bgcolor: input.trim() ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  '&:hover': {
                    bgcolor: input.trim() ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                    transform: input.trim() ? 'scale(1.05)' : 'none',
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                <SendRoundedIcon />
              </IconButton>
            </Box>
          </InputArea>
        </ChatContainer>

        <Box sx={{ mt: 5, p: 3, bgcolor: alpha(theme.palette.info.main, 0.04), borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <InfoOutlinedIcon color="info" sx={{ mt: 0.5 }} />
            <Box>
              <Typography variant="h6" gutterBottom fontWeight={600} color="info.dark">
                Tentang Kitab Mukhtashor Jiddan Syarah
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Kitab Mukhtashor Jiddan Syarah</strong> adalah syarah (penjelasan) atas kitab Matan Al-Ajurumiyyah 
                karya Imam Shonhaji yang ditulis oleh Syekh Ahmad Zaini Dahlan. Kitab ini berisi tentang dasar-dasar ilmu Nahwu 
                (tata bahasa Arab) dengan penjelasan ringkas namun mendalam.
              </Typography>
              <Typography variant="body2" paragraph>
                Konsep-konsep kunci dalam Nahwu yang dibahas dalam kitab ini meliputi:
              </Typography>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>
                  <Typography variant="body2" paragraph>
                    <strong>I'rab (إعراب)</strong> - Sistem akhiran kasus yang menandai fungsi gramatikal sebuah kata
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" paragraph>
                    <strong>Marfu'at (مرفوعات)</strong> - Kata-kata dengan akhiran kasus nominatif (biasanya subjek)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" paragraph>
                    <strong>Mansubat (منصوبات)</strong> - Kata-kata dengan akhiran kasus akusatif (biasanya objek)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" paragraph>
                    <strong>Majrurat (مجرورات)</strong> - Kata-kata dengan akhiran kasus genitif (biasanya setelah preposisi)
                  </Typography>
                </li>
              </ul>
              <Typography variant="body2">
                AI ini hanya menggunakan pengetahuan dari kitab ini dan tidak menggunakan sumber pengetahuan lain.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NahwuChat; 