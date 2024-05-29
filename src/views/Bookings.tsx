import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Bookings = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [form, setForm] = useState({ date: '', time: '', customerName: '', level: 'Basic', cleanerName: '' });

    useEffect(() => {
        fetch('http://localhost:5000/bookings')
            .then((response) => response.json())
            .then((data) => setBookings(data));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
            .then((response) => response.json())
            .then((newBooking) => setBookings([...bookings, newBooking]));
    };

    const handleDelete = () => {
        fetch(`http://localhost:5000/bookings/${bookings[0]?.id}`, { method: 'DELETE' })
            .then(() => setBookings([]));
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your Bookings
                </Typography>
                <Paper style={{ padding: 16 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Customer Name"
                            value={form.customerName}
                            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Date"
                            type="date"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Time"
                            type="time"
                            value={form.time}
                            onChange={(e) => setForm({ ...form, time: e.target.value })}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Level</InputLabel>
                            <Select
                                value={form.level}
                                onChange={(e) => setForm({ ...form, level: e.target.value })}
                                fullWidth
                            >
                                <MenuItem value="Basic">Basic</MenuItem>
                                <MenuItem value="Top">Top</MenuItem>
                                <MenuItem value="Diamond">Diamond</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Cleaner Name"
                            value={form.cleanerName}
                            onChange={(e) => setForm({ ...form, cleanerName: e.target.value })}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary">Add Booking</Button>
                        </Box>
                    </form>
                </Paper>
                <Box mt={4}>
                    {bookings.map((booking) => (
                        <Paper key={booking.id} style={{ padding: 16, marginBottom: 16 }}>
                            <Typography variant="h6">{booking.customerName}</Typography>
                            <Typography>{booking.date} - {booking.time}</Typography>
                            <Typography>{booking.level}</Typography>
                            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete All Bookings</Button>
                        </Paper>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default Bookings;
