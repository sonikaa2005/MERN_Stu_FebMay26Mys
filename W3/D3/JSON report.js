function auditReport(reportJSON) {

    // 1. Parse JSON
    let report = JSON.parse(reportJSON);

    let okCount = 0;
    let failCount = 0;

    // 2. Scan modules
    for (let key in report.modules) {

        if (report.modules[key] === "OK") {
            okCount++;
        }

        if (report.modules[key] === "FAIL") {
            failCount++;
            break; // stop immediately when FAIL is found
        }
    }

    // 3. Create summary object
    let summary = {
        app: report.app,
        status: report.status,
        okCount: okCount,
        failCount: failCount
    };

    // 4. Return object and JSON string
    return {
        summaryObject: summary,
        summaryJSON: JSON.stringify(summary)
    };
}


// Example JSON
let reportJSON = `{
  "app": "Portal",
  "status": "OK",
  "modules": {
    "auth": "OK",
    "payment": "OK",
    "results": "FAIL",
    "profile": "OK"
  }
}`;


// Call function
let result = auditReport(reportJSON);

// Print result
console.log(result);