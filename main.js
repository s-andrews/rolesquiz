$(document).ready(function(){

    // Load in the roles and place them in the document
    $.getJSON('roles.json', function(roles) {
        //roles is the JSON string
        rolediv = $("#roles")

        usedIndices = new Set();

        // Arrange the roles alphabetically by the name of the person
        roles.sort((a,b) => (a["name"]>b["name"]) ? 1 : -1);


        for (i=0; i < roles.length; i++) {
            usedIndices.add(roles[i]["index"])
            rolediv.append("<div class=\"role container-fluid\"><h3>Role "+String(i+1)+"</h3><div class=\"col-md-4 headshot\"><img src=\"images/"+roles[i]["gender"]+".png\"></div><div class=\"col-md-8\"><ul><li><strong>Name:</strong> "+roles[i]["name"]+"</li><li><strong>Gender:</strong> "+roles[i]["gender"]+"</li><li><strong>Age:</strong> "+roles[i]["age"]+"</li></ul><p>"+roles[i]["description"]+"</p><p><span class=\"answerlabel\"><strong>Answer:</strong></span> <select class=\"answers\"></select></p></div></div>");
        }

        
        $.getJSON('suggestions.json', function(suggestions) {

            allanswers = $(".answers")

            allanswers.append("<option value=\"\"></option>")

            for (i=0; i < suggestions.length; i++) {
                allanswers.append("<option value=\""+suggestions[i]["index"]+"\">"+suggestions[i]["name"]+"</option>")
            }
            
            allanswers.select2({width: "10em"})
        });
    

    });


    // Make the answers button work
    $("#answercheck").click( function() {
        // If they've shown the answers then this button is used to reset everything
        if ($(this).text() == "Play Again") {
            window.scrollTo(0, 0);
            setTimeout(location.reload.bind(location), 500);
            return;
        }

        $("#fadediv").show();
        answers = $(".answers");

        $.getJSON('roles.json', function(roles) {

            // Arrange the roles alphabetically by the name of the person
            roles.sort((a,b) => (a["name"]>b["name"]) ? 1 : -1);

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
                $("#sarkycomment").text("You know, the one with the brown hair.  Stood on the left a lot.")
            }
            else if (score < 14) {
                $("#answerdiv").css("background-color","orange")
                $("#sarkycomment").text("Not bad, but read your programmes more carefully from now on.")
            }
            else {
                $("#answerdiv").css("background-color","green")
                $("#sarkycomment").text("You are an encyclopedia of characters!")

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

    $("#showanswers").click( function() {

        // We need a dictionary to be able to look up the 
        // names of any given id.

        lookup = {}

        all_options = $(".answers").first().children();

        for (i=1;i<all_options.length;i++) {
            lookup[all_options.eq(i).val()] = all_options.eq(i).text()
        }


        $.getJSON('roles.json', function(roles) {
            //roles is the JSON string
            rolesdiv = $("#roles")
            answerlabels = $(".answerlabel")

            // Arrange the roles alphabetically by the name of the person
            roles.sort((a,b) => (a["name"]>b["name"]) ? 1 : -1);

    
            for (i=0; i < roles.length; i++) {
                answerlabels.eq(i).text("Answer: "+lookup[roles[i]["index"]])
            }
        });

        $(".select2").hide();
        $('#answerdiv').slideUp();
        $("#fadediv").fadeOut();
        // TODO Change the text to play again.
        $("#answercheck").text("Play Again");

    });


  }); 