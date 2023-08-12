jQuery(document).ready(function($) {
	let downloadOriginal = null;
	$(document).on('click', 'a.download-original', function(e) {
		downloadOriginal = $(this);
		let infoUrlDownloadFull = downloadOriginal.attr('href');
	   	let url = infoUrlDownloadFull.split('?')[0]+'.json';
		downloadCentralDeConteudo(url);
		e.preventDefault();
	});
	window.onmessage = (e) => {
		if (e.data === 'centraldeconteudo-logged') {
			if (downloadOriginal) {
				downloadOriginal.click();
				downloadOriginal = null;
			}
	   	}
	}
});

function forceDownload(url) {
	var hiddenIFrameID = 'hiddenDownloader',
	iframe = document.getElementById(hiddenIFrameID);
	if (iframe === null) {
	    iframe = document.createElement('iframe');
	    iframe.id = hiddenIFrameID;
	    iframe.style.display = 'none';
	    document.body.appendChild(iframe);
	}
	iframe.src = url;
}

function onSuccessCORS(data) {
	//Download file
	forceDownload(data.download_url);

	//Props to GA
	/*var label = data.title,
	type  = '',
	value = null,
	site = window.location.host.split(".")[0];

	for (var i in data.types) {
		if(data.types[i].toLowerCase() == 'audio') type = 'Audio';
	    if(data.types[i].toLowerCase() == 'originalphoto'){
	      	type  = 'Imagem';
	      	value = 100;
	    }
	}

	//Send data to GA
	sendDataToGA(type, 'Download', label, value, site, 'UA-12972004-2');
	sendDataToGA(type, 'Download', label, value, site, 'UA-12972004-12');*/
}

function onErrorCORS() {
	if(!jQuery(".modal-centraldeconteudo-download").length){
		var template = '<div class="modal-download modal-centraldeconteudo-download"><iframe src="" scrolling="no"></iframe><span class="closeIframe"><button>x</button></span><div class="modal-overlay"></div></div>';
		jQuery(template).appendTo("body");
	}
	setTimeout(function() {
		jQuery('.modal-centraldeconteudo-download').find('iframe').attr('src', Drupal.settings.centraldeconteudo.login_url);
		jQuery('.modal-centraldeconteudo-download').addClass('open');
		jQuery('.closeIframe button').off('click').on('click', function(e) {
			jQuery('.modal-centraldeconteudo-download').removeClass('open');
			e.preventDefault();
		});
	}, 100);
}

function downloadCentralDeConteudo(url) {
	jQuery.getJSON(url + '?callback=?', function(data) {
		if ("download_url" in data) {
			onSuccessCORS(data);
		} else if ("error" in data) {
			onErrorCORS();
		}
	})
	.fail(function() {
		onErrorCORS();
	});
}
