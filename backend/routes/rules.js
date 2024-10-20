const express = require('express');
const router = express.Router();
const Rule = require('../models/Rule');

function create_rule(rule_string) {
    const operators = {
        'AND': 'operator',
        'OR': 'operator',
        '>': 'operand',
        '<': 'operand',
        '=': 'operand',
    };

    const tokens = rule_string.match(/\w+|\S/g); 
    const stack = [];

    tokens.forEach(token => {
        if (operators[token]) {
            const right = stack.pop();
            const left = stack.pop();
            const node = { type: "operator", value: token, left, right };
            stack.push(node);
        } else {
            const node = { type: "operand", value: token };
            stack.push(node);
        }
    });

    return stack[0]; 
}

// API to create a new rule and generate the AST
router.post('/', async (req, res) => {
    const { rule_string } = req.body;
    const ast = create_rule(rule_string); 
    const rule = new Rule({ ruleString: rule_string, ast });
    await rule.save();
    res.status(201).json(rule);
});

// API to evaluate a rule against user data
router.post('/evaluate', (req, res) => {
    const { ast, data } = req.body;
    const result = evaluate_rule(ast, data);
    res.status(200).json({ eligible: result });
});

// Evaluate rule against user data
function evaluate_rule(ast, data) {
    if (ast.type === "operand") {
        const [field, operator, comparison] = ast.value.split(" "); // e.g. "age > 30"
        switch (operator) {
            case '>':
                return data[field] > parseInt(comparison);
            case '<':
                return data[field] < parseInt(comparison);
            case '=':
                return data[field] === comparison.replace(/'/g, "");
            default:
                return false;
        }
    }

    if (ast.type === "operator") {
        const leftEval = evaluate_rule(ast.left, data);
        const rightEval = evaluate_rule(ast.right, data);
        switch (ast.value) {
            case 'AND':
                return leftEval && rightEval;
            case 'OR':
                return leftEval || rightEval;
            default:
                return false;
        }
    }
}

module.exports = router;
