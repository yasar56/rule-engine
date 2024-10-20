const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/rule-engine', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Rule schema
const ruleSchema = new mongoose.Schema({
    rule_string: { type: String, required: true },
    ast: Object,  // You can define this more specifically based on your AST structure
});

const Rule = mongoose.model('Rule', ruleSchema);

// Create AST from rule string
const createAST = (ruleString) => {
    if (!ruleString || typeof ruleString !== 'string') {
        console.error('Invalid rule string:', ruleString);
        return null;  // Return null if the rule string is invalid
    }

    const trimmedRule = ruleString.trim();
    
    // Basic example for a single condition rule
    const operators = ['>', '<', '=', '>=', '<='];
    for (const operator of operators) {
        if (trimmedRule.includes(operator)) {
            const [field, value] = trimmedRule.split(operator).map(part => part.trim());
            if (!field || !value) {
                console.error('Error parsing rule string:', trimmedRule);
                return null;  // Return null if parsing fails
            }
            return {
                type: 'operand',
                value: `${field} ${operator} ${value}`,  // Keep the structure simple
            };
        }
    }

    console.error('No valid AST could be created for:', ruleString);
    return null;  // Return null if no valid AST can be created
};

// Evaluate rules based on AST and user data
const evaluateRule = (ast, data) => {
    if (!ast) return false; // Handle case where AST is null

    switch (ast.type) {
        case 'operand':
            const [field, operator, val] = ast.value.split(' ').map(part => part.trim());
            const userValue = data[field];
            const parsedVal = parseFloat(val);

            if (userValue === undefined) {
                console.error('Field does not exist in user data:', field);
                return false;  // Field does not exist, cannot evaluate
            }

            switch (operator) {
                case '>':
                    return userValue > parsedVal;
                case '<':
                    return userValue < parsedVal;
                case '=':
                    return userValue == parsedVal; // use loose equality for string comparison
                case '>=':
                    return userValue >= parsedVal;
                case '<=':
                    return userValue <= parsedVal;
                default:
                    return false;
            }
        case 'operator':
            const leftEval = evaluateRule(ast.left, data);
            const rightEval = evaluateRule(ast.right, data);
            if (ast.value === 'AND') return leftEval && rightEval;
            if (ast.value === 'OR') return leftEval || rightEval;
            break;
        default:
            return false;
    }
};

// API to create a rule
app.post('/api/create_rule', async (req, res) => {
    const { rule_string } = req.body;
    const newRule = new Rule({ rule_string });
    await newRule.save();
    res.json(newRule);
});

// API to get all rules
app.get('/api/rules', async (req, res) => {
    const rules = await Rule.find();
    res.json(rules);
});

// API to evaluate rules based on user data
app.post('/api/evaluate_rule', async (req, res) => {
    const { userData } = req.body;
    console.log('Received user data:', userData); // Log for debugging

    try {
        const rules = await Rule.find();
        const results = rules.map(rule => {
            const ast = createAST(rule.rule_string); // Generate AST from rule string
            return {
                rule: rule.rule_string,
                isEligible: evaluateRule(ast, userData), // Evaluate rule against user data
            };
        });
        res.json(results);
    } catch (error) {
        console.error('Error evaluating rules:', error);
        res.status(500).json({ error: 'Failed to evaluate rules.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
