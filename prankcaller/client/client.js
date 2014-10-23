if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault("counter", 0);
    
    Template.hello.helpers({
        counter: function () {
          return Session.get("counter");
        }
    });
    
    Template.hello.events({
        'click button': function () {
          // increment the counter when button is clicked
          Session.set("counter", Session.get("counter") + 1);
          //Meteor.call("sendCall", "Add a number here that you want to send the call to");
        }
    });
    
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
