/**
 * Cliente Supabase para CareConnect (CDN)
 */
(function () {
  if (window.CareConnectSupabase) return;

  function getClient() {
    if (!window.supabase || !window.CARECONNECT_SUPABASE) {
      console.error('Supabase SDK o configuración no disponible');
      return null;
    }

    const { url, anonKey } = window.CARECONNECT_SUPABASE;

    if (!url || !anonKey || anonKey === 'YOUR_SUPABASE_ANON_KEY') {
      console.warn(
        'Configura tu clave anon en js/supabase-config.js (Settings → API en Supabase)'
      );
      return null;
    }

    return window.supabase.createClient(url, anonKey);
  }

  window.CareConnectSupabase = {
    getClient,
    isConfigured() {
      const cfg = window.CARECONNECT_SUPABASE;
      return cfg && cfg.url && cfg.anonKey && cfg.anonKey !== 'YOUR_SUPABASE_ANON_KEY';
    }
  };
})();
