function is_invalid_name(str) {
	return /[^a-zA-Z\-\d ]/.test(str);
}

function invalid_name(str) {
	return /[^a-zA-Z\d '".&-]/.test(str);
}

function invalid_username(str) {
	return /[^a-zA-Z\d]/.test(str);
}

function valid_email(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

function is_invalid_address(str) {
	return /[^a-zA-Z\-\d #,.]/.test(str);
}

function is_invalid_zip(str) {
	return /[^\d\-]/.test(str);
}

function is_invalid_phone(str) {
	return /[^\d\- ()]/.test(str);
}

function is_invalid_text(str) {
	return /[^a-zA-Z\-\d .!]/.test(str);
}

function is_invalid_price(num) {
	return /[^\d\.]/.test(num);
}

function is_valid_price_format(num) {
	return /^\d{0,8}(\.\d{0,2})?$/.test(num);
}

function has_special_char(str) {
	return /[^a-zA-Z\d]/.test(str);
}

function has_letter(str) {
	return /[a-zA-Z]/.test(str);
}

function has_number(str) {
	return /\d/.test(str);
}

function invalid_search(str) {
	return /[^a-zA-Z\d .\-\']/.test(str);
}

function password_check(str) {
	return (has_special_char(str) && has_letter(str) && has_number(str) && str.length >= 8);
}

$(window).on('load', function() {
	// $("#cover").removeClass("d-flex");
	// $("#cover").addClass("d-none");
	$("#cover").hide();
	// $(".spinner").hide();
});

$(document).ready(function() {
	if(document.getElementById("NoJS") != null) {
		$("#NoJS").addClass("d-none");
	}
});