(function ($, navigator, document) {
    'use strict';

    // Main function
    $.fn.editLink = function (path, options) {

        // Ensure that only one editLink exists
        if (!$.data(document.body, 'editLink')) {
            $.data(document.body, 'editLink', true);
            $.fn.editLink.init(path, options);
        }
    };
    
    // Init
    $.fn.editLink.init = function (path, options) {

        // Define vars
        var o = $.fn.editLink.settings = $.extend({}, $.fn.editLink.defaults, options),
             $self, $container, animIn, animOut, animSpeed, hoverEvent, htmlClose;

        // Create element
        $self = $('<a/>', {
            id: o.btnId,
            href: path,
            class: o.btnClass,
            text: o.btnText
        });

        // Create container
        $container = $('<div/>', {
           id: o.containerId,
           class: o.containerclass
        });

        $self.appendTo($container);
        $container.appendTo('body');
        
        $container.css({
            width: $self[0].getBoundingClientRect().width,
            height: $self[0].getBoundingClientRect().height,
            zIndex: o.zIndex
        });

        $self.css({
            display: 'none',
        });

        // Switch animation type
        switch (o.animation) {
            case 'fade':
                animIn = 'fadeIn';
                animOut = 'fadeOut';
                animSpeed = o.animationSpeed;
                break;

            case 'slide':
                animIn = 'slideDown';
                animOut = 'slideUp';
                animSpeed = o.animationSpeed;
                break;

            default:
                animIn = 'show';
                animOut = 'hide';
                animSpeed = 0;
        }
        
        // Hover/click function
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            hoverEvent = $('#' + o.containerId).hover(
                function(){
                    $self[animIn](animSpeed);
                },
                function() {
                    $self[animOut](animSpeed);
                }
            );
        } else {
            htmlClose = function(element, callback) {
                $(document).on('click', function(e) {
                    if (!element.is(e.target) && element.has(e.target).length === 0 && typeof callback === "function") {
                        callback();
                    }
                });
            };
            $('#' + o.containerId).click(function() {
                $self[animIn](animSpeed);
                htmlClose($(this), function() {
                    $self[animOut](animSpeed);
                    $(document).off('click', this);
                });
            });
        }
        
    };

    // Defaults
    $.fn.editLink.defaults = {
        btnId: 'edit-link',                     // Element ID
        btnClass: 'btn btn-warning',            // Element class
        btnText: 'Edit',                        // Button text
        containerId: 'edit-container',          // Container ID
        containerclass: 'edit-link-container',  // Container class
        animation: 'none',                      // Fade, slide, none
        animationSpeed: 50,                     // Animation in speed (ms)
        zIndex: 2147483647                      // Z-Index for the overlay
    };

    $.editLink = $.fn.editLink;

})(jQuery, navigator, document);
