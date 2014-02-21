#= require active_admin/base
//= require_tree ./lib

jQuery ->
  $('#redactor_content').redactor({ imageUpload: '/admin/ajax/image_upload' });
