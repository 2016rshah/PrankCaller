if (Meteor.isClient) {
    Template.sendCall.events({
        'submit form#callForm' : function(event, template){
            var soundBytes = [
                "http://twimlets.com/echo?Twiml=%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20%3F%3E%3CResponse%3E%3CPlay%3Ehttp%3A%2F%2Fwww.shockwave-sound.com%2Fsound-effects%2Fhalloween-sounds%2FEvil%2520Witch%2520Laughing.mp3%3C%2FPlay%3E%3C%2FResponse%3E",
                "http://twimlets.com/echo?Twiml=%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20%3F%3E%3CResponse%3E%3CPlay%3Ehttp%3A%2F%2Fwww.shockwave-sound.com%2Fsound-effects%2Fhalloween-sounds%2FEvil%2520Laugh%2520In%2520Hall.mp3%3C%2FPlay%3E%3C%2FResponse%3E",
                "http://twimlets.com/echo?Twiml=%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20%3F%3E%3CResponse%3E%3CPlay%3Ehttp%3A%2F%2Fwww.shockwave-sound.com%2Fsound-effects%2Fhalloween-sounds%2Fthunderbolt.mp3%3C%2FPlay%3E%3C%2FResponse%3E",
                
            ];
            var index = $("input[type='radio'][name='sound']:checked").val();
            event.preventDefault();
            var number = template.find("#callNumber").value;
            console.log(number);
            
            Meteor.call("sendCall", number, soundBytes[index]);
        }
    });
    Template.sendText.events({
        'submit form#textForm' : function(event, template){
            event.preventDefault();
            var number = template.find("#textNumber").value;
            console.log(number);
            var content = template.find("#textContent").value;
            console.log(content);
            Meteor.call("sendText", number, content);
        }    
    });
}
