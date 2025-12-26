\
(() => {
  const input = document.querySelector('[data-search-input]');
  const cards = Array.from(document.querySelectorAll('[data-person-card]'));
  const emptyState = document.querySelector('[data-empty-state]');
  if (!input || !cards.length) {
    return;
  }

  const normalize = (value) => {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const update = () => {
    const query = normalize(input.value || '');
    let visible = 0;

    cards.forEach((card) => {
      const name = card.getAttribute('data-name') || '';
      const match = !query || normalize(name).includes(query);
      card.style.display = match ? '' : 'none';
      if (match) {
        visible += 1;
      }
    });

    if (emptyState) {
      emptyState.style.display = visible === 0 ? 'block' : 'none';
    }
  };

  input.addEventListener('input', update);
  update();
})();
