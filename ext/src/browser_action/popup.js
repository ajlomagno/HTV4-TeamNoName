var button = document.getElementById("btn1");
button.addEventListener("click", function(){
    chrome.tabs.create({url:"file:///C:/Users/Albert/Documents/GitHub/HTV4-TeamNoName/jobsDB.html"});
});

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var link = document.getElementById("btnSavePage");
  // onClick's logic below:
  link.addEventListener("click", function() {
    // for tesing make sites_applied_to undefined
    // chrome.storage.local.set({ sites_applied_to: null }, function() {
    //   // you can use strings instead of objects
    //   // if you don't  want to define default values
    //   chrome.storage.local.get(["sites_applied_to"], function(result) {
    //     alert("VALUE IS SET NOW: " + result.sites_applied_to);
    //   });
    // });

    // get current tab info
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true
      },
      function(tabs) {
        // url of current site
        current_site = tabs[0].url;
        current_title = tabs[0].title;
        seconds = new Date().getSeconds();
        alert(current_title + " " + seconds);

        // check if the user is has applied to any websites before
        chrome.storage.local.get({ sites_applied_to: [] }, function(result) {
          sites_applied = result.sites_applied_to;
          sites_applied.push({
            current_site: current_site,
            current_title: current_title,
            seconds: seconds
          });

          chrome.storage.local.set(
            {
              sites_applied_to: sites_applied,
              name: current_title,
              seconds: seconds
            },
            function() {
              //   alert("Value is set to " + sites_applied);
            }
          );
          chrome.storage.local.get(["sites_applied_to"], function(result) {
            // alert("VALUE IS SET NOW: " + result.sites_applied_to);
            out = "";
            for (i = 0; i < result.sites_applied_to.length; i++) {
              out += result.sites_applied_to[i].current_site + " ";
              out += result.sites_applied_to[i].current_title + " ";
              out += result.sites_applied_to[i].seconds + " ";
            }
            alert(out);
          });
        });
      }
    );
  });
});
