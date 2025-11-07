import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './CustomerCare.css';
import { StoreContext } from '../../Context/StoreContext';
import { RiCustomerServiceLine, RiFileEditLine, RiFileListLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

const CustomerCare = () => {
    const { url, token } = useContext(StoreContext);

    const [loading, setLoading] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({
        subject: 'Query', 
        message: ''
    });

    const subjects = ['Query', 'Complaint', 'Order Issue', 'Feedback', 'Other'];

    /* --- Form Submission Handlers --- */
    const handleChange = (e) => {
        setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
    };

    const handleSubmitTicket = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!token) {
            toast.error("Please log in to submit a support request.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${url}/api/support/submit`, 
                { ...newTicket, subject: newTicket.subject.toLowerCase() }, // Send subject lowercase for robust backend check
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success("Support ticket submitted! We will respond shortly.");
                setNewTicket({ subject: 'Query', message: '' });
                fetchUserTickets(); 
            } else {
                toast.error(response.data.message || "Failed to submit ticket.");
            }
        } catch (error) {
            toast.error("Network or server error. Could not submit ticket.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    /* --- Ticket History Fetcher --- */
    const fetchUserTickets = async () => {
        if (!token) return;

        try {
            const response = await axios.get(
                `${url}/api/support/user-list`, 
                { headers: { token } }
            );

            if (response.data.success) {
                setTickets(response.data.data);
            } else {
                toast.error("Could not load your ticket history.");
            }
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserTickets();
        }
    }, [token]);


    /* --- Component Render --- */
    return (
        <div className="support-container">
            <div className="page-header">
                <h1 className="tomato-text"><RiCustomerServiceLine /> Customer Care Portal</h1>
                <p>We're here to help! Submit any complaints, queries, or feedback below.</p>
            </div>

            <div className="support-content-grid">
                
                {/* --- 1. Ticket Submission Form --- */}
                <div className="support-card form-card">
                    <h2><RiFileEditLine /> Submit New Request</h2>
                    <form onSubmit={handleSubmitTicket} className="support-form">
                        
                        <label>Select Subject</label>
                        <select 
                            name="subject" 
                            value={newTicket.subject} 
                            onChange={handleChange}
                            className="text-input"
                            required
                        >
                            {subjects.map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>

                        <label>Your Message</label>
                        <textarea
                            name="message"
                            value={newTicket.message}
                            onChange={handleChange}
                            placeholder="Please describe your issue in detail..."
                            className="text-input detail-input"
                            required
                        />

                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Ticket'}
                        </button>
                    </form>
                </div>

                
                {/* --- 2. Ticket History --- */}
                <div className="support-card history-card">
                    <h2><RiFileListLine /> Your Request History</h2>
                    
                    {tickets.length === 0 && <p className="no-tickets-msg">No recent support requests found.</p>}

                    <div className="ticket-list">
                        {tickets.map((ticket) => (
                            <div key={ticket._id} className={`ticket-item status-${ticket.status.toLowerCase()}`}>
                                <div className="ticket-header">
                                    <span className="ticket-subject">{ticket.subject}</span>
                                    <span className={`ticket-status`}>{ticket.status}</span>
                                </div>
                                <p className="ticket-date">Submitted: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                                <p className="ticket-message">{ticket.message.substring(0, 100)}...</p>
                                {ticket.adminNote && (
                                    <div className="admin-response">
                                        <strong>Admin Note:</strong> {ticket.adminNote}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerCare;