// src/views/Bookings.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BookingContainer = styled.div`
  padding: 20px;
`;

const BookingItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

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
            .then(() => setBookings(bookings.filter((booking) => booking.id !== id)));
    };

    return (
        <BookingContainer>
            <h1>Your Bookings</h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                />
                <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                />
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                    <option value="Basic">Basic</option>
                    <option value="Top">Top</option>
                    <option value="Diamond">Diamond</option>
                </select>
                <input
                    type="text"
                    placeholder="Cleaner Name"
                    value={form.cleanerName}
                    onChange={(e) => setForm({ ...form, cleanerName: e.target.value })}
                    required
                />
                <button type="submit">Add Booking</button>
            </Form>
            {bookings.map((booking) => (
                <BookingItem key={booking.id}>
                    <h2>{booking.customerName}</h2>
                    <p>{booking.date} - {booking.time}</p>
                    <p>{booking.level}</p>
                    <button onClick={() => handleDelete(booking.id)}>Delete</button>
                </BookingItem>
            ))}
        </BookingContainer>
    );
};

export default Bookings;
