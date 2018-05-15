$(document).ready(function() {
   $('#contact-form').on('submit', function(e) {
       e.preventDefault();
       e.stopPropagation();

       let  form = $(this),
            formData = getFormData(form);

       form.find('#contact-form-submit').addClass('process');

       (function(){
           emailjs.init("user_Y9zKs2z3SuYEItk53kP4v");
       })();

       emailjs.send("gmail","solargain",{ data: JSON.stringify(formData) })
           .then(function(response) {
               console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
               form[0].reset();
               form.find('#contact-form-submit').removeClass('process');
               alert('Thank you, we will get back to you as soon as possible.');
           }, function(err) {
               console.log("FAILED. error=", err);
               form.find('#contact-form-submit').removeClass('process');
               alert('Sorry, there was an error, the message was not delivered.');
           });
   });

    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }
});