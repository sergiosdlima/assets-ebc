jQuery(document).ready(function($) {
  /**
   * Abre nova janela do navegador para os links de compartilhamento
   */
  $('a .click-share').on('click', function(e) {
    e.preventDefault();
    var width = window.outerWidth/2 < 300 ? 300 : window.outerWidth/2;
    var height  = window.outerHeight/2 < 200 ? 200 : window.outerHeight/2;
    var url = $(this).attr('href');
    var title = $(this).attr('title');

    var leftPosition, topPosition;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);

    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    window.open(url, title, windowFeatures);
  });
});

function showCopyMessage() {
  alert('A republicação é gratuita desde que citada a fonte.');
}
