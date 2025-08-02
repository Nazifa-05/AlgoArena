document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: form.username.value,
      password: form.password.value
    })
  });
  alert(await res.text());
  if (res.ok) window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: form.username.value,
      password: form.password.value
    })
  });
  alert(await res.text());
  if (res.ok) window.location.href = '/dashboard';
});
