import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function CalculatorScreen() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const currentValue = firstValue || 0;
      const result = calculate(currentValue, inputValue, operator);

      setFirstValue(result);
      setDisplayValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first, second, op) => {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') return second !== 0 ? first / second : 'Error';
    return second;
  };

  const handlePress = (type, value) => {
    if (type === 'digit') inputDigit(value);
    if (type === 'operator') performOperation(value);
    if (type === 'decimal') inputDecimal();
    if (type === 'clear') clearAll();
    if (type === 'equals') performOperation('=');
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>

      <View style={styles.keypadContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => handlePress('clear', 'C')}>
            <Text style={styles.functionButtonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => handlePress('operator', '/')}>
            <Text style={styles.functionButtonText}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => handlePress('operator', '*')}>
            <Text style={styles.functionButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('digit', 7)}><Text style={styles.buttonText}>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('digit', 8)}><Text style={styles.buttonText}>8</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('digit', 9)}><Text style={styles.buttonText}>9</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => handlePress('operator', '-')}><Text style={styles.functionButtonText}>-</Text></TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('digit', 4)}><Text style={styles.buttonText}>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('digit', 5)}><Text style={styles.buttonText}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('digit', 6)}><Text style={styles.buttonText}>6</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => handlePress('operator', '+')}><Text style={styles.functionButtonText}>+</Text></TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('digit', 1)}><Text style={styles.buttonText}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('digit', 2)}><Text style={styles.buttonText}>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('digit', 3)}><Text style={styles.buttonText}>3</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.equalsButton]} onPress={() => handlePress('equals', '=')}><Text style={styles.equalsButtonText}>=</Text></TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => handlePress('digit', 0)}><Text style={styles.buttonText}>0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('decimal', '.')}><Text style={styles.buttonText}>.</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    flex: 2,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '300',
  },
  keypadContainer: {
    flex: 4,
    backgroundColor: '#F5F5F5',
    padding: 10,
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#333333',
    aspectRatio: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  zeroButton: {
    flex: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
  },
  functionButton: {
    backgroundColor: '#FF9500',
  },
  functionButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
  },
  equalsButton: {
    backgroundColor: '#34C759',
  },
  equalsButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});