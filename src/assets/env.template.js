(function(window) {
    window.env = window.env || {};
    window["env"]["apiUrl"] = "${API_URL}";
    window["env"]["user_url"] = "${USER_URL}";
    window["env"]["debug"] = "${DEBUG}";
  })(this);