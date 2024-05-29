import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, IconButton, Button, TextField, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

    const handleDelete = (id: string) => {
        fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
            .then(() => setBookings(bookings.filter((booking) => booking._id !== id)));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Your Bookings
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Customer Name"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Level"
                    select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Basic">Basic</MenuItem>
                    <MenuItem value="Top">Top</MenuItem>
                    <MenuItem value="Diamond">Diamond</MenuItem>
                </TextField>
                <TextField
                    label="Cleaner Name"
                    value={form.cleanerName}
                    onChange={(e) => setForm({ ...form, cleanerName: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Add Booking
                </Button>
            </form>
            <List>
                {bookings.map((booking) => (
                    <ListItem key={booking._id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(booking._id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText
                            primary={`${booking.customerName} - ${booking.date} ${booking.time}`}
                            secondary={`Level: ${booking.level}, Cleaner: ${booking.cleanerName}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Bookings;