// src/Calculator.js
import React, { useState } from 'react';
import axios from 'axios';

const Calculator = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [result, setResult] = useState(null);
    const [operation, setOperation] = useState('add');

    const handleCalculate = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/calculator/${operation}`, {
                params: { a, b }
            });
            setResult(response.data);
        } catch (error) {
            alert('Error performing calculation: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Calculator</h1>
            <div>
                <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="A" />
                <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="B" />
            </div>
            <div>
                <select value={operation} onChange={e => setOperation(e.target.value)}>
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                    <option value="multiply">Multiply</option>
                    <option value="divide">Divide</option>
                </select>
            </div>
            <button onClick={handleCalculate}>Calculate</button>
            {result !== null && <h2>Result: {result}</h2>}
        </div>
    );
};

export default Calculator;
