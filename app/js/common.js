$(function() {


  //-------------------------------попандер---------------------------------------
    $('.modal').popup({transition: 'all 0.3s'});
  
  //---------------------------tabs-----------------------
    $('.tabs__wrap').hide();
    $('.tabs__wrap:first').show();
    $('.tabs__list ul a:first').addClass('active');

    $('.tabs__list ul a').click(function(event){
      event.preventDefault();
      $('.tabs__list ul a').removeClass('active');
      $(this).addClass('active');
      $('.tabs__wrap').hide();

      var selectTab = $(this).attr('href');
      $(selectTab).fadeIn();
    });

  //-------------------------скорость якоря---------------------------------------
    $(".header__block--nav").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top - 0}, 'slow', 'swing');
    });

  //------------------------------------form-------------------------------------------
    $('input[type="tel"]').mask('+0 (000) 000-00-00');

    jQuery.validator.addMethod("phoneno", function(phone_number, element) {
       return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
    }, "Введите Ваш телефон");

    $(".form").each(function(index, el) {
      $(el).addClass('form-' + index);

      $('.form-' + index).validate({
        rules: {
          phone: {
            required: true,
            phoneno: true
          },
          name: 'required',
        },
        messages: {
          textarea: "Введите вопрос",
          phone: "Введите Ваш телефон",
        },
        submitHandler: function(form) {
          var t = {
            textarea: jQuery('.form-' + index).find("textarea[name=textarea]").val(),
            phone: jQuery('.form-' + index).find("input[name=phone]").val(),
            subject: jQuery('.form-' + index).find("input[name=subject]").val()
          };
          ajaxSend('.form-' + index, t);
        }
      });

    });

    function ajaxSend(formName, data) {
      jQuery.ajax({
        type: "POST",
        url: "sendmail.php",
        data: data,
        success: function() {
          $(".modal").popup("hide");
          $("#thanks").popup("show");
          setTimeout(function() {
            $(formName).trigger('reset');
          }, 2000);
        }
      });
    }


});

//----------------------------------------preloader----------------------------------

  $(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut('slow');
  });

