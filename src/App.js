import React, { useEffect, useState } from "react";
import RuleForm from "./components/RuleForm";
import RuleEvaluator from "./components/RuleEvaluator"; 
import axios from "axios";
import "./App.css";

const App = () => {
  const [rules, setRules] = useState([]);
  const [evaluationResults, setEvaluationResults] = useState([]); 

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
    setEvaluationResults(results); 
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
      
      </div>
    </div>
  );
};

export default App;
