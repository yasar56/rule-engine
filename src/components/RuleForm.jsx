import React, { useState } from "react";
import axios from "axios";

const RuleForm = ({ onAddRule, rules }) => {
  const [ruleString, setRuleString] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ruleString.trim()) {
      const response = await axios.post(
        "http://localhost:5000/api/create_rule",
        { rule_string: ruleString }
      );
      alert("Rule Create Successfully")
      console.log("rule Created Succesfully")


      onAddRule(response.data);
      setRuleString(""); 
    }
  };

  return (
    <div className="create-rule-form">
      <form onSubmit={handleSubmit}>
        <h2>Create Rule</h2>
        <textarea
          className="create-rule"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Enter rule string"
          required
        />
        <button type="submit" className="btn btn-success">
          Add Rule
        </button>
      </form>
      <div>
        <h3 className="mt-4">Created Rules</h3>
        {rules.length > 0 ? (
          <div className="" >
            <ul style={{listStyle:"none"}}>
              {rules.map((rule, index) => (
                <>
                <strong>Rule : {index+1}</strong>
                <li key={rule._id} style={{width:"",border:"1px solid #D3D3D3", margin:"5px", padding:"10px"}}>{rule.rule_string}</li>
                <hr/>
              
                </>))}
              
            </ul>
          
          </div>
        ) : (
          <p>No rules created yet.</p>
        )}
      </div>
    </div>
  );
};

export default RuleForm;
