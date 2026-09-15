const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#message-input');
const chatBody = document.querySelector('#chat-body');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.querySelector('.sr-only').textContent = isOpen ? '메뉴 열기' : '메뉴 닫기';
  navLinks.classList.toggle('open', !isOpen);
});

navLinks.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const escapeText = (value) => {
  const span = document.createElement('span');
  span.textContent = value;
  return span.innerHTML;
};

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) {
    chatInput.focus();
    return;
  }

  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.innerHTML = `<p>${escapeText(text)}</p>`;
  chatBody.appendChild(userMessage);
  chatInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  window.setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    botMessage.innerHTML = '<span class="tiny-avatar">S</span><p>좋은 질문이에요. 실제 SongSong-G에서는 회사의 지식과 연결해 정확한 답변을 제공해요.</p>';
    chatBody.appendChild(botMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 650);
});

document.querySelector('#year').textContent = new Date().getFullYear();
