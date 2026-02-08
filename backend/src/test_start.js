
console.log("TEST: Node is working correctly");
try {
  require("dotenv").config();
  console.log("TEST: dotenv loaded");
} catch (e) {
  console.error("TEST: dotenv failed", e);
}
