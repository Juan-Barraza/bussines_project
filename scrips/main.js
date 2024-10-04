
//register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const genero = document.getElementById('genero').value;

    const user = {
      name,
      lastName,
      email,
      password,
      genero
    };

    // save in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // redirect
    window.location.href = 'login.html';
  });
}

// login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const userSave = localStorage.getItem('user');
    
    if (userSave) {
      const user = JSON.parse(userSave);
      
      if (user.password === password) {
        // save session sessionStorage
        sessionStorage.setItem('activeUser', JSON.stringify(user));

        // Redirect
        window.location.href = 'home.html';
      } else {
        alert('password incorrecta');
      }
    } else {
      alert('user do not exist');
    }
  });
}

// activeSession
window.addEventListener('load', function() {
  const activeUser = JSON.parse(sessionStorage.getItem('activeUser'));
  console.log('User logged in:', activeUser);

  if (window.location.pathname.includes('home.html') && !activeUser) {
    // user active redirect login
    window.location.href = 'login.html';
    return;
  }


  // Select elements
  const navLinks = document.getElementById('nav-links-2');
  // const registerForm = document.getElementById('registerForm');
  // const containerLogin = document.querySelector('.containerLogin');
  
  if (activeUser) {
    const userItem = document.createElement('li');
    userItem.textContent = activeUser.name ; 
    navLinks.appendChild(userItem);
    
    // Element to log out 
    const logoutItem = document.createElement('li');
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Log out';

    // const elementsToHide = document.getElementsByClassName("active-hide");
    // console.log(elementsToHide);

    // hide login and register 
    // for (const e of elementsToHide) {
    //   e.style.display = "none";
    // }

    logoutLink.addEventListener('click', function() {
      // Remove user of sessionStorage
      sessionStorage.removeItem('activeUser');
      window.location.href = 'index.html'
  
      // Reload page to reset
      //window.location.reload();
    });

    logoutItem.appendChild(logoutLink);
    navLinks.appendChild(logoutItem);
  }
});

