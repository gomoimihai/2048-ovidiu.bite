$(document).ready(function(){
	$('.template-changer').click(function(){
		var templateName = $(this).data('template-name');
		container.removeClass('default warm rainbow').addClass(templateName);
	});
});