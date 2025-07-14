import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StatsPage = () => {
    const [shortcode, setShortcode] = useState('');
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    const fetchStats = async () => {
        try {
            setError('');
            const res = await axios.get(`http://localhost:5000/shorturls/${shortcode}`);
            setStats(res.data);
        } catch (err) {
            console.error(err);
            setStats(null);
            setError(err.response?.data?.error || 'Server error');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom>Check Short URL Stats</Typography>
            <TextField
                label="Enter Shortcode"
                value={shortcode}
                onChange={(e) => setShortcode(e.target.value)}
                size="small"
                style={{ marginRight: '10px' }}
            />
            <Button variant="contained" onClick={fetchStats}>Get Stats</Button>

            {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}

            {stats && (
                <Card style={{ marginTop: '30px', maxWidth: '700px', margin: 'auto', padding: '20px' }}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>Original URL: <span style={{ fontWeight: 600 }}>{stats.originalUrl}</span></Typography>
                        <Typography>Created At: {new Date(stats.createdAt).toLocaleString()}</Typography>
                        <Typography>Expires At: {new Date(stats.expiresAt).toLocaleString()}</Typography>
                        <Typography>Total Clicks: <span style={{ fontWeight: 600 }}>{stats.totalClicks}</span></Typography>

                        <Typography variant="h6" style={{ marginTop: '15px' }}>Click Details</Typography>
                        {stats.clicks.length === 0 ? (
                            <Typography>No clicks yet.</Typography>
                        ) : (
                            stats.clicks.map((click, index) => (
                                <Accordion key={index} style={{ marginTop: '10px' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Clicked at {new Date(click.timestamp).toLocaleString()}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Referrer: {click.referrer}</Typography>
                                        <Typography>Location: {click.location}</Typography>
                                        <Typography>IP: {click.ip}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default StatsPage;
