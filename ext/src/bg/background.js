// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//   alert(request);
// chrome.pageAction.show(sender.tab.id);
// sendResponse({ sims: "welp" });

async function getJobs() {
  retu;
}
// .then(function(jobs) {
//   out = "";
//   for (i = 0; i < jobs.length; i++) {
//     out += jobs[i].title + " ";
//     out += jobs[i].company + " ";
//     out += jobs[i].location + " ";
//   }
//   alert(out);
//   return jobs;
// });
// }

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var jobs = getJobs().then(function(jobs) {
    out = "";
    for (i = 0; i < jobs.length; i++) {
      out += jobs[i].title + " ";
      out += jobs[i].company + " ";
      out += jobs[i].location + " ";
    }
    // alert(out);
    // return jobs;

    console.log(jobs);
    sendResponse(JSON.stringify(jobs));
  });
});

// chrome.storage.local.get(["sites_applied_to"], function(result) {
//   // var jobs = result.sites_applied_to;
//   // alert(jobs);
//   // return jobs;

//   // $("#myTable").append(rowToInsert);
//   // alert("jobs");
//   // request.action.
// });
// // });

// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action == "load") {
//     console.log("TEST");

//   }

//   if ((request.action = "save")) {
//   }
// });
