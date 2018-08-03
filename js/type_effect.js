var intro_text_data = ["Hi there, I'm Brendon", "I go to UCLA", "This is a haiku."];
var typewriter_delay_char = 80
var typewriter_delay_line = 800
var typewriter_delay_comma = 400
var effect_delay = 1000

var line_index = 0
var text_data_index = 0
function write_line(element){
    if(text_data_index < intro_text_data.length){
        var line = intro_text_data[text_data_index]
        if(line_index < line.length){
            var curr_character = line.charAt(line_index)
            var comma_delay = curr_character == ',' ? typewriter_delay_comma : 0
            element.innerHTML += curr_character
            line_index++;
            setTimeout(function(){
                write_line(element);
            }, typewriter_delay_char);
        }  else {
            line_index = 0;
            text_data_index++;
            setTimeout(function(){
                write_paragraph();
            }, typewriter_delay_line - typewriter_delay_char) // We already waited!
        }
    }
}

function write_paragraph(){
    var intro_text_element = document.getElementById("intro-text-container");
    var line = document.createElement("h1");
    intro_text_element.appendChild(line);
    write_line(line);
}

function typewriter_effect(){
    write_paragraph();
}

$(document).ready(function(){
    setTimeout(function(){
        typewriter_effect();
    }, effect_delay)
})