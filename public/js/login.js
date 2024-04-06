const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // On envoie une requête POST à notre serveur pour se connecter
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {

      // Si le serveur renvoie un token, on le stocke dans le localStorage et on redirige l'utilisateur vers le dashboard
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        alert(data.message);
      }
    })
    .catch(err => console.error(err));

 
})
