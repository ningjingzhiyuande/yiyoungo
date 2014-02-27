$(document).ready(function(){


$(".news").validate({
  rules: {
    "news[title]":{
      required: true,
      minlength: 4
    },
    "news[content_attributes][body]":{
      required: true,
      minlength: 4
    },
    "news[image]":{
    	extension: "jpg|png|gif"
    }
  }
});
})