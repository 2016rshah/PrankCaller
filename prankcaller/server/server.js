if (Meteor.isServer) {
	//twilio stuff from sticky note here
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
			bodyText = bodyText;
			bodyText += "\n\n~Spooked? Get revenge at spook.meteor.com.~";
			
			var boundFunction = Meteor.bindEnvironment(function(err, responseData){
				if (!err) { // "err" is an error received during the request, if any
					// "responseData" is a JavaScript object containing data received from Twilio.
					// A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
					// http://www.twilio.com/docs/api/rest/sending-sms#example-1
					console.log(responseData.from); // outputs "+14506667788"
					console.log(responseData.body); // outputs "word to your mother."
					if(texted.find({"number":toNum}).fetch().length === 0){
						texted.insert({"number":toNum, "content":[bodyText]});  
					}
					else{
						texted.update({"number":toNum}, {$push : {"content": bodyText}});
					}
				}
			},
			function(e){
				throw e;
			});
			
			
			twilio.sendSms({
					to:'+1'+toNum, // Any number Twilio can deliver to
					from: '+19718034372', // A number you bought from Twilio and can use for outbound communication
					body: ".\n\n " + bodyText // body of the SMS message
				}, function(err, responseData){boundFunction(err, responseData)});
			
		}, 
		sendCall : function(toNum, soundURL){
			if(called.find({"number":toNum}).fetch().length === 0){
				called.insert({"number":toNum, "frequency":1});  
			}
			else{
				called.update({"number":toNum}, {$inc : {"frequency": 1}});
			}
			twilio.makeCall(
				{
					to:'+1'+toNum, // Any number Twilio can call
					from: '+19718034372', // A number you bought from Twilio and can use for outbound communication
					url: soundURL
				}, 
				function(err, responseData) {
					//executed when the call has been initiated.
					if(err === undefined){console.log(err);}
					else{
						console.log(responseData.from); // outputs "+14506667788"
					}
						
				}
			);
			twilio.sendSms(
				{
					to:'+1'+toNum,
					from: '+19718034372',
					body: ".\n\nSpooked? Get revenge at spook.meteor.com."
				}, 
				function(err, responseData){
					console.log(responseData.from);	
				}
			);
		}
	});
}
