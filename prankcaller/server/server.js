if (Meteor.isServer) {
	//Add twilio code from sticky note here with key and stuff
	Meteor.startup(function () {
	// // code to run on server at startup
	// Meteor.http.get("https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4", {}, function(err, data){
	//     if(err !== undefined){
	//         console.log(err);
	//     }
	//     else{
	//         console.log(data);
	//     }
	// });
	
	// console.log("success!");
	
	});
	Meteor.methods({
		sendText : function(toNum, bodyText){
			//add number to database here
			twilio.sendSms({
			    to:'+1'+toNum, // Any number Twilio can deliver to
			    from: '+19718034372', // A number you bought from Twilio and can use for outbound communication
			    body: bodyText // body of the SMS message
			  }, function(err, responseData) { //this function is executed when a response is received from Twilio
			    if (!err) { // "err" is an error received during the request, if any
			      // "responseData" is a JavaScript object containing data received from Twilio.
			      // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
			      // http://www.twilio.com/docs/api/rest/sending-sms#example-1
			      console.log(responseData.from); // outputs "+14506667788"
			      console.log(responseData.body); // outputs "word to your mother."
			    }
			});
			
		}, 
		sendCall : function(toNum){
			twilio.makeCall(
				{
					to:'+1'+toNum, // Any number Twilio can call
					from: '+19718034372', // A number you bought from Twilio and can use for outbound communication
					url: "http://twimlets.com/echo?Twiml=%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20%3F%3E%3CResponse%3E%3CSay%3EHello%20world!%3C%2FSay%3E%3CSms%3EWhatup%3C%2FSms%3E%3C%2FResponse%3E"
				}, 
				function(err, responseData) {
					//executed when the call has been initiated.
					console.log(responseData.from); // outputs "+14506667788"
				}
			);
		}
	});
}
