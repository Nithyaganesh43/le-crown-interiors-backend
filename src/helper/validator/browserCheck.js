const xss = require('xss');
const { block } = require('./block');

module.exports = async function browserCheck(req, res, next) {
  const { fingerprint } = req.body;
  const origin = xss(req.get('Origin') || '');
  const referer = xss(req.get('Referer') || '');
  const userAgent = xss(req.get('User-Agent') || '');
  const language = xss(
    (req.get('Accept-Language') || '').split(',')[0].split('-')[0]
  );
  const d = req.body?.userBrowserData;

  if (
    !origin ||
    !referer ||
    !userAgent.includes('Mozilla') ||
    !d ||
    !d.userAgent ||
    !d.language ||
    userAgent !== d.userAgent ||
    language !== d.language.split('-')[0]
  ) {
    await block('Access denied', fingerprint, res);
    return;
  }

  next();
};
