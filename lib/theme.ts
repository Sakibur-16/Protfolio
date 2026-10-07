export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint. It marks the page as script-enabled (so
 * scroll reveals can start hidden) and stamps the theme. The site opens in the
 * dark theme; a stored choice from the toggle wins on later visits.
 */
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");d.setAttribute("data-theme",s==="light"?"light":"dark");}catch(e){d.setAttribute("data-theme","dark");}})();`;
