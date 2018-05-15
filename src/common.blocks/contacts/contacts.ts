$(document).ready(function() {
   $('#contact-form').on('submit', function(e) {
       e.preventDefault();
       e.stopPropagation();

       let  form = $(this),
            formData = getFormData(form),
            emailSendTo = form.data('sendTo');

       console.log('serialized:', formData);
       console.log('sendTo:', emailSendTo);


       (function(){
           emailjs.init("user_Y9zKs2z3SuYEItk53kP4v");
       })();

       emailjs.send("gmail", "<YOUR TEMPLATE ID>",{ data: JSON.stringify(formData) });
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