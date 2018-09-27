import * as builder from "botbuilder";
import { TriggerActionDialog } from "../../../utils/TriggerActionDialog";
import { DialogIds } from "../../../utils/DialogIds";
import { DialogMatches } from "../../../utils/DialogMatches";
import { Strings } from "../../../locale/locale";
import * as config from "config";

export class FeedbackDialog extends TriggerActionDialog {

    private static async step1(session: builder.Session, args?: any | builder.IDialogResult<any>, next?: (args?: builder.IDialogResult<any>) => void): Promise<void> {
        
      let updateCardCounter = 1;
      let userId = session.message.user.id;
      let usersVoted = [];
      usersVoted.push(userId); 
     
     // console.log(recepient);
      
      
      
      let cards = new Array<builder.HeroCard>();
      //let newCard = new builder.HeroCard(session)
      //          .title(recepient + " has received feedback!")
      //          .images([
      //              new builder.CardImage(session)
      //                  .url("https://cdn.glitch.com/904b517c-0aca-41b8-82fc-710c2c0e70c6%2Ffeedback%20(1).png?1537908048302")
      //                  .alt(session.gettext(Strings.img_default)),
      //          ]);
      
     //                 ]);

   //   let buttons = new Array<builder.CardAction>();
      
   //   buttons.push(new builder.CardAction(session)
   //             .type("invoke")
   //             .title("Add Kudos Points")
  //              .value("{" +
  //                  "\"dialog\": \"" + DialogIds.HelloDialogId + "\", " +
  //                  "\"response\": \"Information for called intent\"" +
  //              "}"),
  //          );
      
        let messageBackButtonValue = JSON.stringify({ updateCounterKey: updateCardCounter, usersVoted: usersVoted});
        let messageBackButton = builder.CardAction.messageBack(session, messageBackButtonValue)
           // .displayText(Strings.messageBack_button_display_text, name )
            .title("Like")
            .text("update card message"); // This must be a string that routes to UpdateCardMsgDialog, which handles card updates
      
      let newCard = new builder.ThumbnailCard(session)
                 .title("\n")
               // .title("Feedback Sent: " + recepient)
                  .text("<em>Click the like button to add more kudos</em>")
                  .subtitle("1 kudos")
                
            //   .buttons(buttons)
        .buttons([messageBackButton]);
      
    //   cards.push(newCard);
    //   session.send(new builder.Message(session)
     //       .attachmentLayout("list")
    //        .attachments(cards))
              
      
      var nextCard = {
    "contentType": "application/vnd.microsoft.card.adaptive",
    "content": {
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type": "Container",
                "items": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "auto",
                                "items": [
                                    {
                                        "type": "Image",
                                        "url": "https://cdn.glitch.com/904b517c-0aca-41b8-82fc-710c2c0e70c6%2Ffeedback%20(2).png?1537908512949",
                                        "size": "medium"
                                    }
                                ]
                            },
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": "Kudos: " +  updateCardCounter,
                                        "weight": "bolder",
                                        "size": "default",
                                        "wrap": true
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": "_click the like button to add more kudos_",
                                        "size": "small",
                                        "spacing": "none",
                                        "wrap": true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "actions": [
            {
                "type": "Action.Http",
                "method": "POST",
                "title": "Like",
                "headers": [
                    {
                        "name": "CARD-UPDATE-IN-BODY",
                        "value": "true"
                    }
                ],
                "url": "https://ahead-porpoise.glitch.me/api/messages/UpdateCardMsgDialog",
                "body": "test"
            }
        ]
    }
}
   // cards.push(newCard);
  
       session.send(new builder.Message(session)
            .attachmentLayout("list")
           // .attachments(cards))
               .attachments([ newCard]))
      
    //  session.send(msg);
  
        session.endDialog();
    }

    constructor(
        bot: builder.UniversalBot,
    ) {
        super(bot,
            DialogIds.FeedbackDialogId,
            DialogMatches.FeedbackDialogMatch,
            FeedbackDialog.step1,
        );
    }
}
