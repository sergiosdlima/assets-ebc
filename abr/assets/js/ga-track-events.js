// Google analytics events
var prepareDatas = {
    category:"Imagem",
    action:"Download",
    label:"Formato Web",
    value:0,
    site:"agenciabrasil",
    ua:"UA-12972004-2"
};

var generateGAData = function(sendingData) {
    sendDataToGA(
        sendingData.category,
        sendingData.action,
        sendingData.label,
        sendingData.value,
        sendingData.site,
        sendingData.ua
    );
    // console.log("GA DEBUG:",
    //     sendingData.category,
    //     sendingData.action,
    //     sendingData.label,
    //     sendingData.value,
    //     sendingData.site,
    //     sendingData.ua
    // );
};

function getQueryStringValue (URI, key) {
    return decodeURIComponent(URI.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

(function ($) {
    // download de foto formato web na página interna de foto
    $('#download-web').on('click',function() {
        let sendingData = jQuery.extend(true, {}, prepareDatas);
        let label = $('h2').text() || "Formato Web";
        sendingData.label = label;
        generateGAData(sendingData);
        sendingData.ua = "UA-12972004-12";
        generateGAData(sendingData);
    });

    // download de foto formato original na página interna de foto
    $('#download-original-alt').on('click',function() {
        let sendingData = jQuery.extend(true, {}, prepareDatas);
        let label = $('h2').text() || "Formato Original";
        sendingData.label = label;
        sendingData.value = 100;
        generateGAData(sendingData);
        sendingData.ua = "UA-12972004-12";
        generateGAData(sendingData);
    });

    // download de áudio na lista de últimas da radioagencia
    $('.download-original-fake').on('click',function() {
        let sendingData = jQuery.extend(true, {}, prepareDatas);
        let label = $('h4', $(this).parent('.post-item-desc')).text() || "Download áudio";
        sendingData.label = label;
        sendingData.category = "Audio";
        generateGAData(sendingData);
        sendingData.ua = "UA-12972004-12";
        generateGAData(sendingData);
    });

    // clique no menu principal
    $('#sidemenu-opener').on('click',function() {
        let sendingData = jQuery.extend(true, {}, prepareDatas);
        sendingData.label = "Menu principal";
        sendingData.category = "Navigation";
        sendingData.action = "Click";
        generateGAData(sendingData);
        sendingData.ua = "UA-12972004-12";
        generateGAData(sendingData);
    });

    // clique no btn Ver mais
    // @todo aprimorar quando é carregada a segunda página em diante não funciona mais
    $('.pager-load-more .btn').on('click', function() {
        let sendingData = jQuery.extend(true, {}, prepareDatas);
        let urlParse = document.createElement('a');
        urlParse.href = $(this).attr('href');
        sendingData.label = $(this).text().trim() + ": " + urlParse.pathname;
        sendingData.value = getQueryStringValue(urlParse, 'page') || 0;
        sendingData.category = "Navigation";
        sendingData.action = "Click";
        generateGAData(sendingData);
        sendingData.ua = "UA-12972004-12";
        generateGAData(sendingData);
    });

    //clique nas Opções de Manifestações da Ouvidoria
    $('#barraManifestacao').on('click', "#denuncia, #reclamacao, #elogio, #sugestao, #solicitacao, #simplifique", function(){
        let sendingData = jQuery.extend(true, {}, prepareDatas);
        sendingData.category = "Navigation";
        sendingData.action = "Click";
        sendingData.label = jQuery(this).attr('title');
        generateGAData(sendingData);
        sendingData.ua = "UA-12972004-12";
        generateGAData(sendingData);
    });




})(jQuery);

