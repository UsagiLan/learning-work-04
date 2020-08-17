export default function (url, callback, async = true) {
  let script = document.createElement('script');

  function onload() {
    const readyState = script.readyState;
    if (typeof readyState == 'undefined' || /^(loaded|complete)$/.test(readyState)) {
      script.onload = script.onreadystatechange = null;
      script = null;
      callback && callback();
    }
  }
  script.async = async;
  if (script.readyState) {
    script.onreadystatechange = onload;
  } else {
    script.onload = onload;
  }
  script.src = url;
  let parent = document.getElementsByTagName('head')[0] || document.body;
  parent.appendChild(script) && (parent = null);
}