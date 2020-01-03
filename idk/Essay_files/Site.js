// Site.js

$(function () {

    // hide top toolbar if it's empty
    function isEmpty(el) {
        return !$.trim(el.html())
    }
    if (isEmpty($('#top-toolbar .well'))) {
        $('#top-toolbar .well').hide();
        $('#top-toolbar .pad').css('padding', '0');
    }


	// Detect JavaScript
	$('html').removeClass('no-js').addClass('js');

	// Init jQuery UI datepicker
	if ($('.datepicker').length) {
		$('.datepicker').datepicker({
		    changeMonth: true,
		    changeYear: true
		});
	}
	// init popovers
	if ($('.has-popover').length) {
		$('.has-popover').popover({
			placement: 'top'
		});
	}

	// init popovers - config with HTML data attributes per element
	$('[rel="popover"]').popover();

	// init tooltips - config with HTML data attributes per element
	$('[rel="tooltip"]').tooltip();

	// init datatable
	if ($('.table-data').length) {
		$('.table-data').dataTable({
			"sPaginationType": "full_numbers",
			"bFilter": false,
			"sDom": '<"well well-small"<"row-fluid"<"span4"i><"span4"l><"span4"p>>>t<"well well-small"<"row-fluid"<"span4"i><"span4"l><"span4"p>>>'
		});
	}

	$.fn.phoneFormat = function () {
		$(this).blur(function () {
			$(this).val(function (i, text) {
				if (text.length < 12)
					text = text.replace("-", "");

				return text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
			});
		});
	};


	/** Assumes you will use model properties MobileCountryCode and MobileCountryAbbr */
	$.fn.mobileNumber = function () {
		$(this).intlTelInput({
			//utilsScript: contentRoot + "/scripts/intl-tel-input-12.1.1/js/utils.js",
			autoPlaceholder: false,
			preferredCountries: ['us']
		});

		if ($("#MobileCountryAbbr").val() != "")
			$(this).intlTelInput("setCountry", $("#MobileCountryAbbr").val());

		$(this).on('blur', function () {
			var countryData = $(this).intlTelInput("getSelectedCountryData");
			$("#MobileCountryCode").val(countryData["dialCode"]);
			$("#MobileCountryAbbr").val(countryData["iso2"]);
		});

	};


    // in-page navigation
	if ($('.nav-in-page').length) {
	    $('.nav-in-page a[href^="#"]').on('click', function (event) {
	        var target = $(this.getAttribute('href'));
	        if (target.length) {
	            event.preventDefault();
	            $('html, body').stop().animate({
	                scrollTop: target.offset().top
	            }, 1000);
	        }
	    });
	}

    // Scroll to Top widget
	if ($('#return-to-top').length) {

	    $(window).scroll(function () {
	        if ($(this).scrollTop() >= 50) {
	            $('#return-to-top').fadeIn(200);
	        } else {
	            $('#return-to-top').fadeOut(200);
	        }
	    });
	    $('#return-to-top').click(function () {
	        $('body,html').animate({
	            scrollTop: 0
	        }, 500);
	    });
	}
});