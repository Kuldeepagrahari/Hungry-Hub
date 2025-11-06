// src/pages/WhatShouldIEat/WhatShouldIEat.jsx (Final Code - Cleaned)

import React, { useState, useEffect } from 'react'; // 👈 Removed useContext
import './whatShouldIEat.css';
import { IoIosRestaurant } from 'react-icons/io';
import { GiPartyPopper } from 'react-icons/gi';
import { FaHeartbeat, FaAllergies, FaSmile } from 'react-icons/fa';
import { RiSparkling2Fill } from 'react-icons/ri'; 
import { Link } from 'react-router-dom'; // 👈 Import Link for the instruction button

const WhatShouldIEat = () => {
    // --- State Management for User Inputs ---
    const [selectedOccasions, setSelectedOccasions] = useState([]);
    const [selectedDiets, setSelectedDiets] = useState([]);
    const [allergies, setAllergies] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');

    // --- State Management for Recommendations ---
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null); // { recommended: [], avoid: [] }
    const [error, setError] = useState(null);

    // Helper functions (remain the same)
    const toggleSelection = (state, setState, value) => {
        if (state.includes(value)) {
            setState(state.filter(item => item !== value));
        } else {
            setState([...state, value]);
        }
    };

    useEffect(() => {
        document.querySelectorAll('.option-button').forEach(button => {
            const value = button.dataset.value;
            const isSelected = selectedOccasions.includes(value) || selectedDiets.includes(value);
            button.classList.toggle('selected', isSelected);
        });
    }, [selectedOccasions, selectedDiets]);


    // --- Core Function: Call Backend & Gemini (URL changed back to local for testing) ---
    const handleGetRecommendations = async () => {
        const queryIsRelevant = selectedOccasions.length > 0 || selectedDiets.length > 0 || allergies || additionalDetails;
        if (!queryIsRelevant) {
            setError("Please select at least one preference or type a detailed query.");
            return;
        }

        setLoading(true);
        setRecommendations(null); 
        setError(null);

        // Aggregate all user preferences into a single prompt string
        const userPrompt = `
            Occasion/Goal: ${selectedOccasions.join(', ') || 'None'}. 
            Dietary Focus: ${selectedDiets.join(', ') || 'None'}. 
            Allergies/Health: ${allergies || 'None'}. 
            Additional Details: ${additionalDetails || 'None provided'}.
        `.trim();


        try {
            // NOTE: Using the local URL for development, change to Render URL for production/deployment test
            const response = await fetch('https://hungry-hub-server.onrender.com/api/gemini/suggestions', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userPrompt })
            });
            
            const data = await response.json();

            if (!response.ok || data.success === false) {
                throw new Error(data.message || 'Failed to get recommendations from the server.');
            }

            setRecommendations(data);

        } catch (err) {
            console.error("Recommendation Error:", err);
            setError(`Could not process your request. ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="what-should-i-eat-container">
            <div className="page-header">
                <h1 className="tomato-text">
                    <RiSparkling2Fill /> AI Meal Advisor
                </h1>
                <p>
                    Let our **Gemini-powered** assistant analyze your needs and suggest the perfect dishes from the menu.
                </p>
            </div>

            {/* --- Input Grid (remains the same) --- */}
            <div className="input-card-grid">
                
                <div className="input-card">
                    <h3><GiPartyPopper /> Occasion or Goal</h3>
                    <div className="options-grid">
                        <button className="option-button" data-value="party" onClick={() => toggleSelection(selectedOccasions, setSelectedOccasions, 'party')}>Party/Gathering</button>
                        <button className="option-button" data-value="work" onClick={() => toggleSelection(selectedOccasions, setSelectedOccasions, 'work')}>Work Lunch</button>
                        <button className="option-button" data-value="workout" onClick={() => toggleSelection(selectedOccasions, setSelectedOccasions, 'workout')}>Post-Workout</button>
                        <button className="option-button" data-value="comfort" onClick={() => toggleSelection(selectedOccasions, setSelectedOccasions, 'comfort')}>Comfort Food</button>
                    </div>
                </div>

                
                <div className="input-card">
                    <h3><FaHeartbeat /> Dietary Focus</h3>
                    <div className="options-grid">
                        <button className="option-button" data-value="vegan" onClick={() => toggleSelection(selectedDiets, setSelectedDiets, 'vegan')}>Vegan</button>
                        <button className="option-button" data-value="low-carb" onClick={() => toggleSelection(selectedDiets, setSelectedDiets, 'low-carb')}>Low Carb</button>
                        <button className="option-button" data-value="high-protein" onClick={() => toggleSelection(selectedDiets, setSelectedDiets, 'high-protein')}>High Protein</button>
                        <button className="option-button" data-value="kids" onClick={() => toggleSelection(selectedDiets, setSelectedDiets, 'kids')}>Kid-Friendly</button>
                    </div>
                </div>

                
                <div className="input-card full-width">
                    <h3><FaAllergies /> Allergies & Health Notes</h3>
                    <input
                        type="text"
                        placeholder="e.g., Gluten, Peanuts, High Blood Pressure..."
                        className="text-input"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                    />
                    <textarea
                        placeholder="Detailed query: 'I need a low-calorie dinner', or 'I'm looking for something high-fiber and savory'."
                        className="text-input detail-input"
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                    ></textarea>
                </div>
            </div>

            {/* --- Action & Status --- */}
            <button 
                className={`primary-btn ${loading ? 'loading' : ''}`}
                onClick={handleGetRecommendations}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <div className="spinner"></div> 
                        Analyzing Data...
                    </>
                ) : (
                    <>
                        <IoIosRestaurant /> Get My Personalized Suggestions
                    </>
                )}
            </button>

            {/* --- Error Handling --- */}
            {error && <div className="alert-error">{error}</div>}

            {/* --- Recommendations Display --- */}
            {recommendations && (
                <div className="recommendations-section">
                    <h2><FaSmile /> Gemini's Top Picks for You</h2>
                    <div className="recommendations-list">
                        {Array.isArray(recommendations.recommended) && recommendations.recommended.map((item, index) => (
                            <div key={index} className="recommendation-item">
                                <h4>{item.name}</h4>
                                <p className="reason">{item.reason}</p>
                                {/* REMOVED: <button className="add-to-cart-btn">Add to Cart</button> */}
                            </div>
                        ))}
                    </div>

                    <h3 className="avoid-title">🚫 We Suggest You Avoid:</h3>
                    <div className="avoid-list">
                        {Array.isArray(recommendations.avoid) && recommendations.avoid.map((item, index) => (
                            <div key={index} className="avoid-item">
                                <h4>{item.name}</h4>
                                <p className="reason">{item.reason}</p>
                            </div>
                        ))}
                    </div>
                    
                    {/* --- New Instruction and Link --- */}
                    <div className="instruction-footer">
                        <p>You can find all these suggested items, and easily add them to your cart, on the main Food Menu page.</p>
                        <Link to="/foodMenu" className="primary-btn menu-link-btn">
                            <IoIosRestaurant /> Go to Food Menu
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhatShouldIEat;