$(document).ready(function(){

    // Load in the roles and place them in the document
    $.getJSON('roles.json', function(roles) {
        //roles is the JSON string
        rolediv = $("#roles")

        usedIndices = new Set();

        for (i=0; i < roles.length; i++) {
            usedIndices.add(roles[i]["index"])
            rolediv.append("<div class=\"role container-fluid\"><h3>Role "+String(i+1)+"</h3><div class=\"col-md-4\"><img src=\"images/"+roles[i]["gender"]+".png\"></div><div class=\"col-md-8\"><ul><li><strong>Name:</strong> "+roles[i]["name"]+"</li><li><strong>Gender:</strong> "+roles[i]["gender"]+"</li><li><strong>Age:</strong> "+roles[i]["age"]+"</li></ul><p>"+roles[i]["description"]+"</p><p><strong>Answer:</strong><select></select></p></div></div>");
            //rolediv.append("<div class=\"role text-center\">role "+(i+1)+": <img width=\"200\" height=\"auto\" src=\""+roles[i]["file"]+"\" > <span class=\"answerlabel\">Answer:</span> <select class=\"answers\"></select></div>")
        }

        
        


        $.getJSON('suggestions.json', function(suggestions) {

            allanswers = $(".answers")

            allanswers.append("<option value=\"\"></option>")

            for (i=0; i < suggestions.length; i++) {
                if (usedIndices.has(parseInt(suggestions[i]["index"]))) {
                    allanswers.append("<option value=\""+suggestions[i]["index"]+"\">"+suggestions[i]["name"]+"</option>")
                }
            }
            
            allanswers.select2({width: "10em"})
        });
    

    });


    // Make the answers button work
    $("#answercheck").click( function() {
        $("#fadediv").show();
        answers = $(".answers");

        $.getJSON('roles.json', function(roles) {
            //roles is the JSON string
            rolediv = $("#roles")
            answerlabels = $(".answerlabel")
    
            score = 0;

            for (i=0; i < roles.length; i++) {
                answer = answers.eq(i).val()
                if (answer == roles[i]["index"]) {
                    answerlabels.eq(i).removeClass("wrong")
                    answerlabels.eq(i).addClass("correct")
                    score += 1
                }
                else {
                    answerlabels.eq(i).removeClass("correct")
                    answerlabels.eq(i).addClass("wrong")

                }
            }

            // Set the colours and scores
            if (score < 5) {
                $("#answerdiv").css("background-color","red")
                $("#sarkycomment").text("All that effort - and for what?")
            }
            else if (score < 14) {
                $("#answerdiv").css("background-color","orange")
                $("#sarkycomment").text("Not bad, shows you're paying attention.")
            }
            else {
                $("#answerdiv").css("background-color","green")
                $("#sarkycomment").text("Well done!  The rolemaster is weeping with appreciation.")

            }

            $("#finalscore").text(score)

            $("#answerdiv").slideDown();
        });
    });

    // Let them try again if they want to alter their answers
    $('#changeanswers').click (function() {
        $('#answerdiv').slideUp();
        $("#fadediv").fadeOut();
    })

    // Reset everything when they opt to play again
    $('#playagain').click (function() {

        answers = $(".answers");
        $('#answerdiv').slideUp();
        $("#fadediv").fadeOut();
        window.scrollTo(0, 0);

        setTimeout(location.reload.bind(location), 500);
    })

  }); 