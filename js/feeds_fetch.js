function createTag(tag, attrs) {
  var t = document.createElement(tag);
  for(k in attrs) {
    t.setAttribute(k, attrs[k]);
  }
  return t;
}

function container(selector) {
  return document.querySelector(selector);
}

function fetch_recent_posts(selector, num) {
  var url = "https://feeds.420cloud.com/posts";
  var num = num || 5;
  var tail = "?num_of_posts="+num+"";
  url +=tail;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
        container(selector).innerHTML = "";
      data["data"].forEach(function(e){
        var p = createTag("li", {class: "footer-menu-item footer-menu-news"});
        var a = createTag("a", {title: e.title, href: e.guid, target: "_blank", class: "footer-menu-link"});
        var div = createTag("div", {class: "footer-menu-block"});
        var pic = createTag("img", {alt: e.title, src: e.thumbnail_url, class: "footer-menu-img"});
        var anchor_text = document.createTextNode(e.title);
        a.appendChild(div);
        div.appendChild(pic);
        a.appendChild(anchor_text);
        p.appendChild(a);
        container(selector).appendChild(p);
      });
    }
  }
  xhr.open("GET", url, true);
  xhr.send();
}

function fetch_headlines_to(selector) {
  var url = "https://feeds.420cloud.com/posts?type=headline";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        container(selector).innerHTML = "";
        data["data"].forEach(function(e){
          var li = createTag("li", {id: e.id, class: "swiper-slide"});
          var cat_anchor = createTag("a", {href: e.guid.split("?")[0]+"category/"+e.cat_name+"", class: "title-slide cat-title-slide", title: e.cat_name});
          var cat_anchor_text = document.createTextNode(e.cat_name);
          var hl_anchor = createTag("a", {class: "title-slide", href:e.guid, title: e.title});
          var hl_anchor_text = document.createTextNode(e.title);
          cat_anchor.appendChild(cat_anchor_text);
          hl_anchor.appendChild(hl_anchor_text);
          [cat_anchor, hl_anchor].forEach(e => li.appendChild(e))
          container(selector).appendChild(li);
        });
    }
  }

  xhr.open("GET", url, true);
  xhr.send();
}


function fetch_stocks_to(selector) {
  function main() {
    var url = "https://feeds.420cloud.com/stocks";
    var static = {
        profile: "http://www.otcmarkets.com/stock/MCIG/profile",
        title: "OTCQB: MCIG"
      };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        container(selector).innerHTML = "";
        var anchor = createTag("a", {href: static.profile, title: static.title, target: "_blank"});
        var sp_for_value = createTag("span", {class: "stock_symbol"});
        var span_text = document.createTextNode(data.t);
        var a_text = document.createTextNode(data.l);
        decision_maker = function(e) { return parseFloat(e) >= 0 ? "green" : "red"; }
        ch_class = "stock-"+decision_maker(data.c);
        var ch_for_value = createTag("span", {class: ch_class});
        var ch_value_text = document.createTextNode(data.c + "( " + data.cp+ "% )");
        sp_for_value.appendChild(span_text);
        ch_for_value.appendChild(ch_value_text);
        anchor.appendChild(sp_for_value);
        anchor.appendChild(a_text);
        anchor.appendChild(ch_for_value);
        container(selector).appendChild(anchor);
      }
    }
    xhr.open("GET", url, true);
    xhr.send();
  }
  setInterval(main, 15*60*1000);
}