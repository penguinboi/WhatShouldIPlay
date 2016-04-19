var $currentUserSteam = ""; 
var $currentUsername = "";
var $exists = false;

$(document).ready(function() {
  "use strict";

  $("#signup").click(function() {
	$("#signinButton").hide();
	$("#registerButton").show();
	$("#inputDIVSteamID").show();
	$("#registerSignin-title").empty().append("Sign Up");
	$("#registerSignIn").modal();
	$("#errorMsg").hide();
  });

  $("#signin").click(function() {
	$("#registerButton").hide();
	$("#signinButton").show();
	$("#inputDIVSteamID").hide();
	$("#registerSignin-title").empty().append("Sign In");
	$("#registerSignIn").modal();
	$("#errorMsg").hide();
  });

  	$("#registerButton").click(function() {

	    var registrationData = _.object($("#registerSignIn-form").serializeArray().map(function(v) {return [v.name, v.value];} ));  //returns form values as key value pairs
	    $.post("http://localhost:3000/exists", {"username": registrationData.email.toLowerCase()}, function(data) {
       		if(data.length != 0){
       			console.log(data);
       			console.log("exists");
       			$("#errorMsg").show();
		    	$("#errorMsg").text("Sign up failed. Account already exists, please try again!");
			    $("#errorMsg").effect("shake");
			}
			else{
				$.post("http://localhost:3000/signup", {"username": registrationData.email.toLowerCase(), "password": registrationData.password, "steamID" : registrationData.steamID}, function(data) { 
		        	$("#registerSignIn").modal("hide");
			        $("#inputEmail").val("");
			        $("#inputPassword").val("");
			        $("#inputSteamID").val("");
	        	});
			}
	    });
  	});

  	$("#signinButton").click(function() {
	    var signinData = _.object($("#registerSignIn-form").serializeArray().map(function(v) {return [v.name, v.value];} ));//converts form data to associative array
	    $.post("http://localhost:3000/signin", { "username": signinData.email.toLowerCase(), "password": signinData.password }, function(data) {
       		if(data.length != 0){
       			console.log(data);
	        	$currentUsername = data[0].username;
	        	$currentUserSteam = data[0].steamID;

	        	$("#registerSignIn").modal("hide");
		        $("#inputEmail").val("");
		        $("#inputPassword").val("");
		        $("#inputSteamID").val("");
		        $("#signup").hide();
		        $("#signin").hide();
		        $("#logOut").show();

		        var $greeting = '<span class="text-primary" id="greeting">Hello, ' + $currentUsername + $currentUserSteam +'!</li>';
		        $("#navbar").append($greeting);
       		}
       		else{
       			$("#errorMsg").show();
		    	$("#errorMsg").text("Sign in failed. Account not found or wrong password!");
		    	$("#errorMsg").effect("shake");
       		}
	    });
  	});

	$("#logOut").click(function() {
	    $currentUsername = "";
	    $currentUserSteam = "";
        $("#signup").show();
        $("#signin").show();
        $("#logOut").hide();
	    $("#greeting").remove();
  	});
});