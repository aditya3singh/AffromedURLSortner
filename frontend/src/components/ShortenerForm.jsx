import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Snackbar, CircularProgress } from '@mui/material';
import Fade from '@mui/material/Fade';

export default function ShortenerForm() {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async () => {
    if (!url.startsWith('http')) {
      setSnackbar({ open: true, message: 'Please enter a valid URL.', severity: 'error' });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/shorturls', {
        url,
        validity: validity ? parseInt(validity) : undefined,
        shortcode: shortcode || undefined
      });
      setResult(res.data);
      setSnackbar({ open: true, message: 'Short URL created!', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Error creating short URL.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        background: 'linear-gradient(135deg, #89f7fe, #66a6ff)'
      }}
    >
      <Fade in={true} timeout={800}>
        <Box sx={{
          p: 5,
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 6,
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          maxWidth: 600,
          textAlign: 'center'
        }}>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold', color: '#fff' }}>
            Premium URL Shortener
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, color: '#f0f0f0' }}>
            Simplify & style your long links
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Paste long URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
              sx={{ background: 'rgba(255,255,255,0.8)', borderRadius: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Validity (min)"
                value={validity}
                onChange={e => setValidity(e.target.value)}
                sx={{ flex: 1, background: 'rgba(255,255,255,0.8)', borderRadius: 2 }}
              />
              <TextField
                variant="outlined"
                placeholder="Custom shortcode"
                value={shortcode}
                onChange={e => setShortcode(e.target.value)}
                sx={{ flex: 2, background: 'rgba(255,255,255,0.8)', borderRadius: 2 }}
              />
            </Box>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                mt: 2,
                borderRadius: 3,
                py: 1.5,
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #ff758c, #ff7eb3)',
                color: 'white',
                boxShadow: '0 6px 20px rgba(255,118,182,0.45)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #ff7eb3, #ff758c)',
                  transform: 'scale(1.05)'
                },
                transition: '0.3s'
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Shorten Now'}
            </Button>
          </Box>

          {result && (
            <Fade in={true} timeout={600}>
              <Box sx={{ mt: 4, background: 'rgba(255,255,255,0.25)', p: 3, borderRadius: 3, color: '#fff' }}>
                <Typography variant="h6">
                  Your short link: <a href={result.shortLink} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>{result.shortLink}</a>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>Expires: {result.expiry}</Typography>
              </Box>
            </Fade>
          )}
        </Box>
      </Fade>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
}
