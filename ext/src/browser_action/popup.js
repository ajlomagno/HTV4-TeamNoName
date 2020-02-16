document.addEventListener("DOMContentLoaded", function() {
  var link = document.getElementById("btnSaveJob");
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
    // alert("hi");
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
        const job = new Job(current_title, current_site, seconds, "m.me/HI");
        alert(job.title);
        addJob(job);
      }
    );

    // alert("not");
    // jobs = getJobs();
    // alert(jobs.length);
    // for (i = 0; i < jobs.length; i++) {
    // alert(jobs[i].title);
    // }
  });
});

function addJob(job) {
  // check if the user is has applied to any websites before
  chrome.storage.local.get({ sites_applied_to: [] }, function(result) {
    sites_applied = result.sites_applied_to;
    sites_applied.push(job);
    // alert("buffer length: " + sites_applied.length);

    chrome.storage.local.set({ sites_applied_to: sites_applied }, function() {
      // alert("Value is set to " + sites_applied.length);
    });
    chrome.storage.local.get(["sites_applied_to"], function(result) {
      // alert("VALUE IS SET NOW: " + result.sites_applied_to);
      // out = "";
      // for (i = 0; i < result.sites_applied_to.length; i++) {
      //   out += result.sites_applied_to[i].title + " ";
      //   out += result.sites_applied_to[i].company + " ";
      //   out += result.sites_applied_to[i].location + " ";
      // }
      // alert(out);
    });
  });
}

// function getJobs() {
//   chrome.storage.local.get(["sites_applied_to"], function(result) {
//     jobs = [];
//     for (i = 0; i < result.sites_applied_to.length; i++) {
//       jobs.push(jobs);
//     }
//     return jobs;
//   });
// }

class Job {
  constructor(t, c, l, lnk) {
    this.title = t;
    this.company = c;
    this.location = l;
    this.link = lnk;
  }
}
