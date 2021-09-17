objects = [];
status = "";
object1 = "person";
function preload()
{
alarm = loadSound('halloween_theme.mp3');
}
function setup()
{
canvas = createCanvas(540,340);
canvas.center();
capture = createCapture(VIDEO);
capture.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function draw()
{
image(capture,0,0,600,400);
if(status != "")
{
    document.getElementById('status').innerHTML = 'Object Detected';
    objectDetector.detect(capture, gotResults);
    for(i = 0;i < objects.length; i++)
    {
        if(objects[0].label == object1)
        {
            document.getElementById('status').innerHTML = "Baby Found!";
            alarm.stop();
        }
        else
        {
            document.getElementById('status').innerHTML = "Baby Not Found!";
            alarm.play();
            var synth = window.speechSynthesis;
            speaking_data = "Baby Not Found!";
            var utterthis = new SpeechSynthesisUtterance(speaking_data);
            synth.speak(utterthis);
        }
    }
}
}
function play1()
{
    alarm.play();
    alarm.setVolume(1);
    alarm.rate(1);
}
function modelLoaded()
{
    console.log('Model Loaded!');
    status = true;
}
function gotResults(error,results)
{
if(error)
{
    console.error(error);
}
else{
    objects = results;
    console.log(results);
}
}