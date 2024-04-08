const  popupBtn = document.querySelector('.popupBtn');
const  popupBox = document.querySelector('.popupBox');
const toggleMode = document.querySelector('.toggleMode');
const deployNav = document.querySelector('.deployNav');
const userName = document.getElementById('nameData');
const userEmail = document.getElementById('emailData');
const logoutBtn = document.getElementById('logoutBtn');

popupBtn.addEventListener('click', () => {
    popupBox.classList.toggle('active');
});

toggleMode.addEventListener('click', () => {

    const rootElement = document.documentElement;
    let dataTheme = rootElement.getAttribute('data-theme'), newTheme;

    newTheme = (dataTheme === 'dark') ? 'light' : 'dark';
    rootElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);
});

deployNav.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('visible');
});


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