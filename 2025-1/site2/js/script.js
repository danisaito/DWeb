const toggleButton = document.getElementById('toggleTheme');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  toggleButton.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
});