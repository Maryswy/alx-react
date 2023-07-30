// Function to get the current year
export function getFullYear() {
  return new Date().getFullYear();
}

// Function to get footer copy based on isIndex flag
export function getFooterCopy(isIndex) {
  return isIndex ? "Holberton School" : "Holberton School main dashboard";
}