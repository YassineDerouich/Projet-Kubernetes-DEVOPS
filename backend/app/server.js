const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// RÈGLE DE SÉCURITÉ (Fail Fast) : On crash l'application si les secrets ne sont pas injectés.
if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  console.error("🔥 ERREUR FATALE : Les variables d'environnement DB_USER et DB_PASSWORD sont manquantes.");
  console.error("Vérifiez la synchronisation avec Vault / External Secrets Operator.");
  process.exit(1); // Arrête le conteneur K8s avec une erreur (CrashLoopBackOff)
}

// Configuration de la connexion
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// --- LOGS DE VÉRIFICATION DE CONNEXION AU DÉMARRAGE ---
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error("❌ ERREUR : Impossible de se connecter à PostgreSQL au démarrage.");
    console.error(`Détails : ${err.message}`);
  } else {
    console.log("✅ CONNEXION RÉUSSIE : La base de données répond correctement.");
    console.log(`Serveur distant (timestamp) : ${res.rows[0].now}`);
  }
});

app.get('/', (req, res) => {
  res.send({ status: 'Backend Node.js Opérationnel 🚀' });
});

// Dans ton server.js, simplifie la route :
app.get('/products', async (req, res) => {
  try {
    const client = await pool.connect();
    client.release();
    res.json([
      { id: 1, name: "T-Shirt Kubernetes", price: 25.99 },
      { id: 2, name: "Mug HashiCorp Vault", price: 15.50 }
    ]);
  } catch (err) {
    console.error("Erreur de connexion BDD:", err.message);
    res.status(500).json({ error: "Base de données injoignable", details: err.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log("---------------------------------------------------------");
  console.log(`🚀 Backend E-commerce en écoute sur le port ${port}`);
  console.log(`👤 Utilisateur BDD injecté : ${process.env.DB_USER}`);
  console.log(`🌐 Hôte BDD : ${process.env.DB_HOST}`);
  console.log("---------------------------------------------------------");
});
