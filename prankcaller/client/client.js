if (Meteor.isClient) {
    Template.sendCall.events({
        'submit form#callForm' : function(event, template){
            event.preventDefault();
            var number = template.find("#callNumber").value;
            console.log(number);
            Meteor.call("sendCall", number);
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
