(function () {
  const pages = [
    {
      path: 'ai-journalist.html',
      title: 'AI journalist hub',
      section: 'Главная',
      note: 'Все материалы занятия'
    },
    {
      path: 'reflective-questions.html',
      title: 'Reflective Questions',
      section: 'Reflection',
      note: 'Вопросы для диалога',
      anchors: [
        { label: 'Карточки', href: '#cardsGrid' },
        { label: 'Случайная карта', href: '#shuffleBtn' }
      ]
    },
    {
      path: 'neurologic-prompts.html',
      title: 'Neurologic prompts',
      section: 'Prompts',
      note: 'Библиотека промптов',
      anchors: [
        { label: 'Фильтры', href: '#stack-filters' },
        { label: 'Карточки', href: '#cards-grid' },
        { label: 'Случайная карта', href: '#random-btn' }
      ]
    },
    {
      path: 'prompts-2022-2025.html',
      title: 'Промпты 2022-2025',
      section: 'Промпты 2022-2025',
      note: 'Oldies but goodies'
    },
    {
      path: 'vibecoder.html',
      title: 'Vibecoder',
      section: 'Roadmap',
      note: 'Карта занятия',
      anchors: [
        { label: 'Этапы', href: '#top' },
        { label: 'Агентность модели', href: 'model-agency.html' },
        { label: 'Сценарии и агенты', href: 'codex-case.html' }
      ]
    },
    {
      path: 'model-agency.html',
      title: 'Агентность модели',
      section: 'Агентность модели',
      note: 'Нарния выходит из шкафа'
    },
    {
      path: 'connectors-mcp.html',
      title: 'Коннекторы и MCP-протокол',
      section: 'Коннекторы и MCP',
      note: 'Розетки, инструменты, разрешения',
      anchors: [
        { label: 'Что можно', href: '#connectors' },
        { label: 'MCP', href: '#mcp' },
        { label: 'Что нельзя', href: '#not-mcp' },
        { label: 'Computer use', href: '#computer-use' },
        { label: 'Разрешения', href: '#permissions' }
      ]
    },
    {
      path: 'cowork-codex.html',
      title: 'Cowork & Codex',
      section: 'Cowork & Codex',
      note: 'Cowork / Codex / Gemini',
      anchors: [
        { label: 'Как вызываются инструменты', href: '#how-tools-are-called' },
        { label: 'Что сравниваем', href: '#class-task' }
      ]
    },
    {
      path: 'md-skills-automation.html',
      title: '.md Skills / Автоматизации',
      section: '.md Skills / Автоматизации',
      note: 'Собираем и передаём опыт',
      anchors: [
        { label: '.md', href: '#markdown' },
        { label: 'Скиллы', href: '#skills' },
        { label: 'Примеры SKILL.md', href: '#skill-examples' },
        { label: 'Версии', href: '#versioning' },
        { label: 'Кейс дайджеста', href: '#digest-case' },
        { label: 'Мечты автоматизации', href: '#automation-dreams' }
      ]
    },
    {
      path: 'codex-case.html',
      title: 'Сценарии и агенты',
      section: 'Codex case',
      note: 'От любопытства к плану',
      anchors: [
        { label: 'От задачи к skill', href: '#task-to-skill' },
        { label: 'Материалы', href: '#materials' },
        { label: 'Диалог Codex', href: 'codex://threads/019e48e2-1460-70c2-a208-69db86ea1c71' }
      ]
    },
    {
      path: 'hypothesis.html',
      title: 'Hypotesis',
      section: 'Hypothesis',
      note: 'Рабочий лист',
      anchors: [
        { label: 'Контекст', href: '#context' },
        { label: 'Тема vs гипотеза', href: '#comparison' },
        { label: 'Шаблон', href: '#template' },
        { label: 'AI prompt', href: '#ai-prompt' },
        { label: 'Worksheet', href: '#worksheet' }
      ]
    }
  ];

  const groups = [
    {
      title: 'Старт',
      links: [
        { label: 'AI journalist hub', href: 'ai-journalist.html', note: 'Главная развилка занятия' },
        { label: 'Reflective Questions', href: 'reflective-questions.html', note: 'Карточки для диалога' }
      ]
    },
    {
      title: 'Промпты',
      links: [
        { label: 'Neurologic prompts', href: 'neurologic-prompts.html', note: 'Библиотека промптов' },
        { label: 'Промпты 2022-2025', href: 'prompts-2022-2025.html', note: 'Oldies but goodies' },
        { label: 'Hypotesis', href: 'hypothesis.html#ai-prompt', note: 'Процедурный AI prompt' }
      ]
    },
    {
      title: 'Vibecoder',
      links: [
        { label: 'Roadmap', href: 'vibecoder.html', note: 'Путь занятия' },
        { label: 'Агентность модели', href: 'model-agency.html', note: 'Нарния выходит из шкафа' },
        { label: 'Коннекторы и MCP', href: 'connectors-mcp.html', note: 'Инструменты и доступы' },
        { label: 'Cowork & Codex', href: 'cowork-codex.html', note: 'Cowork / Codex / Gemini' },
        { label: '.md Skills / Автоматизации', href: 'md-skills-automation.html', note: 'Собираем опыт в инструкции' },
        { label: 'Сценарии и агенты', href: 'codex-case.html', note: 'Кейс Codex' }
      ]
    },
    {
      title: 'Практика',
      links: [
        { label: 'Hypothesis worksheet', href: 'hypothesis.html#worksheet', note: 'Рабочий лист студента' },
        { label: 'Диалог Codex', href: 'codex://threads/019e48e2-1460-70c2-a208-69db86ea1c71', note: 'Исходный thread' }
      ]
    }
  ];

  function currentPage() {
    const name = window.location.pathname.split('/').pop() || 'ai-journalist.html';
    return pages.findIndex((page) => page.path === name);
  }

  function pageMarker(current, extraClass) {
    return `
      <div class="aj-current-card ${extraClass || ''}">
        <div class="aj-nav-meta"><strong>${current.section}</strong></div>
      </div>
    `;
  }

  function renderCurrentPage(index) {
    const current = pages[index];
    const nav = document.createElement('nav');
    nav.className = 'aj-current-page';
    nav.setAttribute('aria-label', 'Current AI journalist page');
    nav.innerHTML = pageMarker(current);
    const main = document.querySelector('main');
    if (main) {
      document.body.insertBefore(nav, main);
    } else {
      document.body.prepend(nav);
    }
  }

  function renderFooter(index) {
    const current = pages[index];
    const footer = document.createElement('footer');
    footer.className = 'aj-materials-footer';
    footer.setAttribute('aria-label', 'AI journalist materials index');
    footer.innerHTML = `
      <div class="aj-footer-head">
        <div>
          <h2 class="aj-footer-title">AI journalist materials</h2>
          <p class="aj-footer-copy">Быстрые переходы между разделами и подразделами занятия.</p>
        </div>
        <a class="aj-footer-home" href="ai-journalist.html">Все материалы</a>
      </div>
      <div class="aj-footer-current">
        ${pageMarker(current)}
      </div>
      <div class="aj-footer-grid">
        ${groups.map((group) => `
          <div class="aj-footer-col">
            <h3>${group.title}</h3>
            ${group.links.map((link) => `
              <a href="${link.href}">${link.label}<small>${link.note}</small></a>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;
    document.body.appendChild(footer);
  }

  function renderLocalSubnav(index) {
    const page = pages[index];
    if (!page.anchors || !page.anchors.length) return;
    const existingFooter = document.querySelector('.aj-materials-footer');
    if (!existingFooter) return;
    const col = document.createElement('div');
    col.className = 'aj-footer-col';
    col.innerHTML = `
      <h3>${page.section}: подразделы</h3>
      ${page.anchors.map((link) => `<a href="${link.href}">${link.label}<small>${page.title}</small></a>`).join('')}
    `;
    const grid = existingFooter.querySelector('.aj-footer-grid');
    if (grid) grid.appendChild(col);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const index = currentPage();
    if (index < 0) return;
    renderCurrentPage(index);
    renderFooter(index);
    renderLocalSubnav(index);
  });
})();
