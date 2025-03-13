// Beispiel für eine absichtlich schadhafte JavaScript-Datei

// 1. SQL-Injection (unsichere Eingabe in eine SQL-Abfrage)
const username = req.body.username;
const password = req.body.password;
const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`; // Schwachstelle: SQL-Injection

// 2. Cross-Site Scripting (XSS) - unsichere Verwendung von Benutzereingaben in HTML
const userInput = req.body.userInput;
document.getElementById("output").innerHTML = userInput; // Schwachstelle: XSS

// 3. Unsichere Speicherung von Passwörtern
const passwordPlain = "password123"; // Schwachstelle: Klartext-Passwort
const hashedPassword = bcrypt.hashSync(passwordPlain, 10); // Soll ein gehashtes Passwort sein, aber hier verwenden wir das Original-Passwort

// 4. Unsichere Verwendung von eval()
const userInputEval = req.body.userInput;
eval(userInputEval); // Schwachstelle: eval() mit Benutzereingaben

// 5. Unsichere Verwendung von untrusted Content (z. B. mit eval())
const maliciousScript = '<img src="x" onerror="alert(\'Hacked!\')">';
eval(maliciousScript); // Schwachstelle: Verwendung von eval() für untrusted Content

// 6. Fehlende Validierung von Benutzereingaben
const age = req.body.age;
if (age > 18) {
  // Einige Logik hier...
} // Schwachstelle: Keine Validierung, was zu potentiellen Fehlern führen könnte

// 7. Unsichere Nutzung von externen Bibliotheken (unsichere Version)
const axios = require('axios');
axios.get('https://example.com').then(response => {
  console.log(response.data);
}); // Schwachstelle: Möglicherweise eine unsichere Version von axios verwenden

// 8. Verwendung von unsicheren Funktionen (window.eval)
window.eval('console.log("unsafe code")'); // Schwachstelle: eval() auf Client-Seite
