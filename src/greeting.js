function getGreeting(name) {
  // Convert numbers to string
  if (typeof name === 'number') {
    name = String(name);
  }
  
  // Trim spaces if it's a string
  if (typeof name === 'string') {
    name = name.trim();
  }
  
  // If name is empty after trim (or null/undefined), return only greeting
  if (!name) {
    return "Hello world!";
  }
  
  // Otherwise return greeting with name
  return `Hello world! From ${name}`;
}

module.exports = { getGreeting };
