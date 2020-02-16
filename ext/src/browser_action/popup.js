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
  var btnSaveJob = document.getElementById("btnSaveJob");
  btnSaveJob.addEventListener("click", function() {
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
        // parse info for the job posting
        current_site = tabs[0].url; // url of current site
        current_title = tabs[0].title; // title of current site
        seconds = new Date().getSeconds();
        const job = new Job(current_title, current_site, seconds, "m.me/HI");

        // add job posting
        addJob(job);
      }
    );

    // test job has been added properly
    // jobs = getJobs();
    // alert(jobs.length);
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

    // add job posting to chrome.storage.local
    chrome.storage.local.set({ sites_applied_to: sites_applied }, function() {
      // alert("Value is set to " + sites_applied.length);
    });
    chrome.storage.local.get(["sites_applied_to"], function(result) {
      // test job has been added properly
      // alert("VALUE IS SET NOW: " + result.sites_applied_to);
      // out = "";
      // for (i = 0; i < result.sites_applied_to.length; i++) {
      // out += result.sites_applied_to[i].title + " ";
      //   out += result.sites_applied_to[i].company + " ";
      //   out += result.sites_applied_to[i].location + " ";
      // }
      // alert(out);
    });
  });
}

// get array of jobs
async function getJobs() {
  return new Promise((resolve, reject) =>
    chrome.storage.local.get(["sites_applied_to"], result =>
      resolve(result.sites_applied_to)
    )
  ).then(function(jobs) {
    out = "";
    for (i = 0; i < jobs.length; i++) {
      out += jobs[i].title + " ";
      out += jobs[i].company + " ";
      out += jobs[i].location + " ";
    }
    alert(out);
    return jobs;
  });
}

class Job {
  constructor(t, c, l, lnk) {
    this.title = t;
    this.company = c;
    this.location = l;
    this.link = lnk;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var btnViewJobs = document.getElementById("btnViewJobs");
  btnViewJobs.addEventListener("click", function() {
    getJobs();

    // alert("starting");
    // alert("hello" + getJobs().length);
    // chrome.storage.local.get({ sites_applied_to: [] }, function(result) {
    //   alert(result.sites_applied_to.length);
    // });
  });
});
