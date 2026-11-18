// Modo de teste: ligado com ?teste no endereço ou quando a fase é aberta pelo teste.html (num quadro dele).
// Guarda os erros da página em window.ERROS para o teste ler. Carregado antes de tudo, fora dos módulos.
(function () {
  var liga = /[?&]teste\b/.test(location.search);
  try { liga = liga || (parent !== self && !!parent.TESTADOR); } catch (e) { /* quadro de outro site */ }
  if (!liga) return;
  window.MODO_TESTE = true;
  var ERROS = window.ERROS = [];
  addEventListener('error', function (e) {
    if (e.message) ERROS.push(e.message + ' (' + String(e.filename || '').split('/').pop() + ':' + e.lineno + ')');
    else if (e.target && (e.target.src || e.target.href)) ERROS.push('não carregou: ' + (e.target.src || e.target.href));
  }, true);
  addEventListener('unhandledrejection', function (e) { var r = e.reason; ERROS.push('falha: ' + (r && (r.message || r)) ); });
  var ce = console.error;
  console.error = function () { ERROS.push('console: ' + Array.prototype.map.call(arguments, String).join(' ').slice(0, 300)); return ce.apply(console, arguments); };
})();
