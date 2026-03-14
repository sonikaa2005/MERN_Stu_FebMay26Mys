// JSON Settings Merge

function mergeSettings(savedSettingsJSON, defaultSettings) {

    // convert JSON string to object
    let savedSettings = JSON.parse(savedSettingsJSON);

    let merged = {};

    // copy default settings
    for (let key in defaultSettings) {
        merged[key] = defaultSettings[key];
    }

    // override with saved settings
    for (let key in savedSettings) {
        merged[key] = savedSettings[key];
    }

    return {
        mergedObject: merged,
        mergedJSON: JSON.stringify(merged)
    };
}


// Example values
let defaultSettings = {
    a: 1,
    b: 2,
    c: 3
};

let savedSettingsJSON = '{"b":10,"c":20}';

// call the function
let result = mergeSettings(savedSettingsJSON, defaultSettings);

// print output
console.log(result);