img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('Pokemon.jpg');
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function back() {
    window.location = "index.html";
}

function draw() {
    if (status != "") {
        image(img, 0, 0, 500, 500);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            fill(r, g, b);
            noFill();
            stroke(r, g, b);
        }
    }
}