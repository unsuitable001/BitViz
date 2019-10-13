let createData = {
    type: "detached_panel",
    url: "index.html",
    height: screen.height,
    width: screen.width
};
let creating = browser.windows.create(createData);
