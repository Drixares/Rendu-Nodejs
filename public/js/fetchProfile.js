const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const logoutBtn = document.getElementById('logoutBtn');

async function userFetch() {

  // On récupère le token stocké dans le localStorage
  const token = localStorage.getItem('token');

  // Si le token n'existe pas, on redirige l'utilisateur vers la page de connexion
  if (!token) window.location.href = '/login';

  // On envoie une requête GET à notre serveur pour récupérer les informations de l'utilisateur
  const response = await fetch('/getProfile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  // Si le serveur renvoie une erreur 401 ou 403, on redirige l'utilisateur vers la page de connexion
  if (response.status === 401) {
    window.location.href = '/login';
    return;
  } else if (response.status === 403) {
    window.location.href = '/login';
    return;
  }

  // On récupère les informations de l'utilisateur
  const user = await response.json();

  // On affiche les informations de l'utilisateur
  userName.textContent = user.name;
  userEmail.textContent = user.email;
}

userFetch();

logoutBtn.addEventListener('click', async () => {

  const response = await fetch('/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (response.status === 200) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  
})