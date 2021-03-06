// @entry
var Page = require("lib/page");

Page("Home", function(data){
	// 默认城市北京
	var defaultCity = data.Location;
	if($("#ctl00_SiteContentPlaceHolder_ucLocation_ddlLocation").val() !== defaultCity){
		$("#ctl00_SiteContentPlaceHolder_ucLocation_ddlLocation").val(defaultCity);
		$("#ctl00_ddlLanguage").val("zh-CN");
		$("#__EVENTTARGET").val("ctl00$SiteContentPlaceHolder$ucLocation$ddlLocation");
		$("#aspnetForm").submit();
	}else{
		var target = $("#get-started");
		target.css({
			position:"absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		});
		target.children(":not(.location,.category)").hide();

		do{
			target.parent().children().not(target).hide();
			target = target.parent();
		}while(!target.is(document.body));
		$("#ctl00_SiteContentPlaceHolder_ucLocation_IdentifyCaptcha1_txtCodeTextBox").css({
			width: "230px",
			height: "40px",
			padding: "0 10px",
			lineHeight: "40px",
			fontSize: "18px"
		}).focus().keypress(function(e){
			if(e.which === 13){
				e.preventDefault();
				$("#ctl00_ScriptManager1").val("ctl00$SiteContentPlaceHolder$UpdatePanel1|ctl00$SiteContentPlaceHolder$lnkNew");
				$("#__EVENTTARGET").val("ctl00$SiteContentPlaceHolder$lnkNew");
				$("#aspnetForm").submit();
			}
		});
	}
});