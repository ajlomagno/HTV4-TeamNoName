String.prototype.format = function() {
  var args = [].slice.call(arguments);
  return this.replace(/(\{\d+\})/g, function(a) {
    return args[+a.substr(1, a.length - 2) || 0];
  });
};

async function getJobs() {
  alert("getJobs called");
}

chrome.extension.sendMessage({ action: "load" }, function(response) {
  // console.log(response.sims);
  alert(response);
  if (response !== undefined && response !== null) {
    alert(response.jobs.length);
    for (i = 0; i < jobs.length; i++) {
      //   out += jobs[i].title + " ";
      //   out += jobs[i].company + " ";
      //   out += jobs[i].location + " ";

      var rowToInsert = "<tr><td>{1}</td><td>{2}</td><td>{3}</td></tr>".format(
        jobs[i].title,
        jobs[i].company,
        jobs[i].location
      );
      $("#myTable").append(
        rowTemplate.format(job.title, job.company, job.location)
      );
    }
  }
  //
});

// chrome.runtime.onMessage.addEventListener(function(
//   request,
//   sender,
//   sendResponse
// ) {
//   if (request.jobs !== null) {

//   }
// });

// document.addEventListener("click", function() {});
