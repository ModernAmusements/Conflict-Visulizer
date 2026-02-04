# JavaScript Syntax Reference Guide

## Core Syntax Rules

### Function Declarations
```javascript
// Correct
function functionName(param1, param2) {
    // code here
}

// Arrow function
const functionName = (param1, param2) => {
    // code here
};
```

### Variable Declarations
```javascript
// Use const by default
const variable = value;

// Use let when reassignment needed
let counter = 0;
counter++;

// Never use var
```

### Object Properties
```javascript
// Correct object property access
obj.property = value;
obj['property'] = value;

// Destructuring
const { property1, property2 } = obj;
```

### Array Methods
```javascript
// Correct iteration
array.forEach(item => {
    // process item
});

// Correct mapping
const newArray = array.map(item => transformedItem);

// Correct filtering
const filtered = array.filter(item => condition);
```

### Conditional Statements
```javascript
// Always use brackets
if (condition) {
    // code
} else if (otherCondition) {
    // code
} else {
    // code
}

// Ternary for simple cases
const result = condition ? value1 : value2;
```

### Template Literals
```javascript
// Use backticks, not quotes
const template = `Hello ${name}, today is ${date}`;

// Multi-line templates
const multi = `
    Line 1
    Line 2
`;
```

### Event Listeners
```javascript
// Correct syntax
element.addEventListener('click', (event) => {
    // handler code
});
```

### DOM Manipulation
```javascript
// Query selectors
const element = document.querySelector('.class');
const elements = document.querySelectorAll('.class');

// Element creation
const newElement = document.createElement('div');
newElement.textContent = 'content';
parent.appendChild(newElement);
```

### Error Handling
```javascript
try {
    // risky code
} catch (error) {
    console.error('Error:', error);
    // handle error
}
```

### Common Mistakes to Avoid

1. **Missing semicolons** - Always end statements with ;
2. **Undefined variables** - Check if variables exist before use
3. **Type coercion** - Use strict equality ===, !==
4. **Async operations** - Use promises/async-await properly
5. **Scope issues** - Understand let vs const vs var scope
6. **this keyword** - Be careful with this in different contexts

### Leaflet.js Specific
```javascript
// Map initialization
const map = L.map('map').setView([lat, lng], zoom);

// Marker creation
const marker = L.marker([lat, lng]).addTo(map);

// Layer management
const layer = L.layerGroup();
marker.addTo(layer);
```

### String/Number Conversions
```javascript
// String to number
const num = parseInt(str, 10);
const floatNum = parseFloat(str);

// Number to string
const str = num.toString();
```

## Debugging Tips

1. Use `console.log()` for debugging
2. Check browser console for errors
3. Use `typeof` operator to check variable types
4. Validate data before processing

## Code Style
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic
- Use consistent indentation (2 or 4 spaces)
- Follow naming conventions (camelCase for variables/functions)

## Legend Fix Requirements
- Template literals must use proper backtick escaping
- Nested quotes in SVG need double quotes with escape sequences
- Multi-line HTML requires proper string continuation
- JavaScript errors can prevent template literal rendering

## Critical Error Prevention
- **NEVER include raw HTML outside of string literals or template literals**
- **ALL HTML content must be inside backticks (`)**
- **JavaScript syntax errors occur when HTML is mixed with JS code directly**
- **Template literals can only contain valid HTML/JavaScript combinations**
- **Stray closing div tags or other HTML breaks JavaScript execution**

## Global

```javascript
'use strict';
```

- Semicolons are mandatory
- Explicit code only
- Fail fast (throw errors)

---

## Variables

```javascript
const value = 1;

let counter = 0;
counter += 1;
```

❌ Forbidden
```javascript
var x;
```

---

## Functions

```javascript
function fn(a, b) {
    return a + b;
}

const fnArrow = (a, b) => {
    return a + b;
};
```

Rules:
- Block bodies only
- Explicit `return`
- No implicit `this`

---

## Arrays

```javascript
array.forEach((item) => {
    doSideEffect(item);
});

const mapped = array.map((item) => {
    return transform(item);
});

const filtered = array.filter((item) => {
    return condition(item) === true;
});
```

❌ Forbidden
```javascript
array.map(async () => {});
```

---

## Conditionals

```javascript
if (value === true) {
    doThing();
} else {
    throw new Error('Unhandled case');
}

const result = condition === true ? a : b;
```

Rules:
- No truthy/falsy checks
- Always handle default case

---

## DOM

```javascript
const el = document.querySelector('.x');
if (!el) {
    throw new Error('Element not found');
}
```

---

## Async

```javascript
async function load(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Request failed');
    }
    return await res.json();
}
```

Rules:
- async/await only
- No `.then()`

---

## Equality

```javascript
===
!==
```

---

## Hard Bans

```javascript
var
==
!=
if (x) {}
implicit return
.then()
this
```
