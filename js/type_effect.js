var intro_text_data = ["Hi there, I'm Brendon", "I go to UCLA", "This is a haiku."];

var seven_syll_lines = [
    "I'd like to live in Japan",
    "I work at Playstation now",
    "I am a Tools Programmer",
    "I like to develop games",
    "I enjoy playing Spikeball",
    "I want to live a good life",
    "I will graduate next year",
    "I play bass, guitar, and sing",
    "Right now, I live in LA",
    "I like Graphics and Engines",
    "I create Technical Art",
    "I am a Docker Pirate",
    "I use brew for packages",
    "I want to travel the world",
    "Check out my profiles below",
    "I don't really play fortnite",  
    "I go to UCLA",
    "I'm looking for internships",
    "I'm taking Compilers",
    "I worked at FileMaker",
    "I interned with Apple once",
    "GitCoin is dope, lets buidl",
    "I ride my skateboard to work",
    "I hope you're not sick of this",
    "I might enroll in grad school", 
    "Coffee gets me through the day", 
]

var typewriter_delay_char = 80
var typewriter_delay_line = 2000
var typewriter_delay_comma = 400
var effect_delay = 1000
var typewriter_delay_seven_syll = 4000
var typewriter_delay_until_seven_syll = 2000

var line_index = 0
var text_data_index = 0
function write_line(element, callback){
    var line = intro_text_data[text_data_index]
    if(line_index < line.length){
        var curr_character = line.charAt(line_index)
        var comma_delay = curr_character == ',' ? typewriter_delay_comma : 0
        element.innerHTML += curr_character
        line_index++;
        setTimeout(function(){
            write_line(element, callback);
        }, typewriter_delay_char);
    }  else {
        if(callback) callback()
    }
}

function write_paragraph(){
    if(text_data_index < intro_text_data.length){
        var intro_text_element = document.getElementById("intro-text-container");
        var line = document.createElement("h1");
        line.id = `intro-text-line-${text_data_index}`
        intro_text_element.appendChild(line);
        write_line(line, function(){
            line_index = 0;
            text_data_index++;
            setTimeout(function(){
                write_paragraph();
            }, typewriter_delay_line - typewriter_delay_char) // We already waited!
        });
    } else {
        var seven_syll_line = document.getElementById("intro-text-line-1");
        setTimeout(function(){
            setInterval(function(){
                updateLine(seven_syll_line)
            }, typewriter_delay_seven_syll)
        }, typewriter_delay_until_seven_syll)
    }
}

function updateLine(element){
    element.innerHTML = " ";
    line_index = 0;
    text_data_index = 1;
    intro_text_data[1] = seven_syll_lines[Math.floor(Math.random() * seven_syll_lines.length)]
    write_line(element)
}

function typewriter_effect(){
    write_paragraph();
}

$(document).ready(function(){
    setTimeout(function(){
        typewriter_effect();
    }, effect_delay)
})