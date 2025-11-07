import supportModel from '../models/supportModel.js';
import userModel from '../models/userModel.js'; // Assuming userModel is available for lookup

// 1. User: Submit a new ticket
export const submitTicket = async (req, res) => {
    try {
        const userId = req.userId; // Matches your authMiddleware pattern

        if (!userId) {
            return res.status(401).json({ success: false, message: "Authentication required to submit ticket." });
        }
        
        // Fetch User Details to satisfy required fields
        const user = await userModel.findById(userId); 
        if (!user) {
            return res.status(404).json({ success: false, message: "User record not found." });
        }

        const { subject, message } = req.body;
        
        // Robust subject validation
        const validSubjects = ['Complaint', 'Query', 'Order Issue', 'Feedback', 'Other'];
        const formattedSubject = validSubjects.find(sub => sub.toLowerCase() === subject.toLowerCase());
        
        if (!formattedSubject) {
            return res.status(400).json({ success: false, message: `Invalid subject '${subject}'. Please choose from ${validSubjects.join(', ')}.` });
        }
        
        const newTicket = new supportModel({
            userId: userId, 
            userName: user.name, 
            userEmail: user.email, 
            subject: formattedSubject, 
            message
        });

        await newTicket.save();
        res.json({ success: true, message: "Support ticket submitted successfully." });

    } catch (error) {
        console.error("Error submitting ticket:", error); 
        res.status(500).json({ success: false, message: "Could not submit ticket due to a server error." });
    }
};

// 2. User: View their own tickets
export const listUserTickets = async (req, res) => {
    try {
        const userId = req.userId; 
        
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not Authorized." });
        }
        
        const tickets = await supportModel.find({ userId: userId }).sort({ createdAt: -1 });
        res.json({ success: true, data: tickets });
    } catch (error) {
        console.error("Error listing user tickets:", error);
        res.status(500).json({ success: false, message: "Could not fetch tickets." });
    }
};

// 3. Admin: List all tickets (Admin Panel)
export const listAllTickets = async (req, res) => {
    try {
        const tickets = await supportModel.find({}).sort({ status: 1, createdAt: -1 });
        res.json({ success: true, data: tickets });
    } catch (error) {
        console.error("Error listing all tickets:", error);
        res.status(500).json({ success: false, message: "Could not fetch all tickets." });
    }
};

// 4. Admin: Update ticket status (Admin Panel)
export const updateTicketStatus = async (req, res) => {
    try {
        const { ticketId, status, adminNote } = req.body;
        await supportModel.findByIdAndUpdate(ticketId, { status, adminNote });
        res.json({ success: true, message: "Ticket status updated." });
    } catch (error) {
        console.error("Error updating ticket status:", error);
        res.status(500).json({ success: false, message: "Could not update ticket status." });
    }
};