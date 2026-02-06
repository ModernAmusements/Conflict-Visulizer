# AI JavaScript Ruleset

Strict validation rules for all JavaScript code generation. Code must pass ALL checks before output.

## 2026-Conflict Project Specific Requirements

### Map Loading and Symbol Rendering
- **No Symbol Repetition**: Prevent blue dots and national flags from repeating in linear patterns during load/initialization
- **Clean Map Loading**: Ensure map loads cleanly without tiling artifacts or symbol repetition
- **1994 NATO Standards**: Display standard 1994 NATO symbology correctly on both map and legend
- **Complete Symbol Reference**: All enhanced/advanced NATO symbols must be fully visible and properly referenced in legend

### Flag System Requirements
- **Enhanced Scaling**: Scale national flags larger for clear legibility at default zoom levels
- **No Linear Patterns**: Prevent flags from creating linear repetition patterns during initialization
- **Proper Spacing**: Ensure flags are positioned with adequate spacing to prevent visual clutter
- **Enhanced Visibility**: Flags should have thicker borders (2px), white glow effects, and rounded corners
- **Size Optimization**: Flag sizes should range from 24-36px depending on zoom level for better visibility

### Military Movement Visualization
- **Thin Line Rendering**: Military movement lines must be thinner and visually subordinate to terrain and unit symbols
- **Directional Arrows**: All movement lines must include directional arrows indicating advance/withdrawal direction
- **Visual Hierarchy**: Movement lines should not interfere with other map elements

### UI Integration Requirements
- **National Forces Integration**: Relocate National Forces panel into Legend Options panel as selectable subsection
- **1994-Era Styling**: Apply functional, restrained design aesthetic without modern UI embellishments
- **Coherent Hierarchy**: Maintain logical UI structure with proper panel organization

### Performance Requirements
- **No JavaScript Errors**: Critical requirement - any JS errors will result in no reward
- **Clean Initialization**: Map must load cleanly without visual artifacts
- **Symbol Integrity**: All symbols must render properly without duplication or tiling issues

### Legend System Requirements
- **Default Content**: Dropdown legends must show actual content on load, not placeholder messages
- **Function Calls**: Always call the actual legend generation function (e.g., `generateMilitarySymbolsLegend()`) on initialization
- **Never use placeholder text** like "Enhanced NATO symbols legend is displayed in main panel" - this indicates missing implementation

### Timeline Slider Requirements
- **Tick Marks**: Generate tick marks dynamically from event years in `timelineEvents` array
- **Snap-to-Tick**: Slider should snap to nearest event year when within 3 years during user interaction
- **Active Highlighting**: Current year tick should be visually emphasized
- **Decade Labels**: Show labels for decade years (1900, 1910, 1920, etc.)
- **Responsive**: Tick positions must recalculate on window resize

### Detection Logic Requirements
- **False Positive Prevention**: Pattern matching for nation detection must be specific to avoid false matches
  - Example: `'un '` matches words like "run", "sun", "tunnel" - use `'united nations'` or specific context like `'un resolution'`
- **Nation Detection**: Only flag nations when there's clear evidence in event text, not fuzzy matches

### Dropdown Initialization Pattern
```javascript
// VALID: Call actual legend function on init
dropdown.addEventListener('change', (e) => {
    switch(e.target.value) {
        case 'enhanced':
            contentArea.innerHTML = generateMilitarySymbolsLegend();
            break;
        // ... other cases
    }
});

// Show enhanced option by default
contentArea.innerHTML = generateMilitarySymbolsLegend();

// INVALID: Show placeholder message instead of actual content
contentArea.innerHTML = '<div class="note">Enhanced NATO symbols legend is displayed in main panel</div>';
```

### Military Movement Visualization
- **Thin Line Rendering**: Military movement lines must be thinner and visually subordinate to terrain and unit symbols
- **Directional Arrows**: All movement lines must include directional arrows indicating advance/withdrawal direction
- **Visual Hierarchy**: Movement lines should not interfere with other map elements

### UI Integration Requirements
- **National Forces Integration**: Relocate National Forces panel into Legend Options panel as selectable subsection
- **1994-Era Styling**: Apply functional, restrained design aesthetic without modern UI embellishments
- **Coherent Hierarchy**: Maintain logical UI structure with proper panel organization

### Performance Requirements
- **No JavaScript Errors**: Critical requirement - any JS errors will result in no reward
- **Clean Initialization**: Map must load cleanly without visual artifacts
- **Symbol Integrity**: All symbols must render properly without duplication or tiling issues

---

## 1. File Structure Requirements

| Requirement | Valid | Invalid |
|------------|-------|---------|
| First line | `'use strict';` | Anything else |
| Statement endings | Semicolons `;` | ASI reliance |
| File type | Pure JS only | HTML outside template literals |

---

## 2. Forbidden Constructs

**REJECT immediately if any appear (outside comments):**

| Token | Reason |
|-------|--------|
| `var` | Use `const` or `let` |
| `==` or `!=` | Use `===` or `!==` |
| `this` | Avoid context binding |
| `async` / `await` | Not permitted |
| `.then(` | No promise chains |
| `import` / `export` | Not permitted |
| `require(` | Not permitted |

---

## 3. Variable Rules

**MUST follow all:**

- [ ] Declared with `const` or `let`
- [ ] Declared before first use
- [ ] Never redeclared in same scope
- [ ] No implicit globals

**Invalid patterns:**
```javascript
x = 1;                    // Missing declaration
const x = 2; const x = 3; // Redeclaration
```

---

## 4. Function Rules

**MUST follow all:**

- [ ] Uses braces `{}` (no implicit returns)
- [ ] Has explicit `return` statement
- [ ] Not called before declaration
- [ ] No reliance on hoisting

**Invalid patterns:**
```javascript
const f = x => x + 1;           // Implicit return
const result = add(1, 2);       // Called before declaration
```

**Valid patterns:**
```javascript
const add = (a, b) => {
  return a + b;
};

const myFunc = () => {
  console.log('hello');
};
```

---

## 5. Control Flow Rules

**MUST follow all:**

- [ ] All `if`/`else` blocks use braces `{}`
- [ ] Conditions use explicit comparisons (`===`, `!==`)
- [ ] No truthy/falsy reliance

**Invalid patterns:**
```javascript
if (x) {}              // Implicit boolean
if (x == y) {}         // Use ===
```

**Valid patterns:**
```javascript
if (x === true) {}
if (x !== null && x !== undefined) {}
```

---

## 6. Template Literal Rules

**When string contains `<` or `>`:**

- [ ] Must be a template literal (backticks)
- [ ] Must be assigned to a variable
- [ ] Must be properly closed

**Invalid:**
```javascript
<div></div>
```

**Valid:**
```javascript
const html = `<div></div>`;
const item = `<li>${name}</li>`;
```

---

## 7. Object & Array Rules

**MUST follow all:**

- [ ] No mutation during iteration
- [ ] No sparse arrays
- [ ] No prototype access
- [ ] Dynamic keys documented if used

---

## 8. Runtime Safety Rules

**MUST follow all:**

- [ ] No silent failures
- [ ] No empty catch blocks
- [ ] Errors logged or rethrown

**Invalid:**
```javascript
try {
  // code
} catch (e) {
  // Empty
}
```

**Valid:**
```javascript
try {
  // code
} catch (e) {
  console.error(e);
}
```

---

## 9. Pre-Output Checklist

**Before emitting ANY JavaScript, answer YES to each:**

### Syntax
- [ ] File starts with `'use strict';`
- [ ] Every statement ends with `;`
- [ ] Zero syntax errors in strict mode

### Variables
- [ ] All variables use `const` or `let`
- [ ] All variables declared before use
- [ ] No redeclarations in same scope
- [ ] No implicit globals

### Functions
- [ ] All functions defined before called
- [ ] Arrow functions use braces `{}`
- [ ] All returns are explicit
- [ ] No reliance on hoisting

### Control Flow
- [ ] All `if`/`else` use `{}`
- [ ] All comparisons use `===` or `!==`
- [ ] No truthy/falsy shorthand

### HTML/SVG
- [ ] All HTML in template literals
- [ ] Template literals properly closed
- [ ] No stray tags or backticks

### Forbidden
- [ ] No `var`
- [ ] No `==` or `!=`
- [ ] No `this`
- [ ] No `async`/`await`
- [ ] No `.then()`
- [ ] No `import`/`export`

### Readability
- [ ] One statement per line
- [ ] 4-space indentation
- [ ] No clever shortcuts
- [ ] Clarity over brevity

**If ANY answer is NO → regenerate code**

---

## 10. Final Validation Gate

Code is VALID only if it can be:
1. Pasted directly into browser console
2. Executed without warnings
3. Understood without guessing intent

**Otherwise → reject and regenerate**

---

## Quick Reference

```
FORBIDDEN: var, ==, !=, this, async, await, .then(, import, export, require(

REQUIRED: 'use strict';, semicolons, const/let, braces {}, explicit returns

VALIDATION: Browser console execution, no warnings, human readable
```

---

## 11. Syntax Zero-Tolerance Rules

**AI must NEVER generate syntax errors. These rules are absolute.**

### 11.1 Bracket & Brace Matching

**MUST verify before output:**

| Opening | Must Close | Example |
|---------|-------------|---------|
| `(` | `)` | `const x = (a + b) * c;` |
| `[` | `]` | `const arr = [1, 2, 3];` |
| `{` | `}` | `const obj = { a: 1 };` |
| `` ` `` | `` ` `` | `` const tpl = `text`; `` |
| `"` | `"` | `const str = "hello";` |
| `'` | `'` | `const str = 'hello';` |

**Never generate:**
```javascript
const broken = { a: 1;       // Missing }
const broken2 = [1, 2, 3;    // Missing ]
const broken3 = (a + b;      // Missing )
```

---

### 11.2 Statement Termination

**Every statement MUST end with `;`:**

**Never generate:**
```javascript
const x = 1
const y = 2
// ASI may fail in edge cases
```

**Always generate:**
```javascript
const x = 1;
const y = 2;
```

---

### 11.3 Operator Spacing

**REQUIRED spacing around operators:**

| Operator | Example |
|----------|---------|
| `=` | `const x = 5;` (space before and after) |
| `+` | `const sum = a + b;` |
| `-` | `const diff = a - b;` |
| `*` | `const prod = a * b;` |
| `/` | `const quot = a / b;` |
| `===` | `if (a === b) {}` |
| `!==` | `if (a !== b) {}` |
| `<=` | `if (a <= b) {}` |
| `>=` | `if (a >= b) {}` |

**Never generate:**
```javascript
const x=5;           // No spaces
const y=a+b;         // Missing spaces
if(x===y){}          // No spaces
```

**Always generate:**
```javascript
const x = 5;
const y = a + b;
if (x === y) {}
```

---

### 11.4 Comma & Colon Spacing

| Context | Valid | Invalid |
|---------|-------|---------|
| Object colons | `{ a: 1 }` | `{ a:1 }` |
| Object commas | `{ a: 1, b: 2 }` | `{ a: 1,b: 2 }` |
| Array commas | `[1, 2, 3]` | `[1,2,3]` |

---

### 11.5 Parenthesis Rules

**Function calls MUST have parentheses (even with no args):**

**Valid:**
```javascript
myFunction();
console.log('hello');
```

**Invalid:**
```javascript
myFunction;    // Reference without calling
```

**Conditionals MUST wrap comparisons in parentheses:**

**Valid:**
```javascript
if (x === 5) {}
while (count < 10) {}
```

**Invalid:**
```javascript
if x === 5 {}     // Missing parentheses
while count < 10 {}  // Missing parentheses
```

---

### 11.6 String Literal Rules

**Never mix quote types in same file (pick one):**

**Valid (double quotes):**
```javascript
const msg = "Hello World";
```

**Valid (single quotes):**
```javascript
const msg = 'Hello World';
```

**Invalid (mixed):**
```javascript
const msg = "Hello World';
```

**Template literals MUST use backticks only:**
```javascript
const greeting = `Hello ${name}`;  // Valid
const greeting = "Hello ${name}";  // Invalid - interpolation won't work
```

---

### 11.7 Array & Object Literal Validation

**No trailing comma before closing bracket:**

| Valid | Invalid |
|-------|---------|
| `[1, 2, 3]` | `[1, 2, 3,]` |
| `{ a: 1 }` | `{ a: 1, }` |

**No sparse arrays:**
```javascript
const arr = [1, , 3];  // Invalid - sparse
const arr = [1, 2, 3]; // Valid
```

---

### 11.8 Function Definition Rules

**Named functions MUST use function keyword OR const with arrow:**

```javascript
// Valid
function myFunc() {
  return 1;
}

const myFunc = function() {
  return 1;
};

const myFunc = () => {
  return 1;
};
```

**Never generate:**
```javascript
const myFunc = () => 1;     // Implicit return not allowed
function (x) { return x; } // Anonymous function declaration
```

---

### 11.9 Regex Literal Rules

**Regex MUST be properly escaped:**

**Valid:**
```javascript
const regex = /^[a-z]+$/;
const regex = new RegExp('\\d+');
```

**Never generate:**
```javascript
const regex = /[/;     // Unterminated
```

---

### 11.10 Semicolon Insertion Prevention

**NEITHER use ASI (Automatic Semicolon Insertion) NOR rely on it:**

```javascript
// Invalid - relies on ASI
const func = () => {
  return
    { value: 1 };
}

// Valid
const func = () => {
  return { value: 1 };
}

// Invalid - could fail with minification
const x = 1
const y = 2

// Valid
const x = 1;
const y = 2;
```

---

## 12. Syntax Pre-Flight Checklist

**Before outputting ANY code, verify:**

- [ ] All brackets `()`, `[]`, `{}` are balanced
- [ ] All quotes `"`, `'`, `` ` `` are matched
- [ ] Every statement ends with `;`
- [ ] All operators have surrounding spaces
- [ ] All function calls have `()`
- [ ] All conditions have `()`
- [ ] No trailing commas
- [ ] No implicit returns
- [ ] No ASI reliance
- [ ] Object/array literals properly closed
- [ ] Template literals properly closed

**Run browser console check:**
```javascript
// Test in console before output:
try {
  eval(yourCode);
  console.log('✓ Syntax valid');
} catch (e) {
  console.error('✗ Syntax error:', e.message);
  // FIX before outputting
}
```

**If ANY check fails → DO NOT output, fix first**

---

## 26. Dependency Management Rules

### 26.1 External Dependencies

**MUST verify external dependencies exist:**

```javascript
// Valid - Check if external class exists
if (typeof ExternalLibrary !== 'undefined') {
    const instance = new ExternalLibrary();
} else {
    console.warn('ExternalLibrary not available');
    // Fallback behavior
}

// Invalid - Assume external class exists
const instance = new ExternalLibrary(); // Could throw error
```

### 26.2 Safe Class Instantiation

**MUST wrap class instantiation in try-catch:**

```javascript
// Valid
let symbol = null;
if (typeof NATOSymbolLibrary !== 'undefined') {
    try {
        const library = new NATOSymbolLibrary();
        symbol = library.createSymbol('infantry', 'neutral');
    } catch (error) {
        console.warn('Symbol creation failed:', error);
        symbol = null;
    }
}

// Invalid
const library = new NATOSymbolLibrary(); // May not exist
const symbol = library.createSymbol('infantry', 'neutral');
```

### 26.3 Undefined Class Reference Prevention

**MUST prevent ReferenceError from undefined classes:**

**Rules:**
- [ ] Check `typeof ClassName !== 'undefined'` before use
- [ ] Use try-catch around class instantiation
- [ ] Provide fallback behavior when class not available
- [ ] Log warnings for missing dependencies

**Invalid Pattern:**
```javascript
const factory = new MilitarySymbolFactory(); // ReferenceError if not defined
```

**Valid Pattern:**
```javascript
let factory = null;
if (typeof MilitarySymbolFactory !== 'undefined') {
    try {
        factory = new MilitarySymbolFactory();
    } catch (error) {
        console.warn('MilitarySymbolFactory unavailable:', error);
        factory = null;
    }
}
```

**Pre-Flight Checklist for External Classes:**
- [ ] Class exists in loaded scripts
- [ ] Class constructor is accessible
- [ ] Required methods are available
- [ ] Fallback behavior implemented
- [ ] Error handling in place

---

## 27. Integration & Timing Rules

### 27.1 HTML-CSS-JS Connectivity

**MUST ensure proper integration between all files:**

**HTML Structure Requirements:**
- [ ] All CSS files linked in `<head>` before any `<script>` tags
- [ ] All JavaScript files linked at end of `<body>` in correct dependency order
- [ ] IDs and classes referenced in JS exist in HTML
- [ ] Event listeners attached after DOM is ready

**CSS-JS Coordination:**
- [ ] CSS classes referenced in JS exist in stylesheets
- [ ] Dynamic styling uses valid CSS properties
- [ ] Media queries don't conflict with JS manipulation
- [ ] CSS animations work with JS timing

**Invalid Pattern:**
```javascript
// CSS class doesn't exist
element.classList.add('nonexistent-class');

// HTML element doesn't exist
document.getElementById('missing-element').addEventListener('click', handler);

// Script loaded before CSS
<script src="script.js"></script>
<link rel="stylesheet" href="styles.css">
```

**Valid Pattern:**
```javascript
// Verify CSS class exists
if (document.querySelector('.timeline-event')) {
    element.classList.add('timeline-event');
}

// Verify HTML element exists
const element = document.getElementById('timeline');
if (element) {
    element.addEventListener('click', handler);
}

// Correct loading order
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="timeline"></div>
    <script src="script.js"></script>
</body>
```

### 27.2 Script Loading Order

**MUST load dependencies in correct sequence:**

```html
<!-- VALID: Dependencies loaded first -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <main>
        <div id="app"></div>
    </main>
    
    <!-- Load in dependency order -->
    <script src="libraries.js"></script>     <!-- Third-party -->
    <script src="symbols.js"></script>        <!-- Base classes -->
    <script src="flags.js"></script>         <!-- Depends on symbols.js -->
    <script src="clustering-system.js"></script> <!-- Depends on both -->
    <script src="script.js"></script>         <!-- Main application -->
</body>

<!-- INVALID: Wrong order or missing dependencies -->
<script src="script.js"></script>           <!-- Tries to use undefined classes -->
<script src="symbols.js"></script>          <!-- Loaded too late -->
```

### 27.3 Function Call Timing

**MUST call functions at appropriate lifecycle stages:**

**DOM-Ready Pattern:**
```javascript
// VALID: Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// VALID: Use defer attribute
<script defer src="script.js"></script>

// INVALID: Assume DOM is ready
const element = document.getElementById('app'); // May be null
element.addEventListener('click', handler);
```

**Async Data Pattern:**
```javascript
// VALID: Handle async loading
async function initializeApp() {
    try {
        const data = await loadData();
        processData(data);
        renderUI();
    } catch (error) {
        handleError(error);
    }
}

// INVALID: Assume data is loaded
const data = loadData(); // Returns Promise
renderUI(data); // Uses undefined data
```

### 27.4 Event Listener Lifecycle

**MUST attach and remove listeners properly:**

```javascript
// VALID: Attach after element exists
function setupEventListeners() {
    const element = document.getElementById('button');
    if (element) {
        element.addEventListener('click', handleClick);
    }
}

// VALID: Remove when cleaning up
function cleanup() {
    const element = document.getElementById('button');
    if (element) {
        element.removeEventListener('click', handleClick);
    }
}

// INVALID: Attach to non-existent element
document.getElementById('missing-button').addEventListener('click', handler);
```

### 27.5 CSS-JS Synchronization

**MUST coordinate styling between CSS and JS:**

```css
/* styles.css */
.timeline-event {
    transition: opacity 0.3s ease;
}

.timeline-event.hidden {
    opacity: 0;
    pointer-events: none;
}
```

```javascript
// script.js
// VALID: Use existing CSS classes
function hideEvent(element) {
    if (element && element.classList) {
        element.classList.add('hidden');
    }
}

// INVALID: Override CSS styles directly
function hideEvent(element) {
    element.style.opacity = '0';
    element.style.pointerEvents = 'none'; // Won't work with camelCase
}
```

### 27.6 Module Dependency Verification

**MUST verify all modules are loaded before use:**

```javascript
// VALID: Check module availability
const initializeModules = () => {
    const modules = {
        NATOSymbolLibrary: typeof NATOSymbolLibrary !== 'undefined',
        FlagRenderer: typeof FlagRenderer !== 'undefined',
        Leaflet: typeof L !== 'undefined'
    };
    
    const missingModules = Object.entries(modules)
        .filter(([name, available]) => !available)
        .map(([name]) => name);
    
    if (missingModules.length > 0) {
        console.error('Missing modules:', missingModules);
        return false;
    }
    
    console.log('All modules loaded successfully');
    return true;
};

// VALID: Initialize after verification
if (initializeModules()) {
    initializeApp();
}

// INVALID: Assume modules are loaded
const natoLibrary = new NATOSymbolLibrary(); // ReferenceError
```

### 27.7 Integration Pre-Flight Checklist

**Before running application, verify ALL:**

### HTML Structure
- [ ] All required CSS files linked in `<head>`
- [ ] All script files linked at end of `<body>`
- [ ] Script loading order respects dependencies
- [ ] All IDs referenced in JS exist in HTML
- [ ] All classes referenced in JS exist in CSS

### CSS-JS Coordination  
- [ ] CSS classes used in JS are defined in stylesheets
- [ ] Dynamic styling uses valid CSS properties
- [ ] CSS transitions work with JS timing
- [ ] Media queries don't break JS functionality

### Function Timing
- [ ] DOM is ready before accessing elements
- [ ] Async operations complete before using data
- [ ] Event listeners attached after elements exist
- [ ] Cleanup functions called when needed

### Module Loading
- [ ] All external modules are loaded and accessible
- [ ] Dependency order is correct
- [ ] Fallback behavior for missing modules
- [ ] Error handling for module failures

### Runtime Validation
- [ ] No undefined class references
- [ ] No undefined element references
- [ ] No undefined CSS class references
- [ ] All event listeners properly attached
- [ ] All async operations handled correctly

**Invalid:**
```javascript
const x = 'John';                    // Undescriptive
const d = new Date();                // Too short
const usrnm = 'John';                // Unreadable abbreviation
const class = 'myClass';             // Reserved word
```

---

### 15.2 Function Names

**MUST follow these patterns:**

| Pattern | Example | Use For |
|---------|---------|---------|
| camelCase | `function calculateTotal() {}` | Regular functions |
| camelCase | `const getData = () => {}` | Arrow functions |
| is/has prefix | `const isValid = (x) => {}` | Boolean return functions |
| get prefix | `const getUserName = () => {}` | Getter functions |
| set prefix | `const setUserName = (name) => {}` | Setter functions |

**Rules:**
- [ ] Verb + noun pattern (e.g., `calculateTotal`, `fetchData`)
- [ ] Action clearly describes what function does
- [ ] No generic names like `doSomething()`, `handleIt()`

**Valid:**
```javascript
function calculateTotalPrice(items) {}
const isUserLoggedIn = () => {};
const getUserById = (id) => {};
const saveToDatabase = (data) => {};
```

**Invalid:**
```javascript
function do() {}                     // Too generic
const handle = (x) => {}             // Unclear action
function process(data) {}            // Vague
```

---

### 15.3 Class Names

**MUST use PascalCase:**

```javascript
class UserController {}
class DataProcessor {}
class ApiService {}
```

**Invalid:**
```javascript
class userController {}   // Not PascalCase
class data_processor {}  // Not PascalCase
```

---

### 15.4 File Names

**MUST follow these patterns:**

| Pattern | Example | Use For |
|---------|---------|---------|
| kebab-case | `user-service.js` | General files |
| PascalCase | `UserController.js` | Class files |
| camelCase | `getUser.js` | Utility/helper files |

**Invalid:**
```javascript
UserService.js        // Not kebab-case
user_service.js       // Not kebab-case
getuser.js            // Too terse
```

---

## 16. Comments & Documentation

### 16.1 When to Comment

**MUST comment for:**

| Situation | Example |
|-----------|---------|
| Complex logic | `// Calculate compound interest with monthly compounding` |
| Business logic | `// Apply 15% discount for orders over $100` |
| Workarounds | `// FIX: Temporary hack until API is fixed` |
| TODOs | `// TODO: Refactor when time permits` |
| Non-obvious fixes | `// This fixes the race condition in Chrome` |

**MUST NOT comment for:**

- Obvious code (`const x = 1; // x equals 1`)
- Commented-out code (delete instead)
- TODO comments without description

---

### 16.2 JSDoc Requirements

**MUST use JSDoc for:**

- Public APIs
- Exported functions
- Complex functions (3+ parameters)
- Functions returning non-obvious types

**Template:**
```javascript
/**
 * Calculates the total price including tax and discounts.
 * @param {number} subtotal - The pre-tax amount
 * @param {number} taxRate - Tax rate as decimal (0.08 = 8%)
 * @param {number} [discount=0] - Discount amount to subtract
 * @returns {number} Final calculated price
 * @throws {Error} If subtotal is negative
 */
const calculateTotal = (subtotal, taxRate, discount = 0) => {
  // ...
};
```

**Minimal for simple functions:**
```javascript
/**
 * Validates email format.
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  return email.includes('@');
};
```

---

### 16.3 Inline Comments

**Rules for inline comments:**

- [ ] Use `//` for single line
- [ ] Space after `//` (`// comment`, not `//comment`)
- [ ] Capitalize first letter
- [ ] Explain WHY, not WHAT
- [ ] Maximum 2-3 words per inline comment

**Valid:**
```javascript
const items = [];

// Fetch data from API
const data = await fetchData();

// Handle empty state (API returns null for no items)
if (data && data.items) {
  items.push(...data.items);
}
```

**Invalid:**
```javascript
const items = [];//Create array
//This code fetches data - it gets data from the API
const data = await fetchData();
```

---

### 16.4 Comment Formatting

**Block comments for multi-line:**
```javascript
/*
 * This is a block comment.
 * It spans multiple lines.
 * Use for section headers or detailed explanations.
 */
```

**Never generate:**
```javascript
/* This is a
   multi-line comment
   with bad formatting */
```

---

## 17. Error Handling

### 17.1 Try-Catch Rules

**MUST follow these patterns:**

```javascript
try {
  // Code that might throw
  const result = riskyOperation();
  return result;
} catch (error) {
  // Handle or rethrow
  console.error('Operation failed:', error);
  throw new Error('Operation failed', { cause: error });
}
```

**Never generate:**
```javascript
try {
  // code
} catch (e) {
  // Empty - silent failure
}

try {
  // code
} catch (e) {
  return null;  // Swallowing error
}
```

---

### 17.2 Error Types

**MUST use specific error types:**

```javascript
// Valid error types
throw new Error('Message');
throw new TypeError('Expected number');
throw new RangeError('Value out of bounds');
throw new SyntaxError('Invalid format');
throw new ReferenceError('Undefined variable');
throw new CustomError('Message', { code: 'ERR_CODE' });
```

**Invalid:**
```javascript
throw 'error message';           // String not Error
throw 404;                       // Number not Error
throw null;                      // Null not Error
```

---

### 17.3 Custom Error Definition

**Pattern for custom errors:**

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.code = 'VALIDATION_ERROR';
  }
}

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = 'API_ERROR';
  }
}
```

---

### 17.4 Error Propagation

**Rules for error handling:**

- [ ] Never swallow errors silently
- [ ] Add context to rethrown errors
- [ ] Use custom errors for domain-specific failures
- [ ] Log errors with sufficient context

**Valid:**
```javascript
try {
  const user = await fetchUser(id);
  return processUser(user);
} catch (error) {
  if (error instanceof ValidationError) {
    throw new ApiError(`Invalid user data: ${error.message}`, 400);
  }
  console.error('User fetch failed:', { id, error: error.message });
  throw error;
}
```

---

### 17.5 Promise Error Handling

**MUST handle promise rejections:**

```javascript
// Valid - catch all rejections
fetchData()
  .then(processData)
  .catch(handleError);

// Valid - async/await (but async/await forbidden by Section 2)
async function getData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Invalid - unhandled rejection
fetchData().then(processData);
```

---

### 17.6 Async Error Boundaries

**MUST validate async operations:**

```javascript
const fetchWithTimeout = async (url, timeoutMs) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new ApiError(`HTTP ${response.status}`, response.status);
    }
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
};
```

---

## 18. Performance Rules

### 18.1 Loop Optimization

**MUST use efficient loops:**

| Pattern | When to Use |
|---------|-------------|
| `for` loop | When index needed, known count |
| `for...of` | Iterating arrays/iterables |
| `for...in` | Iterating object keys only |
| `Array.forEach` | Simple iteration (no break) |

**Valid:**
```javascript
// Fastest for arrays with known length
for (let i = 0; i < items.length; i++) {
  process(items[i]);
}

// Clean iteration
for (const item of items) {
  process(item);
}

// Object keys only
for (const key in object) {
  if (object.hasOwnProperty(key)) {
    process(object[key]);
  }
}
```

**Invalid:**
```javascript
// forEach cannot break
items.forEach((item, index) => {
  if (condition) {
    return;  // Only exits callback, not loop
  }
});

// for...in for arrays (slow, includes prototype properties)
for (const index in items) {
  // Bad for arrays
}
```

---

### 18.2 Memoization

**For expensive computations:**

```javascript
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Usage
const expensiveCalc = memoize((n) => {
  return fibonacci(n);
});
```

---

### 18.3 Debouncing & Throttling

**For frequent events:**

```javascript
// Debounce - execute after delay
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Throttle - execute at most once per interval
const throttle = (fn, interval) => {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn(...args);
    }
  };
};
```

---

### 18.4 Memory Management

**MUST avoid memory leaks:**

```javascript
// Valid - clean up references
const cache = new Map();

const addToCache = (key, value) => {
  cache.set(key, value);
  // Set expiration
  setTimeout(() => {
    cache.delete(key);
  }, 5 * 60 * 1000);
};

// Valid - clean up event listeners
const setupHandler = () => {
  const handler = () => { /* ... */ };
  element.addEventListener('click', handler);
  return () => element.removeEventListener('click', handler);
};

// Valid - WeakMap for object keys
const privateData = new WeakMap();
class MyClass {
  constructor() {
    privateData.set(this, { secret: 'data' });
  }
}
```

**Invalid:**
```javascript
// Memory leak - growing array
const cache = [];
cache.push(item);  // Never removed

// Memory leak - orphaned listeners
element.addEventListener('click', handler);
// When element removed, listener still exists
```

---

### 18.5 DOM Optimization

**Batch DOM operations:**

```javascript
// Valid - DocumentFragment for multiple inserts
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const el = document.createElement('div');
  el.textContent = item.name;
  fragment.appendChild(el);
});
document.body.appendChild(fragment);

// Valid - Clone template
const template = document.getElementById('item-template');
const clone = template.content.cloneNode(true);
clone.querySelector('.title').textContent = 'New Title';
document.body.appendChild(clone);
```

**Invalid:**
```javascript
// Bad - multiple reflows
items.forEach(item => {
  document.body.appendChild(createElement(item));  // Each append causes reflow
});
```

---

## 19. Security Rules

### 19.1 Input Validation

**MUST validate all inputs:**

```javascript
const validateInput = (input, schema) => {
  for (const [field, rules] of Object.entries(schema)) {
    const value = input[field];
    
    if (rules.required && (value === null || value === undefined)) {
      throw new ValidationError(`${field} is required`, field);
    }
    
    if (rules.type && typeof value !== rules.type) {
      throw new ValidationError(`${field} must be ${rules.type}`, field);
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      throw new ValidationError(`${field} format invalid`, field);
    }
  }
};

// Usage
validateInput(formData, {
  email: { required: true, type: 'string', pattern: /@/ },
  age: { required: false, type: 'number' }
});
```

---

### 19.2 Sanitization

**MUST sanitize user input:**

```javascript
// HTML entity escaping
const escapeHtml = (str) => {
  const map = {
    '&': '&amp;',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;'
  };
  return str.replace(/[&<>"']/g, m => map[m]);
};

// URL encoding
const encodeUrlParam = (param) => encodeURIComponent(param);

// Safe template usage
const userInput = escapeHtml(dangerousString);
const html = `<div class="user-content">${userInput}</div>`;
```

**Invalid:**
```javascript
// Never use eval
eval(userInput);                    // FORBIDDEN

// Never use innerHTML with user input
element.innerHTML = userInput;      // Dangerous

// Never use document.write
document.write(html);               // Bad practice
```

---

### 19.3 XSS Prevention

**Rules:**

- [ ] Never use `innerHTML` with unsanitized input
- [ ] Use `textContent` instead of `innerHTML` for text
- [ ] Sanitize HTML before using `innerHTML`
- [ ] Use `textContent` for dynamic text

**Valid:**
```javascript
// Safe - textContent for text
element.textContent = userText;

// Safe - escaped HTML
element.innerHTML = escapeHtml(userHtml);

// Safe - template literals for fixed content
const html = `<div class="safe">${escapeHtml(userContent)}</div>`;
```

**Invalid:**
```javascript
element.innerHTML = userProvidedHtml;           // XSS risk
element.innerHTML = `<div>${userInput}</div>`;  // XSS risk
```

---

### 19.4 Security Headers

**When setting up pages/APIs:**

```javascript
// CSP meta tag
const cspMeta = document.createElement('meta');
cspMeta.httpEquiv = 'Content-Security-Policy';
cspMeta.content = "default-src 'self'; script-src 'self' https://trusted.cdn.com";
document.head.appendChild(cspMeta);

// X-Frame-Options
const frameOptions = document.createElement('meta');
frameOptions.httpEquiv = 'X-Frame-Options';
frameOptions.content = 'DENY';
document.head.appendChild(frameOptions);
```

---

### 19.5 Sensitive Data

**Rules:**

- [ ] Never log sensitive data
- [ ] Mask data in logs
- [ ] Use environment variables for secrets
- [ ] Never commit secrets to version control

**Valid:**
```javascript
// Mask in logs
const maskSensitive = (data) => {
  const masked = { ...data };
  if (masked.password) masked.password = '***';
  if (masked.creditCard) masked.creditCard = '****-****-****-1234';
  return masked;
};

console.log('User update:', maskSensitive(userData));
```

**Invalid:**
```javascript
console.log('Password:', password);              // Exposed
console.log('Full user:', user);                 // May contain sensitive data
localStorage.setItem('token', sensitiveToken);   // Not secure
```

---

### 19.6 Forbidden Security Patterns

**NEVER generate:**

| Pattern | Reason | Safe Alternative |
|---------|--------|------------------|
| `eval()` | Code injection | `JSON.parse()` for data |
| `setInterval(() => eval(...))` | Code injection | Message passing |
| `document.write()` | Blocking, XSS | DOM manipulation |
| `innerHTML` with input | XSS | `textContent`, sanitization |
| `window.location` with input | Open redirect | Validate against whitelist |
| `new Function()` | Code injection | Direct function |
| Hardcoded secrets | Exposure | Environment variables |

---

## 20. DOM Manipulation

### 20.1 Element Selection

**MUST use efficient selectors:**

| Method | Use When |
|--------|----------|
| `getElementById()` | ID (fastest) |
| `querySelector()` | Class, attribute, complex |
| `querySelectorAll()` | Multiple elements |
| `getElementsByClassName()` | Live class collection |
| `getElementsByTagName()` | Tag name collection |

**Valid:**
```javascript
const element = document.getElementById('myId');
const button = document.querySelector('.btn-submit');
const items = document.querySelectorAll('.list-item');
```

**Invalid:**
```javascript
const element = document.querySelector('#myId');    // ID - use getElementById
const element = document.getElementsByTagName('div')[0];  // Too verbose
```

---

### 20.2 DOM Creation

**Pattern for creating elements:**

```javascript
// Valid - createElement with textContent
const createDiv = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = 'my-class';
  return div;
};

// Valid - template cloning
const cloneTemplate = (data) => {
  const template = document.getElementById('item-template');
  const clone = template.content.cloneNode(true);
  clone.querySelector('.name').textContent = data.name;
  clone.querySelector('.value').textContent = data.value;
  return clone;
};
```

---

### 20.3 Event Handling

**MUST use addEventListener:**

```javascript
// Valid - proper event handling
const handleClick = (event) => {
  event.preventDefault();
  console.log('Clicked:', event.target);
  event.stopPropagation();
};

element.addEventListener('click', handleClick);

// Valid - remove listener when done
const setupButton = () => {
  const handler = () => { /* ... */ };
  element.addEventListener('click', handler);
  return () => element.removeEventListener('click', handler);
};

// Valid - event delegation
list.addEventListener('click', (event) => {
  if (event.target.matches('.item')) {
    handleItemClick(event.target);
  }
});
```

**Invalid:**
```javascript
element.onclick = handler;                    // Overwrites other handlers
event.returnValue = false;                     // Use preventDefault()
return false;                                  // Not reliable in listeners
```

---

### 20.4 DOM State Management

**Safe state updates:**

```javascript
// Valid - batch updates
const updateUi = (data) => {
  requestAnimationFrame(() => {
    nameElement.textContent = data.name;
    valueElement.textContent = data.value;
  });
};

// Valid - use data attributes
const setData = (element, key, value) => {
  element.dataset[key] = value;
};

const getData = (element, key) => {
  return element.dataset[key];
};
```

---

### 20.5 DOM Traversal

**Safe traversal methods:**

```javascript
// Valid - use closest for ancestors
const findAncestor = (element, selector) => {
  return element.closest(`.${selector}`);
};

// Valid - use children for direct descendants
const getDirectChildren = (parent) => {
  return Array.from(parent.children);
};

// Valid - use nextElementSibling
const getNextItem = (element) => {
  return element.nextElementSibling;
};
```

---

## 21. Code Organization

### 21.1 File Structure

**Recommended structure:**

```
/src
  /constants
    index.js
    config.js
  /utils
    stringUtils.js
    arrayUtils.js
  /services
    apiService.js
    storageService.js
  /components
    Button.js
    Modal.js
  /hooks
    useData.js
  index.js          // Entry point
```

---

### 21.2 Function Length

**Rules:**

- [ ] Maximum 20-30 lines per function
- [ ] Single responsibility per function
- [ ] Extract sub-tasks into helper functions
- [ ] Early returns for validation

**Valid:**
```javascript
const processUserData = (user) => {
  // Validation (5 lines)
  if (!user || !user.id) {
    return null;
  }

  // Transform (5 lines)
  const transformed = {
    id: user.id,
    displayName: `${user.firstName} ${user.lastName}`,
  };

  // Enrich (5 lines)
  enriched.lastLogin = new Date();

  return enriched;
};
```

**Invalid:**
```javascript
const processUserData = (user) => {
  // 100+ lines doing everything
};
```

---

### 21.3 Code Blocks

**Maximum complexity per block:**

```javascript
// Valid - simple conditions
if (isValid) {
  doSomething();
}

// Valid - early returns reduce nesting
const process = (data) => {
  if (!data) {
    return null;
  }
  
  if (data.status === 'pending') {
    return handlePending(data);
  }
  
  if (data.status === 'complete') {
    return handleComplete(data);
  }
  
  return handleUnknown(data);
};
```

---

### 21.4 Extraction Patterns

**When to extract to helper functions:**

| Situation | Example |
|-----------|---------|
| Repeated code | `formatDate()` used 3+ times |
| Complex logic | `calculateDiscount()` with 20+ lines |
| Business rules | `isEligibleForPromo()` |
| Validation | `validateInput()` |

**Pattern:**
```javascript
// Main function
const processOrder = (order) => {
  if (!validateOrder(order)) {
    return { error: 'Invalid order' };
  }
  
  const discount = calculateDiscount(order);
  const total = applyDiscount(order, discount);
  
  return { total, discount };
};

// Helper functions
const validateOrder = (order) => {
  return order && order.items && order.items.length > 0;
};

const calculateDiscount = (order) => {
  // Discount logic
};

const applyDiscount = (order, discount) => {
  // Apply discount logic
};
```

---

## 22. Type Safety

### 22.1 Null/Undefined Handling

**MUST handle null/undefined explicitly:**

```javascript
// Valid - explicit null checks
const getValue = (obj) => {
  if (obj === null || obj === undefined) {
    return defaultValue;
  }
  return obj.value;
};

// Valid - optional chaining
const getName = (user) => {
  return user?.profile?.name ?? 'Anonymous';
};

// Valid - nullish coalescing
const configValue = userConfig.timeout ?? 3000;

// Valid - guard clauses
const process = (data) => {
  if (!data) {
    return null;
  }
  // proceed with data
};
```

**Invalid:**
```javascript
const name = user.profile.name;  // Potential null reference
const value = arr[0] + 1;        // arr might be empty
```

---

### 22.2 Type Coercion

**MUST avoid implicit coercion:**

```javascript
// Valid - explicit conversion
const num = Number(str);
const str = String(num);
const bool = Boolean(value);

// Valid - explicit comparison
if (typeof value === 'string') {
  // ...
}

// Invalid
if (value == true) {}     // Use ===
if (value + 1 == 2) {}    // Implicit coercion
if ([] == true) {}        // Unexpected behavior
```

---

### 22.3 Array Access

**Safe array access:**

```javascript
// Valid - check length first
const getFirstItem = (arr) => {
  if (arr && arr.length > 0) {
    return arr[0];
  }
  return null;
};

// Valid - use at() with fallbacks
const getItem = (arr, index) => {
  return arr?.[index] ?? null;
};

// Valid - slice for safe access
const safeGet = (arr, index) => {
  return (arr || [])[index];
};
```

---

### 22.4 Object Safety

**Safe object access:**

```javascript
// Valid - check existence
const getCity = (user) => {
  if (user && user.address && user.address.city) {
    return user.address.city;
  }
  return 'Unknown';
};

// Valid - optional chaining
const getCity = (user) => {
  return user?.address?.city ?? 'Unknown';
};

// Valid - hasOwnProperty
const hasKey = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
```

---

### 22.5 Function Parameter Validation

**Validate function inputs:**

```javascript
/**
 * Safely processes user data.
 * @param {Object} user - User object
 * @param {string} user.name - User name (required)
 * @param {number} user.age - User age (required)
 * @returns {Object|null}
 */
const processUser = (user) => {
  // Type check
  if (typeof user !== 'object' || user === null) {
    return null;
  }
  
  // Required fields
  if (typeof user.name !== 'string') {
    return null;
  }
  
  if (typeof user.age !== 'number' || Number.isNaN(user.age)) {
    return null;
  }
  
  // Process
  return {
    name: user.name,
    isAdult: user.age >= 18
  };
};
```

---

## 23. Loop Rules

### 23.1 Loop Structure

**MUST use proper loop constructs:**

```javascript
// for loop - when index needed
for (let i = 0; i < items.length; i++) {
  process(items[i]);
}

// for...of - iterating values
for (const item of items) {
  process(item);
}

// for...in - object keys only
for (const key in object) {
  if (Object.prototype.hasOwnProperty.call(object, key)) {
    process(object[key]);
  }
}

// while - condition-based
let count = 0;
while (count < max) {
  process(count);
  count++;
}
```

**Invalid:**
```javascript
// Don't iterate arrays with for...in
for (const index in items) {
  // Wrong for arrays
}
```

---

### 23.2 Break/Continue

**Proper loop control:**

```javascript
// Valid - break on condition
for (const item of items) {
  if (item.isEnd) {
    break;
  }
  process(item);
}

// Valid - continue to skip
for (const item of items) {
  if (item.skip) {
    continue;
  }
  process(item);
}

// Valid - labeled break for nested
outerLoop: for (const group of groups) {
  for (const item of group.items) {
    if (item.found) {
      break outerLoop;
    }
  }
}
```

---

### 23.3 Loop Performance

**Optimize inner operations:**

```javascript
// Valid - cache length
for (let i = 0, len = items.length; i < len; i++) {
  process(items[i]);
}

// Valid - avoid repeated property access
const users = data.users;
for (let i = 0, len = users.length; i < len; i++) {
  process(users[i].profile);
}

// Valid - use reverse loop for removal
for (let i = items.length - 1; i >= 0; i--) {
  if (items[i].shouldRemove) {
    items.splice(i, 1);
  }
}
```

**Invalid:**
```javascript
// Length calculated each iteration
for (let i = 0; i < items.length; i++) {
  // items.length accessed every iteration
}
```

---

### 23.4 Array Methods

**Choose right method:**

| Method | Use For |
|--------|---------|
| `forEach` | Simple iteration, no break |
| `map` | Transform each element |
| `filter` | Select subset |
| `reduce` | Aggregate to single value |
| `find` | Find first match |
| `findIndex` | Find first index |
| `some` | Any match? |
| `every` | All match? |
| `includes` | Value exists? |

```javascript
// Valid - map for transformation
const names = users.map(user => user.name);

// Valid - filter for selection
const adults = users.filter(user => user.age >= 18);

// Valid - reduce for aggregation
const total = items.reduce((sum, item) => sum + item.price, 0);

// Valid - find for lookup
const user = users.find(u => u.id === userId);
```

---

## 24. Logging & Debugging

### 24.1 Console Usage

**Use appropriate console methods:**

| Method | Use For |
|--------|---------|
| `console.log()` | General output |
| `console.error()` | Errors |
| `console.warn()` | Warnings |
| `console.info()` | Information |
| `console.debug()` | Debug output (hidden by default) |
| `console.table()` | Tabular data |
| `console.group()` | Grouped output |
| `console.time()` | Timing operations |

**Valid:**
```javascript
console.log('Processing items:', items.length);
console.error('Failed to fetch:', error.message);
console.warn('Deprecated function used');
console.table(userList);
console.time('fetchData');
const data = await fetchData();
console.timeEnd('fetchData');
```

---

### 24.2 Debug Statements

**Pattern for debug logging:**

```javascript
// Valid - structured debug
const debug = (label, data) => {
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[DEBUG] ${label}:`, data);
  }
};

// Usage
debug('User update', { id, changes: maskSensitive(changes) });
```

---

### 24.3 Error Logging

**Comprehensive error logging:**

```javascript
const logError = (context, error, metadata = {}) => {
  console.error({
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    ...metadata
  });
};

// Usage
try {
  // risky operation
} catch (error) {
  logError('UserService.update', error, { userId, inputData });
  throw error;
}
```

---

### 24.4 Performance Logging

**Track performance:**

```javascript
const measure = (name, fn) => {
  console.time(name);
  const result = fn();
  console.timeEnd(name);
  return result;
};

// Usage
const data = measure('API fetch', () => fetch(url).then(r => r.json()));
```

---

### 24.5 Logging Best Practices

**Rules:**

- [ ] Never log sensitive data (passwords, tokens, credit cards)
- [ ] Use structured objects for logs
- [ ] Include context (user, action, timestamp)
- [ ] Remove debug logs in production code
- [ ] Use environment checks for debug logs

**Valid:**
```javascript
const log = (level, message, context = {}) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context
  };
  
  if (level === 'error') {
    console.error(entry);
  } else {
    console.log(entry);
  }
};

// Mask sensitive data
const safeLog = (user) => {
  log('info', 'User action', {
    userId: user.id,
    email: user.email?.replace(/.(?=.{2}@)/g, '*'),  // Partial mask
    action: 'login'
  });
};
```

---

## 25. Final Compliance Checklist

**Before outputting ANY JavaScript, verify ALL:**

### Syntax (Sections 1-14)
- [ ] Passes all syntax validation rules
- [ ] No forbidden constructs
- [ ] Proper spacing and formatting
- [ ] Balanced brackets and quotes

### Variables (Section 3)
- [ ] All declared with const/let
- [ ] Descriptive names
- [ ] No redeclarations

### Functions (Section 4)
- [ ] Explicit returns
- [ ] Named functions before calls
- [ ] Proper JSDoc documentation

### Control Flow (Section 5)
- [ ] Braces on all blocks
- [ ] Explicit comparisons

### Security (Section 19)
- [ ] No eval() or dangerous patterns
- [ ] Input sanitized
- [ ] Sensitive data masked in logs

### Performance (Section 18)
- [ ] Efficient loops
- [ ] No memory leaks
- [ ] Optimized DOM operations

### Code Quality (Section 21)
- [ ] Functions reasonable length
- [ ] Single responsibility
- [ ] Well-commented complex logic

### Type Safety (Section 22)
- [ ] Null checks
- [ ] No implicit coercion
- [ ] Safe array/object access

### Testing (Section 14)
- [ ] Can run in browser console
- [ ] No warnings or errors

**If ANY check fails → DO NOT output, fix first**

---

## 27. SCSS Guidelines

### 27.1 File Structure

```
scss/
├── styles.scss        # Main entry point
├── _variables.scss   # Design tokens (colors, spacing, breakpoints)
└── _mixins.scss      # Reusable style patterns
```

### 27.2 Variables (`scss/_variables.scss`)

**MUST define for:**

```scss
// NATO Affiliation Colors
$nato-friendly: #0066CC;
$nato-hostile: #CC0000;
$neutral: #00AA00;
$unknown: #FFAA00;

// Nation Colors
$israel-color: #0038B8;
$palestine-color: #009C48;

// Theme Colors
$bg-primary: #0a0a0a;
$bg-secondary: #1a1a2e;
$text-primary: #e8e8e8;
$text-secondary: #a0a0a0;

// Spacing
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;

// Breakpoints
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

### 27.3 Mixins (`scss/_mixins.scss`)

**Common patterns to extract:**

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin btn-primary {
  padding: 0.5rem 1rem;
  background: $nato-friendly;
  color: white;
  border-radius: 8px;
  transition: all 0.3s ease;
}

@mixin respond-to($breakpoint) {
  @if $breakpoint == 'md' {
    @media (min-width: $breakpoint-md) { @content; }
  }
}
```

### 27.4 Main Entry (`scss/styles.scss`)

```scss
@use 'variables' as *;
@use 'mixins' as *;

// Base styles
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// Component styles
.class-name {
  @include flex-center;
  color: $text-primary;
  
  &:hover {
    color: $nato-friendly;
  }
  
  @include respond-to('md') {
    flex-direction: row;
  }
}
```

### 27.5 SCSS to CSS Migration Process

1. **Copy** original CSS to `scss/styles.scss`
2. **Extract** variables → `_variables.scss`
3. **Extract** mixins → `_mixins.scss`
4. **Convert** nesting where appropriate
5. **Replace** hardcoded values with variables
6. **Test** in dev server (`npm run dev`)
7. **Build** for production (`npm run build`)

### 27.6 Nesting Rules

**ALLOWED - Logical component nesting:**
```scss
.card {
  background: $bg-secondary;
  
  &-header {
    padding: $spacing-md;
  }
  
  &-body {
    padding: $spacing-lg;
  }
}
```

**AVOID - Over-nesting (max 3-4 levels):**
```scss
// Bad - too deeply nested
.parent {
  .child {
    .inner {
      .deep {
        color: red;
      }
    }
  }
}
```

### 27.7 Vite Integration

**Commands:**
```bash
npm run dev      # Development with hot reloading
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run legacy   # Python server (no SCSS)
```

### 27.8 Migration Checklist

- [ ] Variables defined in `_variables.scss`
- [ ] Mixins extracted to `_mixins.scss`
- [ ] `@use` statements at top of `styles.scss`
- [ ] Hardcoded colors replaced with variables
- [ ] Hardcoded spacing replaced with variables
- [ ] Hardcoded breakpoints replaced with variables
- [ ] Build succeeds (`npm run build`)
- [ ] Dev server works (`npm run dev`)
- [ ] Styles render correctly in browser

---

*Last updated: 2026*
*Version: 2.0*

---

## 28. 2026-Conflict Project Knowledge Base

### 28.1 Project Structure

```
2026-Conflict/
├── scss/                          # SCSS stylesheets
│   ├── styles.scss               # Main entry point
│   ├── _variables.scss           # Design tokens
│   ├── _mixins.scss              # Reusable mixins
│   └── components/
│       ├── _text.scss           # Typography
│       └── _map.scss            # Map styles
├── js/
│   ├── script.js                 # Main application (~3500 lines)
│   └── components/
│       ├── symbols.js           # NATO symbol library
│       ├── flags.js             # Flag rendering system
│       └── clustering-system.js # Event clustering
├── index.html                    # Main HTML
├── package.json                  # Vite configuration
└── dist/                         # Production build output
```

### 28.2 Script Loading Order (CRITICAL)

**Must load in this exact order:**

```html
<!-- CSS -->
<link rel="stylesheet" href="scss/styles.scss">

<!-- JavaScript - LOAD ORDER MATTERS -->
<script src="js/components/symbols.js"></script>        <!-- Base: NATOSymbolLibrary -->
<script src="js/components/flags.js"></script>          <!-- Depends: FlagSystem -->
<script src="js/components/clustering-system.js"></script> <!-- Depends: Both above -->
<script src="js/script.js"></script>                    <!-- Main: Uses all above -->
```

**Why order matters:**
- `symbols.js` defines `NATOSymbolLibrary` class
- `flags.js` depends on symbol library
- `clustering-system.js` uses both symbols and flags
- `script.js` orchestrates everything

### 28.3 Global State Objects

**mapState** (in script.js):
```javascript
mapState = {
    map: Leaflet map instance,
    currentYear: 1994,
    isPlaying: false,
    playInterval: timer reference,
    playSpeed: 1000,
    showAttacks: true,
    showPolitical: true,
    showSocial: true,
    showTerritory: true,
    showSettlements: true,
    showCities: true,
    showMovements: true
};
```

**clusterState** (in clustering-system.js):
```javascript
clusterState = {
    enabled: true,
    showFlags: true,
    markerSize: 20,
    minClusterSize: 2,
    clusterRadius: 50
};
```

**window.FlagSystem** (class in flags.js):
```javascript
class FlagSystem {
    nations = {
        israel, palestine, egypt, syria, jordan,
        lebanon, usa, uk, un
    };

    getFlagElement(nation, size) // Returns SVG flag HTML
    getNationColor(nation) // Returns hex color
}
```

### 28.4 Event Data Structure

```javascript
{
    date: "1994",              // Single year or "1900-1917" range
    title: "Event Title",
    description: "Description",
    category: "military|political|social",
    era: "1987-2005",
    impact: "Impact description",
    geography: {
        type: "attack|territory|political",
        coordinates: [lat, lng],
        affectedArea: [[lat1, lng1], [lat2, lng2]],
        intensity: "high|medium|low"
    },
    territoryControl: { israeli: 85, palestinian: 15 },
    casualties: { /* detailed casualty counts */ },
    militaryClassification: { /* NATO classification */ },
    movementData: { /* Military movement routes */ }
}
```

### 28.5 Key Functions and Their Locations

**Timeline Slider Functions** (script.js ~line 2300):
```javascript
initializeTimelineTicks()  // Create tick marks on load
getEventYears()            // Extract years from timelineEvents
findNearestEventYear()     // Snap to nearest event
createTickMarks()          // Generate DOM elements
updateActiveTickMarks()    // Highlight current year
handleSliderChange()       // User interaction handler
```

**Legend Functions** (script.js ~line 1750):
```javascript
createLegacyLegend()           // Creates dropdown legend
generateMilitarySymbolsLegend() // NATO symbols reference
generateTerritoryLegend()      // Territory control colors
generateMilitaryFactionsLegend() // Faction icons
generateNationalForcesLegend()  // Flag badges
generateEventTypesLegend()      // Event type icons
```

**Flag Functions** (flags.js):
```javascript
getFlagElement(nation, size)  // Enhanced visibility flags
getNationColor(nation)         // Color for UI
createFlagLegend(nation)       // Legend entry
generateFlagLegends()           // All nations
```

**Map Functions** (script.js ~line 2500):
```javascript
initializeMap()           // Setup Leaflet map
setupMapControls()        // Event listeners
updateMapForYear()       // Render events for year
startMapAnimation()       // Play through years
createFlagOverlayForEvent() // Add flags to markers
```

### 28.6 Common Patterns and Fixes

#### Pattern: Legend Dropdown Default Content
**Problem**: Showing placeholder message instead of actual content

**Correct:**
```javascript
dropdown.addEventListener('change', (e) => {
    switch(e.target.value) {
        case 'enhanced':
            contentArea.innerHTML = generateMilitarySymbolsLegend();
            break;
    }
});

// Show enhanced option by default
contentArea.innerHTML = generateMilitarySymbolsLegend();
```

**Incorrect:**
```javascript
contentArea.innerHTML = '<div class="note">Enhanced NATO symbols legend is displayed in main panel</div>';
```

#### Pattern: Nation Detection False Positives
**Problem**: Simple string matching catches unintended words

**Correct:**
```javascript
// Check for UN with specific context
if (eventText.includes('united nations') ||
    (eventText.includes('un ') && (eventText.includes('resolution') ||
                                    eventText.includes('peace') ||
                                    eventText.includes('security council')))) {
    nations.push('un');
}
```

**Incorrect:**
```javascript
// Matches "run", "sun", "tunnel", etc.
if (eventText.includes('un ')) {
    nations.push('un');
}
```

#### Pattern: Flag Sizing and Visibility
**Problem**: Flags too small or hard to see

**Correct:**
```javascript
// Larger sizes for better visibility
let flagSize = 28; // Base size
if (currentZoom >= 10) {
    flagSize = 36;
} else if (currentZoom >= 8) {
    flagSize = 32;
}

// Enhanced styling
return `
    <div style="width: ${size}px; height: ${size * 0.67}px;">
        <div style="border: 2px solid rgba(255,255,255,0.8);
                    border-radius: 3px;
                    box-shadow: 0 3px 8px rgba(0,0,0,0.5);">
            ${flagSVG}
        </div>
    </div>
`;
```

### 28.7 Known Issues and Workarounds

1. **Timeline Slider Snap Behavior**
   - When dragging, slider snaps to nearest event year within 3 years
   - Animation uses `_isProgrammatic` flag to bypass snap behavior
   - Fix: Set `slider._isProgrammatic = true` before programmatic updates

2. **Flag False Positives on Load**
   - UN flags appear on unrelated events due to "un " matching
   - Workaround: Use specific context matching (see 28.6 Pattern above)
   - Long-term fix: Add explicit nation flags to event data structure

3. **Legend Default Content**
   - Placeholder messages appearing instead of actual legend content
   - Cause: Setting innerHTML to note instead of calling generation function
   - Fix: Always call `generateXxxLegend()` functions on initialization

### 28.8 CSS Classes for Dynamic Content

**Timeline Slider:**
- `.timeline-slider-container` - Main container
- `.slider-track-container` - Tick mark container
- `.slider-tick-mark` - Individual tick
- `.slider-tick-label` - Decade year label
- `.active` - Highlighted state

**Flags:**
- `.flag-icon-enhanced` - Flag container
- `.flag-wrapper` - Flag with border/shadow
- `.event-flag-item` - Flag on marker

**Map Markers:**
- `.enhanced-military-marker` - Main marker div
- `.nato-symbol-wrapper` - Symbol container
- `.flag-badge` - Flag attached to marker

**Legends:**
- `.military-map-legend` - Main legend panel
- `.legend-dropdown` - Dropdown selector
- `.legend-content-area` - Content display area
- `.legacy-map-legend` - Left-side legacy legend

### 28.9 Development Workflow

1. **Start dev server:**
   ```bash
   npm run dev
   # Opens at http://localhost:3000
   ```

2. **Test changes:**
   - Make changes in source files
   - Vite HMR auto-refreshes browser
   - Check browser console for errors

3. **Build for production:**
   ```bash
   npm run build
   # Outputs to dist/
   ```

4. **Verify build:**
   ```bash
   npm run preview
   # Preview production build
   ```

### 28.10 Debugging Tips

**Check if classes exist:**
```javascript
typeof NATOSymbolLibrary !== 'undefined'  // Symbol library loaded
typeof FlagSystem !== 'undefined'           // Flag system loaded
typeof clusterState !== 'undefined'         // Clustering initialized
mapState.map instanceof L.Map              // Map initialized
```

**Debug flag detection:**
```javascript
const nations = detectInvolvedNations(event);
console.log('Detected nations:', nations, 'from text:', eventText);
```

**Debug tick marks:**
```javascript
const ticks = document.querySelectorAll('.slider-tick-mark');
console.log('Tick marks found:', ticks.length);
```

**Debug legend:**
```javascript
const content = document.querySelector('#legend-content-area');
console.log('Legend content:', content.innerHTML.substring(0, 100));
```

### 28.11 Event Cluster Badge Pattern

**Problem**: Dense clusters (100+ events) show overlap message but individual markers aren't visible

**Solution**: Use count badge for large clusters, spiral offset for small clusters

**Threshold Constant:**
```javascript
const CLUSTER_COUNT_THRESHOLD = 10;
```

**Marker Creation Logic:**
```javascript
function drawAllEventMarkers(events) {
    const eventGroups = groupEventsByCoordinates(events);

    eventGroups.forEach(group => {
        // Large clusters: use count badge marker
        if (group.length >= CLUSTER_COUNT_THRESHOLD) {
            const badgeMarker = createClusterCountMarker(group, coords);
            badgeMarker.addTo(mapState.markerLayer);
            return;
        }

        // Small clusters: use spiral offset
        group.forEach((event, index) => {
            const offset = getSpiralOffset(index, group.length);
            // create marker...
        });
    });
}
```

**Badge Marker Creation:**
```javascript
function createClusterCountMarker(group, coordinates) {
    const count = group.length;
    const symbolData = natoSymbolLibrary.generateSymbol('hostile', 'infantry', 'unit');
    const badgeHtml = `<div class="cluster-count-badge">${count}</div>`;

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.innerHTML = symbolData.html + badgeHtml;

    const icon = L.divIcon({
        html: wrapper.innerHTML,
        className: 'cluster-marker',
        iconSize: [48, 48]
    });

    const marker = L.marker(coordinates, { icon });
    marker.on('click', () => openEventSidePanel(group));
    return marker;
}
```

**Side Panel with Auto-scroll:**
```javascript
function openEventSidePanel(eventGroup) {
    const panel = document.createElement('div');
    panel.id = 'event-side-panel';
    panel.innerHTML = `
        <div class="panel-header">
            <h3>📍 ${eventGroup.length} Events</h3>
            <button onclick="this.closest('#event-side-panel').remove()">✕</button>
        </div>
        <div class="panel-content" id="panel-scroll-content">
            ${eventGroup.map(event => `
                <div class="panel-event">
                    <strong>${event.title}</strong>
                    <span class="event-date">${event.date}</span>
                </div>
            `).join('')}
        </div>
    `;
    document.body.appendChild(panel);

    // Auto-scroll to top
    setTimeout(() => {
        document.getElementById('panel-scroll-content')?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
}
```

**CSS Requirements:**
```scss
.cluster-count-badge {
    position: absolute;
    bottom: -8px;
    right: -8px;
    background: #e74c3c;
    color: white;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    cursor: pointer;
    transition: all 0.2s ease;
}

.cluster-count-badge:hover {
    background: #c0392b;
    transform: scale(1.15);
}

#event-side-panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 380px;
    max-width: 90vw;
    background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%);
    border-left: 1px solid rgba(255,255,255,0.2);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.3s ease;
}
```

**Behavior Summary:**
| Cluster Size | Display | Interaction |
|-------------|---------|-------------|
| 1 event | Single NATO symbol | Click for popup |
| 2-9 events | Spiral offset markers | Click popup shows "X events nearby" |
| 10+ events | Count badge | Click opens side panel |

### 28.12 Event Hierarchy & Marker Spacing Pattern

**Problem**: Old spiral used only 3 positions then switched to random (inconsistent), spacing too tight (0.008°), no priority system

**Solution**: Hierarchical priority-based positioning with zoom-aware scaling

**Priority Scoring:**
```javascript
function calculateEventPriority(event) {
    let score = 0;

    const casualties = event.casualties?.totalCasualties || 0;
    score += casualties * 100;

    const impact = event.impact?.toLowerCase() || '';
    if (impact.includes('major') || impact.includes('significant')) {
        score += 30;
    } else if (impact.includes('moderate')) {
        score += 20;
    } else {
        score += 10;
    }

    const year = parseInt(event.date?.split('-')[0]) || 2000;
    score += ((year - 1900) / 125) * 5;

    if (event.title?.toLowerCase().includes('hamas attack')) {
        score += 25;
    }

    return score;
}
```

**Hierarchical Spiral Offset:**
```javascript
function getHierarchicalOffset(index, total, zoomLevel = 7) {
    if (total === 1) {
        return { latOffset: 0, lngOffset: 0, priority: 0 };
    }

    const baseSpacing = 0.015;
    const zoomScale = Math.max(0.5, Math.min(2, zoomLevel / 7));
    const spacing = baseSpacing * zoomScale;

    const angleStep = Math.PI * 2 / Math.min(total, 8);
    const radiusIncrement = spacing;

    const angle = index * angleStep;
    const radius = spacing + (index * radiusIncrement * 0.3);

    return {
        latOffset: Math.sin(angle) * radius,
        lngOffset: Math.cos(angle) * radius,
        priority: total - index
    };
}
```

**Event Sorting:**
```javascript
function sortEventsByPriority(events) {
    return [...events].sort((a, b) => {
        const priorityA = calculateEventPriority(a);
        const priorityB = calculateEventPriority(b);
        return priorityB - priorityA;
    });
}
```

**Cluster Threshold:**
```javascript
const CLUSTER_COUNT_THRESHOLD = 5;
```

**Marker Sizing Based on Priority:**
```javascript
const priority = calculateEventPriority(event);
const isHighPriority = priority > 50;
const iconSize = isHighPriority ? 52 : 44;
const flagSize = isHighPriority ? 36 : 28;
```

**Key Improvements:**
| Aspect | Old Value | New Value |
|--------|-----------|-----------|
| Cluster threshold | 10 events | 5 events |
| Base spacing | 0.008° | 0.015° |
| Spiral positions | 3 + random | 8 consistent |
| Zoom scaling | None | 0.5x - 2x |
| Priority system | None | Numeric scoring |
| High priority size | 48px | 52px |
| Low priority size | 48px | 44px |

---

*Knowledge base last updated: February 2026*
*Project: 2026-Conflict Timeline Visualization*

---

## 29. Marker Clickability & Overlap Prevention

### 29.1 Marker Spacing Rules

**Problem**: Overlapping markers make underlying elements unreachable with mouse clicks.

**Solution**: Increased base spacing and proper z-index layering.

**Spiral Offset Parameters:**
```javascript
function getHierarchicalOffset(index, total, zoomLevel = 7) {
    if (total === 1) {
        return { latOffset: 0, lngOffset: 0, priority: 0 };
    }

    const baseSpacing = 0.025; // ~2.5km at zoom 7 (increased from 0.015)
    const zoomScale = Math.max(0.5, Math.min(2, zoomLevel / 7));
    const spacing = baseSpacing * zoomScale;

    const angleStep = Math.PI * 2 / Math.min(total, 8);
    const radiusIncrement = spacing;

    const angle = index * angleStep;
    const radius = spacing + (index * radiusIncrement * 0.5);

    return {
        latOffset: Math.sin(angle) * radius,
        lngOffset: Math.cos(angle) * radius,
        priority: total - index
    };
}
```

**Spacing Guidelines:**
| Setting | Value | Rationale |
|---------|--------|-----------|
| Base spacing | 0.025° | ~2.5km, prevents overlap |
| Angle step | 360° / min(total, 8) | Even distribution |
| Radius increment | spacing × 0.5 | Gradual spread |
| Max spiral positions | 8 | Prevents excessive spread |

### 29.2 Z-Index Layering

**CSS Rules for Clickability:**
```scss
// Markers must be clickable
.enhanced-military-marker-clean,
.basic-marker-icon-clean,
.cluster-marker {
    cursor: pointer !important;
}

// Hover brings marker to front
.enhanced-military-marker-clean:hover,
.basic-marker-icon-clean:hover,
.cluster-marker:hover {
    z-index: 2000 !important;
    transform: scale(1.15);
}

// Flags must never block clicks
.event-flag-beside {
    z-index: -1 !important;
    pointer-events: none !important;
}
```

**Z-Index Stack:**
| Element | z-index | Purpose |
|---------|---------|---------|
| Markers (default) | auto | Base layer |
| Markers (hover) | 2000 | Click feedback |
| Flag overlays | -1 | Behind markers |
| Popups | auto | Leaflet managed |
| Side panel | 10000 | Topmost |

### 29.3 Clickability Checklist

**Before deploying marker changes:**
- [ ] Test clicking markers in dense clusters
- [ ] Verify hover states show visual feedback
- [ ] Ensure flags don't block marker clicks
- [ ] Check all markers have cursor: pointer
- [ ] Verify z-index layering doesn't trap elements

### 29.4 Leaflet Z-Index Override Pattern

**Problem**: Leaflet sets inline `z-index` styles that override CSS rules.

**Solution**: Use JavaScript mouseover/mouseout to modify inline styles:

```javascript
marker.on('mouseover', function() {
    if (this._icon) {
        this._icon.style.zIndex = '9999';
    }
    if (this._shadow) {
        this._shadow.style.zIndex = '9998';
    }
});

marker.on('mouseout', function() {
    if (this._icon) {
        this._icon.style.zIndex = 'auto';
    }
    if (this._shadow) {
        this._shadow.style.zIndex = 'auto';
    }
});
```

**CSS for Fallback:**
```scss
.leaflet-marker-icon:hover {
    z-index: 9999 !important;
}
```

---

*Ruleset section added: February 2026*

