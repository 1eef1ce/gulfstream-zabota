$( document ).ready(function() {

    new WOW().init();

    $(".navbar-toggler").on("click", function () {
        $(this).toggleClass("active");
    });

// Cache selectors
    var lastId,
        topMenu = $("#navmenu"),
        topMenuHeight = topMenu.outerHeight()+15,
        // All list items
        menuItems = topMenu.find(".menu-link"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

// Bind click handler to menu items
// so we can get a fancy scroll animation
    menuItems.click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

// Bind to scroll
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });

    //Watch for closing modals
    $('.modal').on('hidden.bs.modal', function () {
        //If there are any visible
        if($(".modal:visible").length > 0) {
            //Slap the class on it (wait a moment for things to settle)
            setTimeout(function() {
                $('body').addClass('modal-open');
            },200)
        }
    });

    var phoneMask = IMask(
        document.getElementById('phoneNumber'), {
            mask: '+{7} 000 000-00-00'
        });

    var inputs = $('input[type="text"]');
    var checkbox = $('input[type="checkbox"]');
    var button = $('button[type="submit"]');

    (function() {
        inputs.keyup(function() {
            checkform();

        });
    })();

    (function() {
        checkbox.change(function() {
            checkform();
        });
    })();
    function checkform()
    {
        var empty = false;
        if (!checkbox.is(':checked')) {
            empty = true;
        }
        inputs.each(function() {
            if ($(this).val() === '') {
                empty = true;
            }
        });
        if (empty) {
            button.attr('disabled', 'disabled');
        } else {
            button.removeAttr('disabled');
        }
    }
/*
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
*/
});