// models/supportModel.js

import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    
    // Details of the request
    subject: { 
        type: String, 
        enum: ['Complaint', 'Query', 'Order Issue', 'Feedback', 'Other'], 
        required: true 
    },
    message: { type: String, required: true },
    
    // Status tracking for Admin
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Resolved', 'Closed'], 
        default: 'Pending' 
    },
    createdAt: { type: Date, default: Date.now },
    adminNote: { type: String }
});

const supportModel = mongoose.models.Support || mongoose.model('Support', supportSchema);
export default supportModel;