let selectedEmoji = '';
const historyList = document.getElementById('history');
const noteInput = document.getElementById('note');
const saveBtn = document.getElementById('save');

// Cargar historial al iniciar
window.onload = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
  loadHistory();
};

// Seleccionar emoción
document.querySelectorAll('.emojis button').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedEmoji = btn.dataset.emoji;
    document.querySelectorAll('.emojis button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Guardar entrada
saveBtn.addEventListener('click', () => {
  if (!selectedEmoji) {
    alert('Selecciona una emoción');
    return;
  }

  const note = noteInput.value.trim();
  const entry = {
    emoji: selectedEmoji,
    note: note,
    date: new Date().toLocaleString()
  };

  const history = JSON.parse(localStorage.getItem('emotionHistory')) || [];
  history.unshift(entry);
  localStorage.setItem('emotionHistory', JSON.stringify(history));
  noteInput.value = '';
  selectedEmoji = '';
  document.querySelectorAll('.emojis button').forEach(b => b.classList.remove('selected'));
  loadHistory();
});

// Mostrar historial
function loadHistory() {
  const history = JSON.parse(localStorage.getItem('emotionHistory')) || [];
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.emoji}</strong> - ${item.date}<br>${item.note}`;
    historyList.appendChild(li);
  });
}
