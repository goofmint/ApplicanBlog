var app = {
  url: "http://tech-blog.applican.com/feed",
  debug: false,
  init: function() {
    if (this.debug) {
      var me = this;
      $.ajax("/feed").then(me.feed.success).fail(me.feed.error);
    } else {
      applican.http.get(this.url, {}, this.feed.success, this.feed.error);
    }
  },
  render: function (entries) {
    entries.each(function () {
      $(".entries").append($("<tr><td>"+this.title+"</td></tr>"));
    });
  },
  feed: {
    success: function (feed) {
      console.log(this);
      var feed = $(feed);
      entries = feed.find("entry").map(function() {
        entry = $(this);
        return {
	  title: entry.find("title").text(),
          url: entry.find("link").attr("href"),
          published: entry.find("published").text(),
          summary: entry.find("summary").text(),
          categories: entry.find("category").map(function() {
            return $(this).attr("term");
          })
	}
      });
      app.render(entries);
    },
    error: function (err) {
      console.log(err);
    }
  }
}

var onDeviceReady = function() {
  console.log(location.href);
  if (location.href.indexOf("http://") == 0) {
    app.debug = true;
  }
  app.init();
};

document.addEventListener("deviceready", onDeviceReady, false);
