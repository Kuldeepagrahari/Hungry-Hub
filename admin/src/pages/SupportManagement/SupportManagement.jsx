// src/pages/SupportManagement/SupportManagement.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './SupportManagement.css'; 
import { RiFileList3Line, RiRefreshLine, RiEditLine, RiCloseCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

// NOTE: Replace this with your actual Admin URL and token source
const ADMIN_URL = "https://hungry-hub-server.onrender.com"; 
const ADMIN_TOKEN = "YOUR_ADMIN_AUTH_TOKEN"; // Must be stored securely or accessed via context

const SupportManagement = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('Pending'); // Default filter

    // State for the modal (editing a ticket)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [adminNote, setAdminNote] = useState('');
    
    const statusOptions = ['Pending', 'Processing', 'Resolved', 'Closed'];

    /* --- 1. Data Fetching --- */
    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            // This route should ideally be protected by admin-check middleware
            const response = await axios.get(
                `${ADMIN_URL}/api/support/admin-list`,
                // Assuming Admin authentication is handled via headers
                { headers: { token: ADMIN_TOKEN } } 
            );

            if (response.data.success) {
                setTickets(response.data.data);
            } else {
                toast.error("Failed to load tickets.");
            }
        } catch (error) {
            toast.error("Network Error: Could not fetch support data.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);


    /* --- 2. Ticket Actions (Update Status) --- */
    const openEditModal = (ticket) => {
        setCurrentTicket(ticket);
        setNewStatus(ticket.status);
        setAdminNote(ticket.adminNote || '');
        setIsModalOpen(true);
    };

    const handleUpdateTicket = async (e) => {
        e.preventDefault();
        
        if (!currentTicket || !newStatus) return;

        try {
            const response = await axios.post(
                `${ADMIN_URL}/api/support/admin-update`,
                { ticketId: currentTicket._id, status: newStatus, adminNote },
                { headers: { token: ADMIN_TOKEN } }
            );

            if (response.data.success) {
                toast.success(`Ticket ${currentTicket._id.substring(0, 8)} updated to ${newStatus}.`);
                setIsModalOpen(false);
                fetchTickets(); // Refresh list
            } else {
                toast.error("Failed to update status.");
            }
        } catch (error) {
            toast.error("Error updating ticket.");
        }
    };


    const filteredTickets = tickets.filter(
        ticket => statusFilter === 'All' || ticket.status === statusFilter
    );

    /* --- 3. Component Render --- */
    return (
        <div className="admin-support-container">
            <div className="admin-header">
                <h1><RiFileList3Line /> Support Tickets ({filteredTickets.length})</h1>
                <div className="admin-actions">
                    <select 
                        className="filter-select" 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Tickets</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <button onClick={fetchTickets} className="refresh-btn" disabled={loading}>
                        <RiRefreshLine /> {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {loading && tickets.length === 0 ? (
                <p className="loading-message">Loading tickets...</p>
            ) : filteredTickets.length === 0 ? (
                <p className="no-tickets-msg">No tickets found for the '{statusFilter}' status.</p>
            ) : (
                <div className="ticket-grid">
                    {filteredTickets.map(ticket => (
                        <div key={ticket._id} className={`ticket-card status-${ticket.status.toLowerCase()}`}>
                            <div className="card-header">
                                <h3>{ticket.subject} - #{ticket._id.substring(0, 6)}</h3>
                                <span className={`status-badge status-${ticket.status.toLowerCase()}`}>{ticket.status}</span>
                            </div>
                            <p><strong>User:</strong> {ticket.userName} ({ticket.userEmail})</p>
                            <p className="ticket-message-preview">{ticket.message.substring(0, 150)}{ticket.message.length > 150 ? '...' : ''}</p>
                            <p className="ticket-date-time">Submitted: {new Date(ticket.createdAt).toLocaleString()}</p>
                            <button 
                                onClick={() => openEditModal(ticket)} 
                                className="edit-btn"
                            >
                                <RiEditLine /> Manage
                            </button>
                        </div>
                    ))}
                </div>
            )}
            
            {/* --- Management Modal --- */}
            {isModalOpen && currentTicket && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}><RiCloseCircleLine /></button>
                        <h2>Manage Ticket: #{currentTicket._id.substring(0, 8)}</h2>
                        
                        <div className="ticket-details">
                            <p><strong>User:</strong> {currentTicket.userName} ({currentTicket.userEmail})</p>
                            <p><strong>Subject:</strong> {currentTicket.subject}</p>
                            <p><strong>Status:</strong> <span className={`status-badge status-${currentTicket.status.toLowerCase()}`}>{currentTicket.status}</span></p>
                            <div className="full-message-box">
                                <strong>Message:</strong>
                                <p>{currentTicket.message}</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateTicket} className="update-form">
                            <label>Update Status</label>
                            <select 
                                value={newStatus} 
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="input-field"
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>

                            <label>Admin Resolution Note</label>
                            <textarea 
                                value={adminNote} 
                                onChange={(e) => setAdminNote(e.target.value)}
                                placeholder="Add notes on how the issue was resolved..."
                                className="input-field resolution-note"
                            />
                            
                            <button type="submit" className="primary-btn update-btn">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupportManagement;