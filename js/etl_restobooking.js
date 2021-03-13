jQuery(function() {
    jQuery( ".etl-restobooking-datepicker" ).datepicker({
        prevText: '<i class="fa fa-angle-left" aria-hidden="true">'+'<' + '/i>',
        nextText: '<i class="fa fa-angle-right" aria-hidden="true">'+'<' + '/i>'
    });
});

jQuery('[data-bookingform-id]').each(function(index) {
    var parentContainer = jQuery( this );

    jQuery( this ).find( ".etl-restobooking-buttonsubmit .button" ).click(function(){
        var empty = jQuery(".etl-restobooking-block", parentContainer).find(".etl-restobooking-item-required").filter(function() {
            return this.value === "";
        });
        if(empty.length) {
            empty.addClass("etl-restobooking-item-required-highlighted");
            jQuery(".etl-restobooking-block", parentContainer).find(".etl-restobooking-item-required").click(function(){
                this.removeClass("etl-restobooking-item-required-highlighted");
            });
        } else {
            jQuery.ajax({
                dataType: 'jsonp',
                url: 'http://getsimpleform.com/messages/ajax?form_api_token=' + parentContainer.attr('data-bookingform-token'),
                data: parentContainer.serialize()
            }).done(function() {
                jQuery(".etl-restobooking-block", parentContainer).hide();
                jQuery(".etl-restobooking-thankyou", parentContainer).fadeIn();
            })
            .fail(function() {
                jQuery(".etl-restobooking-block", parentContainer).hide();
                jQuery(".etl-restobooking-error", parentContainer).fadeIn();
            })
        }
        return false;
    });

});
