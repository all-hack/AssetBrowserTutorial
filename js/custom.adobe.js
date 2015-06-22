
var dict = {};
// dictionary of elements 
dict['background'] = "";

dict['setting-up-our-computer'] = "";

dict['setting-up-android-studio'] = "";

dict['starting-the-project'] = "";

dict['reviewing-the-project'] = "";

dict['running-the-application'] = "";

//dict 2 
var hdict = {};












//drop down function 
function dropdown(triangle, injectionID){
	console.log($(triangle));
	$(triangle).toggleClass("triangle-down triangle-right");
	if (triangle.className === "triangle-down"){	
		console.log("triangle turned green");
		$('#'+injectionID).append(dict[injectionID]);
	}
	else{
		console.log("triangle turned red")
		$("div").remove("."+injectionID);
	}	
}

//hover 
'<img src="img/androidPics/A1.png" style="width:100%; height:80%;">'
var fi = "<div id='toolTip' style='background-color: black; position: absolute; padding:8px;font-size: 14px; color: burlywood;'>kay thanks bye adjhf a daa ada adaa a ad da  da da ad a a dda a da daohfohohgodhoh aodah</div>"
$(document).ready( function (){
	$('.toolTip').tooltip({
	    items: ".toolTip",
	    content: function(){
	    	//return $(this)[0].innerHTML;
	    	return "fhlskjfhj fsflkj fslkjhjksl fjklsljkfs jklfshjklfsjklfs jklfskljfs jklfs jlkfs kjlfs kjlh kjlfsh kjlsfh "



	    },
		position: { my: "left bottom-25px", at: "center", collision:"fit" }	
	});
	
});


