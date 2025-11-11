
import express from 'express';
import { 
    submitTicket, 
    listUserTickets, 
    listAllTickets, 
    updateTicketStatus 
} from '../controllers/supportController.js';
import authMiddleware from '../middleware/auth.js'; // Assuming you have an authentication middleware

const supportRouter = express.Router();

// Client routes (Require user login/auth)
supportRouter.post('/submit', authMiddleware, submitTicket);
supportRouter.get('/user-list', authMiddleware, listUserTickets);

// Admin routes (Require admin authentication/middleware for listAll and updateStatus)
supportRouter.get('/admin-list', listAllTickets); // Add admin-check middleware here later
supportRouter.post('/admin-update', updateTicketStatus); // Add admin-check middleware here later

export default supportRouter;
