const currentYear = new Date().getFullYear().toString();

for (const element of document.querySelectorAll('[data-current-year]')) {
  element.textContent = currentYear;
}

for (const button of document.querySelectorAll('[data-copy-link]')) {
  const originalLabel = button.textContent;

  button.addEventListener('click', async () => {
    const target = new URL(button.dataset.copyLink ?? './', window.location.href);

    try {
      await navigator.clipboard.writeText(target.href);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Copy failed';
    }

    setTimeout(() => {
      button.textContent = originalLabel;
    }, 1800);
  });
}
