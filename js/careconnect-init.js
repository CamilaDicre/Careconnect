/**
 * Scripts de Supabase para CareConnect — incluir en este orden en tus HTML
 *
 * <script src="js/supabase-config.js"></script>
 * <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
 * <script src="js/supabase-client.js"></script>
 * <script src="js/careconnect-session.js"></script>
 * <script src="js/ui-preferences.js"></script>
 * <script src="js/validation-utils.js"></script>
 * <script src="js/careconnect-db.js"></script>
 * <script src="js/localStorage-utils.js"></script>
 */
(function () {
  const scripts = [
    'js/supabase-config.js',
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
    'js/supabase-client.js',
    'js/careconnect-session.js',
    'js/ui-preferences.js',
    'js/validation-utils.js',
    'js/careconnect-db.js',
    'js/localStorage-utils.js'
  ];

  function getBasePath() {
    const current = document.currentScript;
    if (current && current.src) {
      return current.src.replace(/js\/careconnect-init\.js.*$/, '');
    }
    return '';
  }

  window.CareConnectInit = {
    scripts,
    load(basePath) {
      const base = basePath || getBasePath();
      return Promise.all(
        scripts.map(
          (src) =>
            new Promise((resolve, reject) => {
              const s = document.createElement('script');
              s.src = src.startsWith('http') ? src : base + src;
              s.onload = resolve;
              s.onerror = reject;
              document.head.appendChild(s);
            })
        )
      );
    }
  };
})();
