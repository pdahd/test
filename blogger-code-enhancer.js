// --- Code Block Enhancement Script (External Version) ---
(function() {
  function initCodeBlockEnhancer() {
    var allPreBlocks = document.querySelectorAll('.post-body pre');

    for (var i = 0; i < allPreBlocks.length; i++) {
      var preBlock = allPreBlocks[i];
      if (preBlock.closest('.code-block-container')) continue;

      var container = document.createElement('div');
      container.className = 'code-block-container';
      preBlock.parentNode.insertBefore(container, preBlock);
      container.appendChild(preBlock);

      var lang = 'CODE';
      var codeTag = preBlock.querySelector('code');
      if (codeTag && codeTag.className) {
        var classes = codeTag.className.split(' ');
        for (var j = 0; j < classes.length; j++) {
          if (classes[j].indexOf('language-') === 0) {
            lang = classes[j].substring(9);
            break;
          }
        }
      }

      var header = document.createElement('div');
      header.className = 'code-block-header';

      var langSpan = document.createElement('span');
      langSpan.className = 'code-language';
      langSpan.appendChild(document.createTextNode(lang));

      var copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.appendChild(document.createTextNode('Copy'));

      header.appendChild(langSpan);
      header.appendChild(copyButton);
      container.insertBefore(header, preBlock);

      (function(button, codeElement) {
        button.addEventListener('click', function() {
          var textToCopy = codeElement ? codeElement.innerText : '';
          var textArea = document.createElement('textarea');
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            button.firstChild.nodeValue = 'Copied!';
            button.className = 'copy-button copied';
            setTimeout(function() {
              button.firstChild.nodeValue = 'Copy';
              button.className = 'copy-button';
            }, 2000);
          } catch (err) {
            button.firstChild.nodeValue = 'Error';
          }
          document.body.removeChild(textArea);
        });
      })(copyButton, codeTag);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeBlockEnhancer);
  } else {
    initCodeBlockEnhancer();
  }
})();
