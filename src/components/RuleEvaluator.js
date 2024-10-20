import React, { useState } from "react";
import axios from "axios";

const RuleEvaluator = ({ onEvaluate }) => {
  const [userData, setUserData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [evaluationResults, setEvaluationResults] = useState([]); // State to hold evaluation results

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/evaluate_rule",
        { userData }
      );
      onEvaluate(response.data); // Assuming the response data contains evaluation results
      setEvaluationResults(response.data); // Store evaluation results for display
    } catch (error) {
      console.error("Error evaluating the rule:", error);
      // You might want to handle errors (e.g., showing a message to the user)
    }
  };

  return (
    <div
      className="evaluate-rule"
      style={{ border: "1px solid #000", height: "auto", padding: "10px" }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Enter User Data for Evaluation</h2>
        <div>
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={userData.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
        </div>
        <div>
          <label>Dept: </label>
          <input
            type="text"
            name="department"
            value={userData.department}
            onChange={handleChange}
            placeholder="Department"
            required
          />
        </div>
        <div>
          <label>Salary: </label>
          <input
            type="number"
            name="salary"
            value={userData.salary}
            onChange={handleChange}
            placeholder="Salary"
            required
          />
        </div>
        <div>
          <label>Exp: </label>
          <input
            type="number"
            name="experience"
            value={userData.experience}
            onChange={handleChange}
            placeholder="Experience (Years)"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Evaluate Rules</button>
      </form>

      {/* Display Evaluation Results */}
      <div>
        <h3>Evaluation Results</h3>
        {evaluationResults.length > 0 ? (
          <ul style={{listStyle:"none"}}>
            {evaluationResults.map((result, index) => (
                <>
            <strong>Rule : {index+1}</strong>
              <li key={index} style={{width:"",border:"1px solid #D3D3D3", margin:"5px", padding:"10px"}}>
                 {result.isEligible ? "Eligible" : "Not Eligible"}
              </li>
              </>
            ))}
          </ul>
        ) : (
          <p>No evaluation results available.</p>
        )}
      </div>
    </div>
  );
};

export default RuleEvaluator;
