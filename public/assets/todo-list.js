$(document).ready(function(){

  $('form').on('submit', function(e){
      e.preventDefault();

      var todo = $('form input');
      var type = $('form select')
      var todo = {todo: todo.val(), type: (!type.val()) ? 'secondary' : type.val() };

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('.close').on('click', function(e){
      e.preventDefault();
      var _id = $(this).attr('_id');  
    
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + _id,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
