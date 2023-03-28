import axios from 'axios';

export default async function login(req, res) {
  const { email, password } = req.body;

  // Votre code de vérification des informations de connexion ici

  // Envoyer une réponse JSON à l'utilisateur
  res.status(200).json({ message: 'Connecté avec succès !' });
}
