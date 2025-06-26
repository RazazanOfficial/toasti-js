(function (global) {
  const toastContainerId = 'toasti-container';

  function ensureContainer() {
    let container = document.getElementById(toastContainerId);
    if (!container) {
      container = document.createElement('div');
      container.id = toastContainerId;
      container.className = 'toasti-container';
      document.body.appendChild(container);
    }
    return container;
  }

function showToast(type, message, duration = 3000) {
  const container = ensureContainer();
  const toast = document.createElement('div');
  toast.className = `toasti ${type}`;

  const text = document.createElement('span');
  text.textContent = message;

  const close = document.createElement('button');
  close.innerHTML = '&times;';
  close.className = 'close-btn';
  close.onclick = () => removeToast();

  const progress = document.createElement('div');
  progress.className = 'progress-bar';
  progress.style.animationDuration = duration + 'ms';
  toast.appendChild(progress);

  toast.appendChild(text);
  toast.appendChild(close);
  container.appendChild(toast);

  let removeTimeout = setTimeout(removeToast, duration);


  toast.addEventListener('mouseenter', () => {
    progress.style.animationPlayState = 'paused';
    clearTimeout(removeTimeout);
  });

  toast.addEventListener('mouseleave', () => {
    progress.style.animationPlayState = 'running';
    removeTimeout = setTimeout(removeToast, duration);
  });

  function removeToast() {
    toast.style.animation = 'fadeout 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }
}

  global.toast = {
    success: (msg, duration) => showToast('success', msg, duration),
    info: (msg, duration) => showToast('info', msg, duration),
    warning: (msg, duration) => showToast('warning', msg, duration),
    error: (msg, duration) => {
      showToast('error', msg, duration || 4000);
      throw new Error(msg);
    },
  };
})(window);
