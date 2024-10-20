import React, { useEffect, useState } from "react";
import RuleForm from "./components/RuleForm";
import RuleEvaluator from "./components/RuleEvaluator"; // Import the RuleEvaluator component
import axios from "axios";
import "./App.css"; // Optional styling

const App = () => {
  const [rules, setRules] = useState([]);
  const [evaluationResults, setEvaluationResults] = useState([]); // State to hold evaluation results

  useEffect(() => {
    const fetchRules = async () => {
      const response = await axios.get("http://localhost:5000/api/rules");
      setRules(response.data);
    };

    fetchRules();
  }, []);

  const handleAddRule = (newRule) => {
    setRules((prevRules) => [...prevRules, newRule]);
  };

  const handleEvaluate = (results) => {
    setEvaluationResults(results); // Update evaluation results state
  };

  return (
    <div className="container">
      <h1>Rule Engine</h1>
      <div className="row">
        <div className="col-6 ">
          <RuleForm onAddRule={handleAddRule}  rules={rules}/>
        </div>
        <div className="col-6">
          <RuleEvaluator onEvaluate={handleEvaluate} />{" "}
        </div>
        {/* Include the RuleEvaluator */}
        {/* <h2>Rules List</h2> */}
        {/* {rules.length > 0 ? (
          <ul>
            {rules.map((rule) => (
              <li key={rule._id}>{rule.rule_string}</li>
            ))}
          </ul>
        ) : (
          <p>No rules created yet.</p>
        )} */}
        {/* <h2>Evaluation Results</h2>
        {evaluationResults.length > 0 ? (
          <ul>
            {evaluationResults.map((result, index) => (
              <li key={index}>
                {result.rule}: {result.isEligible ? "Eligible" : "Not Eligible"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No evaluation results available.</p>
        )} */}
      </div>
    </div>
  );
};

export default App;
